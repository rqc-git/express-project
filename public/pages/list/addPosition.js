function AddPosition(container){
    this.container = container;
    this.init();
}
AddPosition.template = `
    <button type="button" data-toggle="modal" data-target=".js-addPositionModal" class="btn btn-info">增加</button>
`;
AddPosition.modal = `
<div class="modal fade js-addPositionModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">添加职位</h4>
        </div>
        <div class="modal-body form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">公司名称</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control js-company" placeholder="company Name">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">职位名称</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control js-jobName" placeholder="jobName">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">薪资范围</label>
                <div class="col-sm-10">
                    <select class="form-control js-salary">
                        <option>5k-10k</option>
                        <option>10k-20k</option>
                        <option>20k-30k</option>
                        <option>30k-50k</option>
                        <option>50k+</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">办公地点</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control js-address" placeholder="address">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">公司logo</label>
                <div class="col-sm-10">
                    <input type="file" class="form-control js-logo" >
                </div>
            </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-primary js-submit">提交</button>
        <div class="alert alert-success text-left hide js-notice-succc" style="margin-top: 20px" role="alert">
            添加职位成功
        </div>
        <div class="alert alert-danger  text-left hide js-notice-fail" style="margin-top: 20px" role="alert">
            添加职位失败！
        </div>
        </div>
    </div>
</div>
</div>
`;
$.extend(AddPosition.prototype, {
    init: function() {
        this.createBtn();
        this.createDom();
        this.bindEvents();
    },
    createBtn: function() {
        this.btnElem = $(AddPosition.template);
        this.container.append(this.btnElem);
    },
    createDom:　function() {
        this.modal = $(AddPosition.modal);
        this.noticeSuccElem = this.modal.find('.js-notice-succc');
        this.noticeFailElem = this.modal.find('.js-notice-fail');
        this.container.append( this.modal);
    },
    bindEvents: function() {
        var submit = this.modal.find('.js-submit');
        submit.on('click', $.proxy(this.handelsubmitClick, this));
    },
    handelsubmitClick: function() {
        var companyVal = this.modal.find('.js-company').val();
        var jobNameVal = this.modal.find('.js-jobName').val();
        var salaryVal = this.modal.find('.js-salary').val();
        var addressVal = this.modal.find('.js-address').val();
        var file = this.modal.find('.js-logo')[0].files[0];

        var formData = new FormData();
            formData.append('company', companyVal);
            formData.append('jobName', jobNameVal);
            formData.append('salary', salaryVal);
            formData.append('address', addressVal);
            formData.append('logo', file);

        $.ajax({
            cache: false,
            type: 'POST',
            url: '/api/addPosition',
            processData: false, //processData是否序列化数据
            contentType: false, //设置发送信息至服务器时内容编码类型，false指告诉服务器端没有设置任何内容类型头信息。默认值是字符串形式
            data: formData,
            success: $.proxy(this.handelsubmitSucc, this)
        });
    },
    handelsubmitSucc: function(res) {
        if(res.code === '0000'){
            $(this).trigger(new $.Event('change'));
            this.noticeSuccElem.removeClass('hide');
            setTimeout( $.proxy(this.handelModalFade, this), 2000, 'succ');
        }else{
            this.noticeFailElem.removeClass('hide');
            setTimeout( $.proxy(this.handelModalFade, this), 2000, 'fail');
        }
    },
    handelModalFade: function(arg){
        if(arg === 'succ'){
            this.modal.modal('hide');
            this.noticeSuccElem.addClass('hide');
        }else{
            this.noticeFailElem.addClass('hide');
        }
    }
});