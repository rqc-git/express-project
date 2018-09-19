function Logout(container){
    this.container = container;
    this.init();
}
Logout.template = `<li><a href="javascript:;" >注销</a></li>`;
$.extend(Logout.prototype, {
    init: function (){
        this.createDom();
        this.bindEvents();
    },
    createDom: function (){
        this.container.append(Logout.template);
    },
    bindEvents: function (){
        this.container.on('click', $.proxy(this.handelBtnClick, this));
    },
    handelBtnClick: function (){
        $.ajax({
            url: "/api/logout",
            success: $.proxy(this.handelLogoutSucc, this)
        });
    },
    handelLogoutSucc: function(res) {
        if(res && res.data && res.data.logout){
            window.location.reload();
        }
    }
});