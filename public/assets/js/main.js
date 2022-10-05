$(document).ready(function(){
    var windowWidth = $(window).width();
    
    
    $(window).on('load',function () {
		$(".loaded").fadeOut();
		$(".preloader").delay(1000).fadeOut("slow");
	});
    
    
    $(window).resize(setStep);
    $(window).scroll(function(){
        homeScroll();
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    setStep();
    $('.jump').click(jumpTo);
    $('.navbar-toggle').click(tabletMenu);
//    $('#bs-example-navbar-collapse-1').localScroll();
//    $.localScroll();
    $('.scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 },1000);
        return false;
    });
    
    /////////// Set flex on fading flex boxes ////////////
        
    $('.content-loading').css('display', 'flex').hide();
    $('#formSubmitted').css('display', 'flex').hide();
	
    ////////////// NavBar Show/Hide ///////////////
	
    if (windowWidth > 757) {
            $(window).scroll(function () {
                if($('#home').length) {
                    if ($(this).scrollTop() >200) {
                        $('.navbar').fadeIn(200);
                        $('.navbar').addClass('menu-bg');
                    } else {
                        $('.navbar').removeClass('menu-bg');
                    }
                } else {} 
            });
    }
    
    ////////////// Tablet Menu Toggle ///////////////

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
         
    function homeScroll() {
        var windowScroll = $(window).scrollTop();
        var windowH = $(window).height();
        var windowW = $(window).width();
        var windowBottom = windowScroll + windowH;
        $('#services-area .card-wrapper').each(function(){
            var cardPos = windowBottom - $(this).offset().top;
            if (cardPos > 0) {
               TweenMax.to($(this), 0.7, {scale:1, force3D:true}); 
            } else {
                TweenMax.to($(this), 0.7, {scale:0, force3D:true}); 
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
                    TweenMax.to($(this), 0.7, {right:0, force3D:true}); 
                }
                if ($(this).hasClass('step-right')) {
                    TweenMax.to($(this), 0.7, {left:0, force3D:true}); 
                }
            }
            else {
                if ($(this).hasClass('step-left')) {
                    TweenMax.to($(this), 0.7, {right:stepReverse, force3D:true}); 
                }
                if ($(this).hasClass('step-right')) {
                    TweenMax.to($(this), 0.7, {left:stepReverse, force3D:true}); 
                }
            }
        });
        if (windowW <= 768) {
            $('.process-wrap-mobile .step').each(function(){
                var containerW = $(this).parents('.container').width();
                var margin = ($(window).width() - containerW) / 2;
                var colW = $(this).parent('.col-lg-5').width();
                var stepReverse = colW + margin;
                var stepPos = windowBottom - $(this).offset().top;
                if (stepPos > 100) {
                    TweenMax.to($(this), 0.7, {left:0, force3D:true});
                }
                else {
                    TweenMax.to($(this), 0.7, {left:'150%', force3D:true});
                }
            });   
        }  
    }
         
    //////////////////////////// Home Page Jump ///////////////////////

    function jumpTo() {
        var section = $(this).data('section');
        $('html, body').animate({
            scrollTop: $('#' + section).offset().top
        }, 1000); 
    }
        
    //////////////////////////// Contact Form /////////////////////// 
        
    $('#formSubmit').click(function(){
        $('.content-loading').fadeIn(200);
        var dataString = {
            submit: $('#formSubmit').val(),
            fname:  $('#fname').val(),
            femail:  $('#femail').val(),
            fsubject:  $('#fsubject').val(),
            fbody:  $('#fbody').val()
        }
        $.ajax({
            type: "POST",
            url: "../app/mailer.php",
            data: dataString,
            success: function(){
                $('#formSubmitted').show();
                 setTimeout(function(){
                     $('.content-loading').fadeOut();
                 },1000)   
            },
            error: function(jqXHR, textStatus, error){
                alert('failed')
                console.log(jqXHR);
                console.log(textStatus);
                console.log(error);
            }
        }); 
    });
        
});