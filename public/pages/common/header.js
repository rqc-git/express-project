function Header(headerContainer, index) {
    this.headerContainer = headerContainer;
    this.selectedIndex = index;
    this.init();
}
Header.template = `
<nav class="navbar navbar-default">
<div class="container-fluid">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">拉钩后台</a>
  </div>

  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav js-left">
      <li><a href="/">首页</a></li>
      <li><a href="/list.html">职位管理</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right js-right">
    </ul>
  </div>
</div>
</nav>
`;
$.extend(Header.prototype, {
    init: function () {
        this.createDom();
        this.selected();
        this.getLoginInfo();
        
    },
    createDom: function(){
      this.headerElem = $(Header.template);
      this.headerContainer.append(this.headerElem);
    },
    selected: function(){
      var leftArea = this.headerElem.find('.js-left'),
          leftAreaItems = leftArea.find('li');
          leftAreaItems.eq(this.selectedIndex).addClass('active');
    },
    getLoginInfo: function(){
      $.ajax({
        url:"/api/isLogin",
        success: $.proxy(this.handelIsLoginSucc, this)
      });
    },
    handelIsLoginSucc: function(res){
      if(res && res.data && res.data.isLogin){
        this.createLogout();
      }else{
        this.createLogin();
        this.createRegister();
      }
    },
    createLogin: function(){
      this.rightContainer = this.headerElem.find('.js-right');
      new Login(this.rightContainer, this.headerElem);
    },
    createRegister: function(){
      new Register(this.rightContainer, this.headerElem);
    },
    createLogout: function(){
      this.rightContainer = this.headerElem.find('.js-right');
      new Logout(this.rightContainer);
    }
});