function Page(){

}

$.extend(Page.prototype, {
    init: function(){
        this.createHeader();
        this.createAddPosition();
        this.createPositionList();
        this.createPagination();
    },
    createHeader: function(){
        var headerContainer = $('.js-header');
        this.header = new Header(headerContainer, 1);
    },
    createAddPosition: function() {
        var positionContainer = $('.positionContainer');
        this.addPosition = new AddPosition(positionContainer);
        $(this.addPosition).on('change', $.proxy(this.handelAddPositionChange, this));
    },
    createPositionList: function() {
        var positionContainer = $('.positionContainer');
        this.positionList = new PositionList(positionContainer);
        //监听positionList对象的change事件
        $(this.positionList).on('change', $.proxy(this.handelListChange, this));
    },
    createPagination: function() {
        var paginationContainer = $('.js-pagination');
        this.pagination = new Pagination(paginationContainer);
        $(this.pagination).on('change', $.proxy(this.handelPaginationChange, this));
    },
    handelListChange: function(e) {
        this.pagination.setTotal(e.total);
    },
    handelPaginationChange: function(e) {
        this.positionList.changePage(e.page);
    },
    handelAddPositionChange: function(){
        this.positionList.getPositionList();
    }
})