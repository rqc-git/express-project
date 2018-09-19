function Page(){

}

$.extend(Page.prototype, {
    init: function(){
        this.createHeader();
    },
    createHeader: function(){
        var headerContainer = $('.js-header');
        new Header(headerContainer, 0);
    }
})