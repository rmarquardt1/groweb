$(document).ready(function(){
    var pageLoaded = 0;
    var tlOpen = new TimelineMax({paused:true});
    var tlClose = new TimelineMax({paused:true});
    getTemplates(0);
    getTemplatePages();
    
    $(window).resize(function(){
        desktopViewMenu();
    });
    
    setTimeout(function(){
        $('#pageCount li:first-child').addClass('active');
    }, 500);

    $('#templateCount').change(function(){
        var pageLimit = $(this).val();
        getTemplates(0, pageLimit);
        getTemplatePages(pageLimit);
    });
    
    $('#nextPage, #prevPage').click(function(){
        var page = $(this).attr('id');
        var pageArray = [];
        $('.page-num').each(function(){
           pageArray.push($(this).attr('data-page')); 
        });
        var max = Math.max.apply(this, pageArray);
        var next = $('#nextPage').attr('data-page');
        var prev = $('#prevPage').attr('data-page');
        if (page == 'prevPage' && prev != 0 || page == 'nextPage' && next <= max) {
            templatePageChange(); 
        }
    });
    
    $('.view-list ul li').click(changeView);
    $('.pages-button').click(function(){
        var disp = $('.template-overlay').css('display');
        $('.pages-list').slideToggle();
        $('.view-list').slideUp();
        if (disp == 'none') {
            $('.template-overlay').fadeIn();
        } else {
            $('.template-overlay').fadeOut();
        }
    });
    
    $('.view-button').click(function(){
        var disp = $('.template-overlay').css('display');
        $('.view-list').slideToggle();
        $('.pages-list').slideUp();
        if (disp == 'none') {
            $('.template-overlay').fadeIn();
        } else {
            $('.template-overlay').fadeOut();
        } 
    });
    
    //////////////////////////////////////////////////////////// 
        
    function templateHover() {
        var template = $(this);
        var tCol = $(template).parent('div');
        var tImg = $(this).find('img');
        var tDesk = $(this).find('.desktop-view');
        var tTablet = $(this).find('.tablet-view');
        var tMobile = $(this).find('.mobile-view');
        TweenMax.to(tImg, 0.3, {boxShadow:'0 0 35px rgba(0,0,0,0.7)',opacity:0.5,ease:Power0.easeNone});
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
        TweenMax.to(tImg, 0.3, {boxShadow:'0 0 35px rgba(0,0,0,0.15)',opacity:1,ease:Power0.easeNone});  
        TweenMax.to(tTablet, 0.2, {scale:0,ease: Power0.easeNone});
        TweenMax.to(tMobile, 0.2, {scale:0,ease: Power0.easeNone});
        TweenMax.to(tDesk, 0.2, {scale:0,ease: Power0.easeNone});   
    }
    
    //////////////////////////////////////////////////////////// 
        
     function openView() {
        $('body').addClass('no-scroll');
        var w = $(window).width();
        var tName = $(this).parent().attr('id');
        var viewType = $(this).data('viewtype');
        var path = 'assets/templates/' + tName + '/';
        var viewT = $(window).height() / 2;
        var viewL = $(window).width() / 2;
        $('#templateFrame').attr('data-path', path);
        $('#templateFrame').attr('src', path + 'index.html');
        $('.template-title').append(tName);
        var e = event.target;
        if (viewType == 'mobile') {
            if (w <= 768 && w > 480) {
                $('.screenshot-container').append('<img src="' + path + 'mobile.png" id="screenshot" />');
                $('.screenshot-container').height(640);
                $('.screenshot-container').width(360);
                $('.view-title').append('Mobile'); 
            }   
            if (w <= 480) { 
                $('.screenshot-container').append('<img src="' + path + 'mobile.png" id="screenshot" />');
            }
        }
        if (viewType == 'tablet') {
            if (w <= 768 && w > 480) {
                $('.screenshot-container').append('<img src="' + path + 'tablet.png" id="screenshot" />');
                $('.screenshot-container').height(695);
                $('.screenshot-container').width(612);
                $('.view-title').append('Tablet');
            }    
            if (w <= 480) { 
                $('.screenshot-container').append('<img src="' + path + 'tablet.png" id="screenshot" />');
            }
        }
        if (viewType == 'desktop') {
            desktopViewMenu();
            if (w <= 768 && w > 480) {
                $('.screenshot-container').append('<img src="' + path + 'desktop.png" id="screenshot" />');
                $('.screenshot-container').height(695);
                $('.screenshot-container').width(612);
                $('.view-title').append('Desktop');
            }    
            if (w <= 480) { 
                $('.screenshot-container').append('<img src="' + path + 'desktop.png" id="screenshot" />');
            }
        }
        if (w <= 768) {
            $('.pages-button').hide();
            $('#viewBox iframe').hide();
        }
        if (w <= 480) { 
            $('.view-title').hide();
        }
        setTimeout(function(){
            tlOpen.restart();
            },200);
        setTimeout(loadPages, 500);
        setTimeout(templateScrollBar, 1000) ;
        setTimeout(function(){
            vbClassChange(e);
        },500); 
    }
     
    //////////////////////////////////////////////////////////// 
        
    function changeView() {
        $('.screenshot-container').empty();
        $('.pages-list').removeAttr('style');
        $('.view-list').removeAttr('style');
        var e = event.target;
        var view = $(this).data('viewtype');
        var frame = $('#templateFrame');
        var h = $(window).height();
        var w = $(window).width();
        var screen = $('.screenshot-container');
        setTimeout(function(){
            vbClassChange(e);
        },500);
        if (view == 'desktop') {
            desktopViewMenu();
            $('.template-overlay').hide();
            TweenMax.to($('#pages'), 0.2, {opacity:0});
            TweenMax.to($('#pages'), 0.2, {opacity:1, delay:0.5});
            TweenMax.to($('#viewBox iframe'), 0.5, {height:'87%'});
            setTimeout(function(){
                $('.view-title').empty().append('Desktop');
            },500);
            if (w > 768) {
                TweenMax.to($('#viewBox'), 0.5, {width:'90%'});
                TweenMax.to($('#viewBox iframe'), 0.5, {width:'91.9%'});
                TweenMax.to($('#viewBox'), 0.5, {height:'96%'});
            }
            if (w <= 768) {
                $('.screenshot-container').append('<img src="' + $('#templateFrame').data('path') + 'desktop.png" id="screenshot" />');
            }
            if (w <= 768 && w > 480) {
                TweenMax.to(screen, 0.5, {height:695});
                TweenMax.to(screen, 0.5, {width:612});
                TweenMax.to($('#viewBox'), 0.5, {width:670});
                TweenMax.to($('#viewBox'), 0.5, {height:855});
            }
        }
        if (view == 'tablet') {
            $('.template-overlay').hide();
            TweenMax.to($('#pages'), 0.2, {opacity:0});
            TweenMax.to($('#viewBox'), 0.5, {width:670});
            TweenMax.to($('#viewBox'), 0.5, {height:855});
            TweenMax.to($('#viewBox iframe'), 0.5, {height:695});
            TweenMax.to($('#viewBox iframe'), 0.5, {width:612});
            TweenMax.to($('#pages'), 0.2, {opacity:1, delay:0.5});
            setTimeout(function(){
                $('.view-title').empty().append('Tablet');
            },500);
            if (w > 768) {
                desktopViewMenu();
            }
            if (w <= 768) {
                $('.screenshot-container').append('<img src="' + $('#templateFrame').data('path') + 'tablet.png" id="screenshot" />');
            }
            if (w <= 768 && w > 480) {
                TweenMax.to(screen, 0.5, {height:695});
                TweenMax.to(screen, 0.5, {width:612});
            }   
            if (w <= 480) {
                desktopViewMenu();
            }
        }
        if (view == 'mobile') {
            $('.template-overlay').hide();
            TweenMax.to($('#pages'), 0.2, {opacity:0});
            TweenMax.to($('#viewBox'), 0.5, {width:394});
            TweenMax.to($('#viewBox'), 0.5, {height:770});
            TweenMax.to($('#viewBox iframe'), 0.5, {height:640});
            TweenMax.to($('#viewBox iframe'), 0.5, {width:360});
            TweenMax.to($('#pages'), 0.2, {opacity:1, delay:0.5});
            $('.view-title').append('Mobile');
            if (w <= 768) {
                $('.screenshot-container').append('<img src="' + $('#templateFrame').data('path') + 'mobile.png" id="screenshot" />');
            }
            if (w <= 768 && w > 480) {
                TweenMax.to(screen, 0.5, {height:640});
                TweenMax.to(screen, 0.5, {width:360});
            }
            if (w <= 480) {
                desktopViewMenu();
            }
        }
        $('.pages-list, .view-list').hide(); 
    }
    
    //////////////////////////////////////////////////////////// 
        
    function desktopViewMenu() {
        setTimeout(function(){
        var w = $(window).width();
        var vbh = $('#viewBox').height();
        var tfh = $('#templateFrame').height();
        var vbw = $('#viewBox').width();
        var tfw = $('#templateFrame').width();
        var menuT = ((vbh - tfh) / 2) - 13;
        var menuL = (vbw - tfw) / 2;
        if (w > 768) {
            $('.desktop-header .pages-list').css('top', menuT);
            $('.desktop-header .view-list').css('top', menuT);
            $('.desktop-header .pages-list').width(tfw);
            $('.desktop-header .view-list').width(tfw);
            $('.desktop-header .pages-list').css('left', menuL + 'px');
            $('.desktop-header .view-list').css('left', menuL + 'px');
        }
        if (w <= 480) {
            var ssH = $('.screenshot-container').height();
            var ssW = $('.screenshot-container').width();
            var mobileMenuL = ((vbw - ssW) / 2) - 30;
            var mobileMenuT = (vbh - ssH) / 2; 
            $('.pages-list').width(ssW);
            $('.view-list').width(ssW);
            $('.pages-list').css('left', mobileMenuL + 'px');
            $('.view-list').css('left', mobileMenuL + 'px');
        }
        },1100)
    }
    
    //////////////////////////////////////////////////////////// 
      
    function vbClassChange(e) {
        var viewType = $(e).data('viewtype');
            if (viewType == 'mobile') {
            $('#viewBox').removeClass('desktop-viewbox');
            $('#viewBoxHeader').removeClass('desktop-header');
            $('#viewBox').removeClass('tablet-viewbox');
            $('#viewBoxHeader').removeClass('tablet-header');
            $('#viewBox').addClass('mobile-viewbox');
            $('#viewBoxHeader').addClass('mobile-header');
            $('#viewBoxHeader h4').hide();
        }
        if (viewType == 'tablet') {
            $('#viewBox').removeClass('desktop-viewbox');
            $('#viewBoxHeader').removeClass('desktop-header');
            $('#viewBox').removeClass('mobile-viewbox');
            $('#viewBoxHeader').removeClass('mobile-header');
            $('#viewBox').addClass('tablet-viewbox');
            $('#viewBoxHeader').addClass('tablet-header');
            $('#viewBoxHeader h4').show(); 
        }
        if (viewType == 'desktop') {
            $('#viewBox').removeClass('tablet-viewbox');
            $('#viewBoxHeader').removeClass('tablet-header');
            $('#viewBox').removeClass('mobile-viewbox');
            $('#viewBoxHeader').removeClass('mobile-header');
            $('#viewBox').addClass('desktop-viewbox');
            $('#viewBoxHeader').addClass('desktop-header');
            $('#viewBoxHeader h4').show(); 
        }
    }
    
    //////////////////////////////////////////////////////////// 
        
    function changePage() {
        var url = $(this).attr('data-url');
        $('#templateFrame').attr('src', url); 
        $('.pages-list').hide();
    }
    
    //////////////////////////////////////////////////////////// 
        
    function loadPages() {
        $('#pages .pages-list ul').empty();
        if (pageLoaded == 0) {
            var path = $('#templateFrame').attr('data-path');
            var iframe = document.getElementById('templateFrame');
            var innerDoc = iframe.contentDocument;
            var link = innerDoc.getElementsByTagName('a');
            var linkArray = [];
            $(link).each(function(){
                var href = $(this).attr('href');
                if (href.indexOf('http') === -1 && href.indexOf('#') === -1) {
                    var linkUrl = href;
                    var linkText = $(this).text();
                    var link = {url:linkUrl,text:linkText};
                    linkArray.push(link);
                }
            });
            var valuesSoFar = Object.create(null);
            for (i = 0; i < linkArray.length; i++) {
                var url = path + linkArray[i].url;
                var text = linkArray[i].text;
                if (url in valuesSoFar) {
                } else {
              $('#pages .pages-list ul').append('<li data-url="' + url + '">' + text + '</li>');
                }
                valuesSoFar[url] = true;
            }
            $('#pages ul li a').each(function(){
               var url = $(this).attr('data-url');
                if (url.indexOf('index.html') !== -1) {
                    $(this).text('Home');
                }
            });
            $(document).off('click', '#pages .pages-list ul li', changePage); 
            $(document).on('click', '#pages .pages-list ul li', changePage); 
            pageLoaded = 1;
        } 
    }
        
    /////////////////// Initialize Timelines //////////////////

    tlOpen.to($('#viewOverlayL'), 1.3, {right:0})
    .to($('#viewOverlayR'), 1.3, {left:0}, '-=1.3')
    .to($('#viewOverlayT'), 1.3, {bottom:0}, '-=1.3')
    .to($('#viewOverlayB'), 1.3, {top:0}, '-=1.3')
    .to($('#viewBox'), .7, {scale:1}, '-=0.7');

     tlClose.to($('#viewOverlayL'), 1.3, {right:'100%'})
    .to($('#viewOverlayR'), 1.3, {left:'100%'}, '-=1.3')
    .to($('#viewOverlayT'), 1.3, {bottom:'100%'}, '-=1.3')
    .to($('#viewOverlayB'), 1.3, {top:'100%'}, '-=1.3')
    .to($('#viewBox'), .5, {scale:0}, '-=1.3');

    TweenMax.to(tlOpen, 0.5, {progress:1, onComplete:function(){
      tlOpen.pause(0);
    }});
        
    ////////////////////////////////////////////////////////////  
        
    function templateScrollBar() {
       var head = $('#templateFrame').contents().find('head');
        $(head).append('<style>::-webkit-scrollbar {width: 10px;}::-webkit-scrollbar-thumb {background: #B33E39;}::-webkit-scrollbar-track {background: #333;}</style>');
    }
    ////////////////////////////////////////////////////////////     
    
    function closeView() {
        $('body').removeClass('no-scroll');
        tlClose.restart();
        setTimeout(function(){
            $('#templateFrame').attr('src','');
            $('#templateFrame').attr('data-url','');
            $('#templateFrame').show();
            $('#viewBox').css('overflow-y', 'hidden');
            $('#screenshot').remove();
            $('.pages-menu').show();
            $('.screenshot-container').height(0);
            $('#pages select').empty();
            $('#templateFrame, #viewBox').removeAttr('style');
            $('.screenshot-container').removeAttr('style');
            $('.template-title, .view-title').empty();
            pageLoaded = 0;
        },1300);
    }
    ////////////////////////////////////////////////////////////  
    
    function getTemplates(start) {
        $('.template-row').empty();
        var pageLimit = $('#templateCount').val();
        $.ajax({
            type: 'POST',
            url: "../app/getTemplates.php", 
            data: {start: start,stop:pageLimit,action:'pagePopulate'},
            success: function(data){
                $.each(data, function(index, el){
                    var name = el.Name;
                    var nameId = el.NameID;
                    var path = el.Path;
                    $('.template-row').append('<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12"><h4>' + name + '</h4><div class="template" id="' + name + '"><img src="' + path + 'thumb.png" class="screenshot shadow" /><a class="view desktop-view" data-viewtype="desktop">Desktop</a><a class="view tablet-view" data-viewtype="tablet">Tablet</a><a class="view mobile-view" data-viewtype="mobile">Mobile</a></div></div>');
                });   
                $(document).off('mouseover', '.template', templateHover); 
                $(document).off('mouseout', '.template', templateHoverOff);            
                $(document).off('click', '.view', openView);
                $(document).off('click', '#closeView', closeView);  
                $(document).on('mouseover', '.template', templateHover); 
                $(document).on('mouseout', '.template', templateHoverOff);            
                $(document).on('click', '.view', openView);
                $(document).on('click', '#closeView', closeView);     
            }
        });
    }
    
    ////////////////////////////////////////////////////////////  
    
    function templatePageChange() {
        var e = event.target;
        $(e).attr('data-page');
        $(e).parent('li').addClass('active');
        var pageNum = parseInt($(e).attr('data-page'));
        var pageLimit = $('#templateCount').val();
        $('#pageCount li a').each(function(){
           $(this).parent('li').removeClass('active');
            if ($(this).attr('data-page') == pageNum) {
                $(this).parent('li').addClass('active');
            }  
        });
        $('#nextPage').attr('data-page', pageNum + 1);
        $('#prevPage').attr('data-page', pageNum - 1);
        var start = pageLimit * (pageNum - 1); 
        getTemplates(start);
    }
    
    /////////////////////////////////////////////////////////////
    
    function getTemplatePages() {
        $('#pageCount').empty();
        var pageLimit = $('#templateCount').val();
        $.ajax({
            type: 'POST',
            url: "../app/getTemplates.php",
            data:{action: 'pageCount'},
            success: function(data){
                var count = data;
                var pages = count / pageLimit;
                for (i = 0; i < pages;  i++) {
                    $('#pageCount').append('<li><a class="page-num" data-page="' + (i+1) + '">' + (i+1) + '</a></li>');
                }
                $(document).off('click', '.page-num', templatePageChange);
                $(document).on('click', '.page-num', templatePageChange);
            }
        });
    }
  
});
    
    

    
    
    
