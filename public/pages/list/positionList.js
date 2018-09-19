function PositionList(container) {
    this.container = container;
    this.page = 1;
    this.size = 10;
    this.init();
}

PositionList.template = `
    <table class="table" style="margin-top:20px;">
        <thead>
            <th>序号</th>
            <th>公司名称</th>
            <th>职位</th>
            <th>薪资范围</th>
            <th>办公地点</th>
            <th>公司logo</th>
            <th>操作</th>
        </thead>
        <tbody class="js-tbody"></tbody>
    </table>
`;

$.extend(PositionList.prototype, {
    init: function() {
        this.createList();
        this.createUpdateModal();
        this.bindEvents();
        this.getPositionList();
    },
    createList: function() {
        this.listElem = $(PositionList.template);
        this.container.append(this.listElem);
    },
    createUpdateModal: function() {
        this.updatePositionModal = new UpdatePositionModal(this.container);
        $(this.updatePositionModal).on('change', $.proxy(this.getPositionList, this))
    },
    bindEvents: function() {
        $(this.container).on("click", $.proxy(this.handelContainerClick, this));
    },
    handelContainerClick: function(e) {
        var target = $(e.target),
            itemId = target.attr('data-id'),
            isDeleteBtn = target.hasClass('js-delete')
            isUpdateBtn = target.hasClass('js-update');
        if(isDeleteBtn){
            this.deleteItem(itemId);
        }
        if(isUpdateBtn){
            this.updateItem(itemId);
        }
    },
    deleteItem: function(id) {
        $.ajax({
            url: '/api/removePositionList',
            data: {
                id: id
            },
            success: $.proxy(this.handelDeleteSucc, this)
        });
    },
    handelDeleteSucc: function(res) {
        if(res.code === "0000"){
            this.getPositionList();
        }else{
            alert('删除失败');
        }
    },
    updateItem: function(id) {
        this.getCurrentPositionInfoById(id);
        // this.updatePositionModal.showModal();
        
    },
    getCurrentPositionInfoById: function(id) {
        $.ajax({
            url: '/api/currentPositionInfo',
            data: { id : id},
            success: $.proxy(this.handelPositionInfoSucc, this)
        });
    },
    handelPositionInfoSucc: function(res) {
        if(res.code === "0000"){
            this.updatePositionModal.showModal(res.data.data);
        }else{
            alert('获取当前数据失败');
        }
    },
    getPositionList: function() {
        $.ajax({
            url: '/api/getPositionList',
            data: {
                page: this.page,
                size: this.size
            },
            success: $.proxy(this.handelPositionListSucc, this)
        });
    },
    handelPositionListSucc: function(res) {
        if(res && res.code === '0000'){
            this.createItem(res.data.list);
            
            if(this.page > res.data.totalPage){
                this.page = res.data.totalPage;
                this.getPositionList();
            }else{
                /*
                *在当前对象上发布change事件
                **/
                $(this).trigger(new $.Event('change', {
                    total: res.data.totalPage
                }));
            }
        }else{
            alert(res.data.message);
        }
    },
    createItem: function(list){
        var str = "";
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let file = item.filename ? item.filename : 'timg.jpg';
            str += `<tr>
                <td>${i + 1}</td>
                <td>${item.company}</td>
                <td>${item.jobName}</td>
                <td>${item.salary}</td>
                <td>${item.address}</td>
                <td><img style="width:30px;height:30px;" src="/uploads/${file}"></td>
                <td>
                    <span class="js-update" data-id="${item._id}">修改</span>
                    <span class="js-delete" data-id="${item._id}">删除</span>
                </td>
                </tr>`;
        }
        this.listElem.find('.js-tbody').html(str);
    },
    changePage: function(page) {
        this.page = parseInt(page, 10);
        this.getPositionList();
    }
});