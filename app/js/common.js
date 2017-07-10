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
    var owl = $(".carousel-wrap");
    owl.owlCarousel({
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
    //анимация блоков внутри карусели https://codepen.io/motif/pen/qreRym
    //анимацию качаем тут https://daneden.github.io/animate.css/
    function setAnimation ( _elem, _InOut ) {
        var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        _elem.each ( function () {
            var $elem = $(this);
            var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );
            $elem.addClass($animationType).one(animationEndEvent, function () {
                $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
            });
        });
    }
    owl.on('change.owl.carousel', function(event) {
        var $currentItem = $('.owl-item', owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-out]");
        setAnimation ($elemsToanim, 'out');
    });
    owl.on('changed.owl.carousel', function(event) {
        var $currentItem = $('.owl-item', owl).eq(event.item.index);
        var $elemsToanim = $currentItem.find("[data-animation-in]");
        setAnimation ($elemsToanim, 'in');
    });
    
    //Parallax
    //https://github.com/nk-o/jarallax
    $('.welcome, .denomination, .quality').jarallax({
        speed: 0.8,
        zIndex: -1
    });
    
    //ScrollTo
    //https://github.com/mpacek/Scrollto
    if ($.fn.scrolltoSetup) {
        $('.btn-down__btn').scrolltoSetup({
            animationSpeed: 1500,
            additionalHeight: 100
        });
    }
    
    
    
    //кнопка прокрутки вверх
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#go-up').fadeIn();
        } else {
            $('#go-up').fadeOut();
        }
    });
    $('#go-up').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
    
});
