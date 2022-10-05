//"use strict";


jQuery(document).ready(function ($) {
	$(window).load(function () {
		$(".loaded").fadeOut();
		$(".preloader").delay(1000).fadeOut("slow");
	});

    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    
    
    
    
    
//    $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
//        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//            var target = $(this.hash);
//            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//            if (target.length) {
//                $('html,body').animate({
//                    scrollTop: (target.offset().top - 40)
//                }, 1000);
//                if ($('.navbar-toggle').css('display') != 'none') {
//                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
//                }
//                return false;
//            }
//        }
//    });
	

	/*---------------------------------------------*
     * Menu Background Change
     ---------------------------------------------*/
	
	var windowWidth = $(window).width();
    if (windowWidth > 757) {
            $(window).scroll(function () {
                if ($(this).scrollTop() >200) {
                    $('.navbar').fadeIn(200);
                    $('.navbar').addClass('menu-bg');
                } else {
                    $('.navbar').removeClass('menu-bg');
                }
            });
    }
		$('#bs-example-navbar-collapse-1').localScroll();
		
	/*---------------------------------------------*
     * Scroll Up
     ---------------------------------------------*/	
		$(window).scroll(function(){
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
		});
		
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 },1000);
			return false;
		});
		
	


    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

		$.localScroll();



    /*---------------------------------------------*
     * Counter 
     ---------------------------------------------*/

//    $('.statistic-counter').counterUp({
//        delay: 10,
//        time: 2000
//    });




    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

//        var wow = new WOW({
//            mobile: false // trigger animations on mobile devices (default is true)
//        });
//        wow.init();


    /* ---------------------------------------------------------------------
     Carousel
     ---------------------------------------------------------------------= */

