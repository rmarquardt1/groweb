$(document).ready(function(){
    hostCardHeight();
    $(window).resize(hostCardHeight);
    $('.host-links ul li.details').hover(hostLinkHover, hostLinkOff);
    $('.host-links ul li.details').click(hostDetails);
    $('.close-details').click(hostDetailsClose);
    
    //////////////////////////////////////////////////////////// 

    function hostCardHeight() {
        var heightArray = [];
        var w = $(window).width();
        if (w > 768) {
            $('#hosting-area .card, #services-area .card').each(function(){
                if (!$(this).hasClass('opened')) {
                    var h = $(this).height();
                    heightArray.push(h);
                }
            });
            var hMax = Math.max.apply(this, heightArray);
            $('#hosting-area .card, #services-area .card').each(function(){
                if (!$(this).hasClass('opened')) {
                    $(this).css('min-height', hMax);
                }
            });
            $('#services-area .card-body').css('min-height', hMax); 
        } else {
            $('#hosting-area .card, #services-area .card').css('min-height', 'initial');
            $('#services-area .card-body').css('min-height', 'initial');
        }
    }
    
    //////////////////////////////////////////////////////////// 

    function hostLinkHover() {
        var text = $(this).children('.details-text')
        var arrow = $(this).children('.details-arrow');
        TweenMax.to(text, 0.3, {x:-20});
        TweenMax.to(arrow, 0.3, {x:20});
    }
    
    //////////////////////////////////////////////////////////// 

    function hostLinkOff() {
        var details = $(this).parents('.card-body').children('.detail-view');
        var text = $(this).children('.details-text')
        var arrow = $(this).children('.details-arrow');
        if (!$(this).hasClass('opened')) {
            TweenMax.to(text, 0.3, {x:0});
            TweenMax.to(arrow, 0.3, {x:0});
        } 
    }
    
    //////////////////////////////////////////////////////////// 

    function hostDetails() {
        var text = $(this).parents('.card-body').find('.details-text')
        var arrow = $(this).parents('.card-body').find('.details-arrow');
        TweenMax.set(text, {x:-20});
        TweenMax.set(arrow, {x:20});
        var details = $(this).parents('.card-body').children('.detail-view');
        var close = $(details).children('.close-details');
        var card = $(this).parents('.card');
        if ($(this).hasClass('opened')) {
            $(details).slideUp();
            TweenMax.set(close,{scale:0});
            $(this).removeClass('opened');
            $(card).removeClass('opened');
        } else {
            $(details).slideDown();
            setTimeout(function(){
                TweenMax.to(close,0.3,{scale:1,ease: Power0.easeNone});
            },400);    
            $(this).addClass('opened');
            $(card).addClass('opened');
        }  
    }
    
    //////////////////////////////////////////////////////////// 

    function hostDetailsClose() {
        var text = $(this).parents('.card-body').find('.details-text')
        var arrow = $(this).parents('.card-body').find('.details-arrow');
        var details = $(this).parents('.card-body').children('.detail-view');
        var detailsButton = $(this).parents('.card-body').find('.opened');
        $(details).slideUp();
        TweenMax.to(text, 0.3, {x:0});
        TweenMax.to(arrow, 0.3, {x:0});
        TweenMax.set($(this),{scale:0});
        $(detailsButton).removeClass('opened');
    }
          
});
