$(function() {
    
    $(".nav-list").clone().appendTo("#mobile-menu"); //клонируем меню с шапки в мобильное меню
    $("#mobile-menu").find("*").attr("style", ""); //очищаем от встроеных стилей
    $("#mobile-menu").find("ul").removeClass("nav-list"); //очищаем от встроеных стилей
    $('#mobile-menu').mmenu({
        slidingSubmenus: false,//открытие подменю внутри вниз
        autoHeight: true, //авто подгон высоты меню
        //iconPanels: true,
        extensions: ["border-none", "theme-white"],
        offCanvas: {
            position: "left", //открывать слева
            zposition : "front" //не сдвигать body при раскрывании!!!
        },
        navbar: {
            title: "" //убираем название в меню сверху
        }
    });
    //Крестик-гамбургер https://jonsuh.com/hamburgers/
    var api = $("#mobile-menu").data("mmenu");
    api.bind("open:start",function(){ //когда меню Открыто
        $(".hamburger").addClass("is-active"); //добавить класс, Появится крестик
    });
    api.bind("close:before",function(){
        $(".hamburger").removeClass("is-active"); //без класса будет гамбургер
    });
    $('.mobile-nav').click(function () {
        api.close();
    });
    
    //при скроле уменьшается шапка по высоте https://codepen.io/Dannzzor/pen/dlAap
    $(window).scroll(function(){
        $(window).width(function (e, index) {
            if (index > 768) { //не для мобильных
                var scrollTop = $(window).scrollTop();
                if (scrollTop > 69) { //высота скрола до применения эффекта
                    $('body').addClass('header-fixed');
                } else {
                    $('body').removeClass('header-fixed');
                }
                var topOffset = $('.carousel').offset().top; //класс начала контента
                var headerHeight = $('.header').height();
                var transitionPoint = topOffset - headerHeight;
                if (scrollTop > transitionPoint) {
                    $('.header').addClass('alt-header');
                } else {
                    $('.header').removeClass('alt-header');
                }
            }
        });
        
    });
    
    //карусель верхняя
    $(".carousel-wrap").owlCarousel({
        loop: true,
        items: 1,
        smartSpeed: 700,
        nav: false,
        //autoHeight: true,
        //autoWidth: true,
        autoplay: true,
        autoplayTimeout: 5000,
        dots: true
    });

});