//    $('.testimonials').owlCarousel({
//        responsiveClass: true,
//        autoplay: false,
//        items: 1,
//        loop: true,
//        dots: true,
//        autoplayHoverPause: true
//
//    });



    $(document).ready(function(){
        
        
        
    
    
    
    $('.template').hover(templateHover, templateHoverOff);
    
    
    function templateHover() {
        var template = $(this);
        var tCol = $(template).parent('div');
        var tImg = $(this).find('img');
        var tDesk = $(this).find('.desktop-view');
        var tTablet = $(this).find('.tablet-view');
        var tMobile = $(this).find('.mobile-view');
        TweenMax.to(tImg, 0.3, {boxShadow:'0 0 35px rgba(0,0,0,0.5)',opacity:0.5,ease:Power0.easeNone});
        TweenMax.to(tTablet, 0.2, {scale:1,ease: Power0.easeNone});
        TweenMax.to(tMobile, 0.2, {scale:1,ease: Power0.easeNone});
        TweenMax.to(tDesk, 0.2, {scale:1,ease: Power0.easeNone});
    }
        
    function templateHoverOff() {
        var template = $(this);
        var tCol = $(template).parent('div');
        var tImg = $(this).find('img');
        var tDesk = $(this).find('.desktop-view');
        var tTablet = $(this).find('.tablet-view');
        var tMobile = $(this).find('.mobile-view');
        TweenMax.to(tImg, 0.3, {boxShadow:'none',opacity:1,ease:Power0.easeNone});  
        TweenMax.to(tTablet, 0.2, {scale:0,ease: Power0.easeNone});
        TweenMax.to(tMobile, 0.2, {scale:0,ease: Power0.easeNone});
        TweenMax.to(tDesk, 0.2, {scale:0,ease: Power0.easeNone});   
    }
        
        ////////////// Tablet Menu Toggle ///////////////
        
        $('.navbar-toggle').click(tabletMenu);
        
        function tabletMenu() {
            var navMenu = $('.navbar-menu');
            if ($(this).hasClass('opened')) {
                TweenMax.to(navMenu, 0.5, {left:'101%'});
                $(this).removeClass('opened');
            }
            else {
                TweenMax.to(navMenu, 0.5, {left:'50%'});
                $(this).addClass('opened');
            }  
        }
        
        
        //////////////// Set Step Position /////////////////
        setStep();
        $(window).resize(setStep);
      //  $('#process-area .step').each(setStep);
        
        function setStep() {
            $('#process-area .step').each(function(){
                var w = $(window).width();
                if (w < 768) {
                    var windowScroll = $(window).scrollTop();
                    var windowH = $(window).height();
                    var windowBottom = windowScroll + windowH;
                    var containerW = $(this).parents('.container').width();
                    var margin = ($(window).width() - containerW) / 2;
                    var colW = $(this).parent('.col-lg-5').width();
                    var stepPos = colW + margin;
                    var stepOffset = windowBottom - $(this).offset().top;
                    if (stepOffset < 0) {
                        if ($(this).hasClass('step-left')) {
                            $(this).css('right',stepPos);
                        }
                        if ($(this).hasClass('step-right')) {
                            $(this).css('left',stepPos);
                        }
                    } else {}
                
                } else {}
            }); 
        }
        
        
        
        //////////////// Home Page Scroll ////////////////
        
        $(window).scroll(homeScroll);
        
        function homeScroll() {
            var windowScroll = $(window).scrollTop();
            var windowH = $(window).height();
            var windowBottom = windowScroll + windowH;
            $('#services-area .card-wrapper').each(function(){
                var cardPos = windowBottom - $(this).offset().top;
                if (cardPos > 0) {
                   TweenMax.to($(this), 0.7, {scale:1}); 
                } else {
                    TweenMax.to($(this), 0.7, {scale:0}); 
                }
            });
            
            $('#process-area .step').each(function() {
                var containerW = $(this).parents('.container').width();
                var margin = ($(window).width() - containerW) / 2;
                var colW = $(this).parent('.col-lg-5').width();
                var stepReverse = colW + margin;
                var stepPos = windowBottom - $(this).offset().top;
                if (stepPos > 100) {
                    if ($(this).hasClass('step-left')) {
                        TweenMax.to($(this), 0.7, {right:0}); 
                    }
                    if ($(this).hasClass('step-right')) {
                        TweenMax.to($(this), 0.7, {left:0}); 
                    }
                }
                else {
                    if ($(this).hasClass('step-left')) {
                        TweenMax.to($(this), 0.7, {right:stepReverse}); 
                    }
                    if ($(this).hasClass('step-right')) {
                        TweenMax.to($(this), 0.7, {left:stepReverse}); 
                    }
                }
            });
        }
        
        $('.view').click(openView);
        $('#closeView').click(closeView);
        
        
        
        function openView() {
            var tName = $(this).parent().attr('id');
            var viewType = $(this).data('viewtype');
            var url = 'assets/templates/' + tName + '/index.html';
            var viewT = $(window).height() / 2;
            var viewL = $(window).width() / 2;
            $('#viewBox').append('<iframe src="' + url + '"></iframe>');
            
            if (viewType == 'mobile') {
                $('#viewBox').height(690);
                $('#viewBox').width(360);
                $('#viewBox iframe').height(636);
            }
            
            if (viewType == 'tablet') {
//                var h = $(window).height() * .9;
                $('#viewBox').height('92%');
                $('#viewBox').width(768);
                $('#viewBox').css('top',99);
                $('#viewBox iframe').height('84%');
            }
            
            
            
            
            
            var tl = new TimelineMax(); 
            setTimeout(function(){
                    tl.to($('#viewOverlayL'), 1.3, {right:0})
                    .to($('#viewOverlayR'), 1.3, {left:0}, '-=1.3')
                    .to($('#viewOverlayT'), 1.3, {bottom:0}, '-=1.3')
                    .to($('#viewOverlayB'), 1.3, {top:0}, '-=1.3')
                    .to($('#viewBox'), .7, {scale:1}, '-=0.7');

                },100)
            
            
            
            
            
            
            
            
            
            
            
            
            
            
        }
        
        
        function closeView() {
            
            var tl = new TimelineMax();
            
//            $('#viewBox').fadeOut();
//            $('#viewOverlay').fadeOut();
            
            
            tl.to($('#viewOverlayL'), 1.3, {right:'100%'})
            .to($('#viewOverlayR'), 1.3, {left:'100%'}, '-=1.3')
            .to($('#viewOverlayT'), 1.3, {bottom:'100%'}, '-=1.3')
            .to($('#viewOverlayB'), 1.3, {top:'100%'}, '-=1.3')
            .to($('#viewBox'), .5, {scale:0}, '-=1.3');
            
            setTimeout(function(){
                $('#viewBox iframe').remove();
            },1300);
            
            
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    });
    
    

    
    
    
});
