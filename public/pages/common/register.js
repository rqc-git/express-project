function Register(container, modalContainer) {
    this.container = container;
    this.modalContainerElem = modalContainer;
    this.init();
}
Register.template = `<li><a href="#" data-toggle="modal" data-target=".js-registerModal">注册</a></li>`;
Register.modal = `
    <div class="modal fade js-registerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">注册</h4>
                </div>
                <div class="modal-body form-horizontal">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control js-userName" placeholder="username">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control js-passWord" placeholder="Password">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-primary js-submit">提交</button>
                <div class="alert alert-success text-left hide js-notice-succc" style="margin-top: 20px" role="alert">
                    恭喜您，注册成功
                </div>
                <div class="alert alert-danger  text-left hide js-notice-fail" style="margin-top: 20px" role="alert">
                    注册失败！
                </div>
                </div>
            </div>
        </div>
    </div>
`;

$.extend(Register.prototype, {
    init: function () {
        this.createBtn();
        this.createModal();
        this.bindEvents();
    },
    createBtn: function () {
        this.container.append(Register.template);
    },
    createModal: function(){
        this.modalElem = $(Register.modal);
        this.noticeSuccElem = this.modalElem.find('.js-notice-succc');
        this.noticeFailElem = this.modalElem.find('.js-notice-fail');
        this.modalContainerElem.append(this.modalElem);
    },
    bindEvents: function () {
       var submitBtn =  this.modalElem.find('.js-submit');
       submitBtn.on('click', $.proxy(this.handleSubmitBtnClick, this));//$.proxy指定函数执行环境为当前Register对象
    },
    handleSubmitBtnClick: function(){
        var userName = this.modalElem.find('.js-userName').val();
        var passWord = this.modalElem.find('.js-passWord').val();
        $.ajax({
            url:"/api/register",
            type:'post',
            data: {userName: userName, passWord: passWord},
            success: $.proxy(this.handleRegisterSucc, this),
        });
    },
    handleRegisterSucc: function(res){
        if(res.code === '0000'){
            this.noticeSuccElem.removeClass('hide');
            setTimeout($.proxy(this.handelModalFade, this), 2000, 'succ');
        }else{
            this.noticeFailElem.removeClass('hide');
            setTimeout($.proxy(this.handelModalFade, this), 2000, 'fail');
        }
    },
    handelModalFade: function(arg){
        if(arg === 'succ'){
            this.modalElem.modal('hide');
            this.noticeSuccElem.addClass('hide');
        }else{
            this.noticeFailElem.addClass('hide');
        }
    }
});