//(function(){var e;e=function(){function e(e){this.o=null!=e?e:{},window.isAnyResizeEventInited||(this.vars(),this.redefineProto())}return e.prototype.vars=function(){return window.isAnyResizeEventInited=!0,this.allowedProtos=[HTMLDivElement,HTMLFormElement,HTMLLinkElement,HTMLBodyElement,HTMLParagraphElement,HTMLFieldSetElement,HTMLLegendElement,HTMLLabelElement,HTMLButtonElement,HTMLUListElement,HTMLOListElement,HTMLLIElement,HTMLHeadingElement,HTMLQuoteElement,HTMLPreElement,HTMLBRElement,HTMLFontElement,HTMLHRElement,HTMLModElement,HTMLParamElement,HTMLMapElement,HTMLTableElement,HTMLTableCaptionElement,HTMLImageElement,HTMLTableCellElement,HTMLSelectElement,HTMLInputElement,HTMLTextAreaElement,HTMLAnchorElement,HTMLObjectElement,HTMLTableColElement,HTMLTableSectionElement,HTMLTableRowElement],this.timerElements={img:1,textarea:1,input:1,embed:1,object:1,svg:1,canvas:1,tr:1,tbody:1,thead:1,tfoot:1,a:1,select:1,option:1,optgroup:1,dl:1,dt:1,br:1,basefont:1,font:1,col:1,iframe:1}},e.prototype.redefineProto=function(){var e,t,n,o;return t=this,o=function(){var o,i,r,a;for(r=this.allowedProtos,a=[],e=o=0,i=r.length;i>o;e=++o)n=r[e],null!=n.prototype&&a.push(function(e){var n,o;return n=e.prototype.addEventListener||e.prototype.attachEvent,function(n){var o;return o=function(){var e;return(this!==window||this!==document)&&(e="onresize"===arguments[0]&&!this.isAnyResizeEventInited,e&&t.handleResize({args:arguments,that:this})),n.apply(this,arguments)},e.prototype.addEventListener?e.prototype.addEventListener=o:e.prototype.attachEvent?e.prototype.attachEvent=o:void 0}(n),o=e.prototype.removeEventListener||e.prototype.detachEvent,function(t){var n;return n=function(){return this.isAnyResizeEventInited=!1,this.iframe&&this.removeChild(this.iframe),t.apply(this,arguments)},e.prototype.removeEventListener?e.prototype.removeEventListener=n:e.prototype.detachEvent?e.prototype.detachEvent=wrappedListener:void 0}(o)}(n));return a}.call(this)},e.prototype.handleResize=function(e){var t,n,o,i,r,a;return n=e.that,this.timerElements[n.tagName.toLowerCase()]?this.initTimer(n):(o=document.createElement("iframe"),n.appendChild(o),o.style.width="100%",o.style.height="100%",o.style.position="absolute",o.style.zIndex=-999,o.style.opacity=0,o.style.top=0,o.style.left=0,t=window.getComputedStyle?getComputedStyle(n):n.currentStyle,r="static"===t.position&&""===n.style.position,i=""===t.position&&""===n.style.position,(r||i)&&(n.style.position="relative"),null!=(a=o.contentWindow)&&(a.onresize=function(e){return function(){return e.dispatchEvent(n)}}(this)),n.iframe=o),n.isAnyResizeEventInited=!0},e.prototype.initTimer=function(e){var t,n;return n=0,t=0,this.interval=setInterval(function(o){return function(){var i,r;return r=e.offsetWidth,i=e.offsetHeight,r!==n||i!==t?(o.dispatchEvent(e),n=r,t=i):void 0}}(this),this.o.interval||200)},e.prototype.dispatchEvent=function(e){var t;return document.createEvent?(t=document.createEvent("HTMLEvents"),t.initEvent("onresize",!1,!1),e.dispatchEvent(t)):document.createEventObject?(t=document.createEventObject(),e.fireEvent("onresize",t)):!1},e.prototype.destroy=function(){var e,t,n,o,i,r,a;for(clearInterval(this.interval),this.interval=null,window.isAnyResizeEventInited=!1,t=this,r=this.allowedProtos,a=[],e=o=0,i=r.length;i>o;e=++o)n=r[e],null!=n.prototype&&a.push(function(e){var t;return t=e.prototype.addEventListener||e.prototype.attachEvent,e.prototype.addEventListener?e.prototype.addEventListener=Element.prototype.addEventListener:e.prototype.attachEvent&&(e.prototype.attachEvent=Element.prototype.attachEvent),e.prototype.removeEventListener?e.prototype.removeEventListener=Element.prototype.removeEventListener:e.prototype.detachEvent?e.prototype.detachEvent=Element.prototype.detachEvent:void 0}(n));return a},e}(),"function"==typeof define&&define.amd?define("any-resize-event",[],function(){return new e}):"object"==typeof module&&"object"==typeof module.exports?module.exports=new e:("undefined"!=typeof window&&null!==window&&(window.AnyResizeEvent=e),"undefined"!=typeof window&&null!==window&&(window.anyResizeEvent=new e))}).call(this);









$(document).ready(function () {
    //    var VIEW_ID = '161095754';

    //var VIEW_ID = '132231151';

    $('#pageContainer').load('dashboard/site/admin/pages/main.php', function () {
        //alert('hello');
        //        loadSourceChart();
        //        getLocationData();
        //  getPageView();
        loadMainPage();
         // mapChart();
     //   stateMap();
      //  loadHeatMap();
       // countryMap();
       // myMap();






    });

    // setTimeout(function(){
    //    $example = $('.box');
    //    $example.on('onresize', function(){
    //      console.log('resized');
    //    })  
    //  },100)









    $('.box').resize(function () {
        console.log('resize');
    });



    function menuNav() {
        var page = $(this).data('page');
        $('#pageContainer').empty();
        $('#pageContainer').load('dashboard/site/admin/pages/' + page, function () {
            if (page == 'main.php') {
                //  loadSourceChart();
                //  getLocationData();
                loadMainPage();
                //mapChart();
                //stateChart();

                //                $('#osChart').getDeviceData({
                //                    domElement: document.getElementById('osChart'),
                //                    chartType: 'bar',
                //                    chartElement: '#osChart',
                //                    dimensions: 'ga:operatingSystem',
                //                    metrics: 'ga:sessions',
                //                    legend: document.getElementById('osLegend')
                //                });

            }
            if (page == 'location.php') {
                mapChart();
                loadHeatMap();
               // stateChart();
            }








            if (page == 'devices.php') {
                loadDevicePage();
                loadChartOptions();
            }
            if (page == 'custom.php') {
                loadChartOptions();
                $('#addChartDialog').css('display', 'flex').hide();
                $('.add-chart').click(function () {
                    $('#addChartDialog').show();
                });
                $('#customClose').click(function () {
                    $('#preview').empty();
                    $('#preview').width(0);
                    $('#addChartDialog').hide();
                });


                $('#f_MetricGroup').change(function () {
                    getMetadata('metric', $(this))
                });
                $('#f_DimensionGroup').change(function () {
                    getMetadata('dimension', $(this))
                });



                $('#customPreview').click(chartPreview);

                setTimeout(function () {
                    favClick();
                    $('[data-action="edit"]').click(function () {
                        alert('edit');
                    });
                    $('[data-action="delete"]').click(deleteChart);
                }, 1);

                $('#customSave').click(createChart);

            }
        });
    }




    //////////////////////// Main Page //////////////////////

//    function loadMainPage() {
//        $('.default-chart').each(function () {
//            var container = $(this).find('.chart-container');
//            var legendId = $(this).find('.legend').attr('id');
//            $().getDeviceData({
//                domElement: document.getElementById($(container).attr('id')),
//                chartType: $(container).attr('data-charttype'),
//                chartElement: '#' + $(container).attr('id'),
//                dimensions: $(container).attr('data-dimensions'),
//                metrics: $(container).attr('data-metrics'),
//                //legend: document.getElementById("'.$chartID.'legend")
//                legend: document.getElementById(legendId),
//                filter: $(container).attr('data-filter'),
//                dataType: $(container).attr('data-datatype'),
//                dateStart: $(container).attr('data-datestart'),
//                dateEnd: $(container).attr('data-dateend')
//            });
//        });
//    }

    
    function loadMainPage() {
        $('.default-chart .chart-container').each(function () {
            //var container = $(this).find('.chart-container');
            var container = $(this);
            var legendId = $(this).find('.legend').attr('id');
            $().getDeviceData({
                domElement: document.getElementById($(container).attr('id')),
                chartType: $(container).attr('data-charttype'),
                chartElement: '#' + $(container).attr('id'),
                dimensions: $(container).attr('data-dimensions'),
                metrics: $(container).attr('data-metrics'),
                //legend: document.getElementById("'.$chartID.'legend")
                legend: document.getElementById(legendId),
                filter: $(container).attr('data-filter'),
                dataType: $(container).attr('data-datatype'),
                dateStart: $(container).attr('data-datestart'),
                dateEnd: $(container).attr('data-dateend')
            });
        });
    }
    
    
    
    
    

    /////////////////////// Map Chart ////////////////////////

    function mapChart() {
        // var container = $(this).find('.chart-container');
        //     var legendId = $(this).find('.legend').attr('id');
        $().getDeviceData({
            domElement: document.getElementById('mapChart'),
            chartType: $('#mapChart').attr('data-charttype'),
            chartElement: '#mapChart',
            dimensions: $('#mapChart').attr('data-dimensions'),
            metrics: $('#mapChart').attr('data-metrics'),
            //legend: document.getElementById("'.$chartID.'legend")
            //legend: document.getElementById('heatLegend'),
            filter: $('#mapChart').attr('data-filter'),
            filterName: $('#mapChart').attr('data-filter-name'),
            filterVal: $('#mapChart').attr('data-filter-value')
        });
        $('.map svg path').hover(mapHover, mapOff);
    }


//myMap();

//    function myMap() {
//    console.log('triggered');
//        console.log(document.getElementById("googleMap"));
//    var mapProp = {
//            center: new google.maps.LatLng(51.508742, -0.120850),
//            zoom: 5,
//        };
//        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
//    
////}, 1000)
//        //        $().getDeviceData({
//        //            domElement: document.getElementById('CT-USchart'),
//        //            chartType: $('#CT-USchart').attr('data-charttype'),
//        //            chartElement: '#CT-USchart',
//        //            dimensions: $('#CT-USchart').attr('data-dimensions'),
//        //            metrics: $('#CT-USchart').attr('data-metrics'),
//        //            //legend: document.getElementById("'.$chartID.'legend")
//        //            //legend: document.getElementById('heatLegend'),
//        //            filter: $('#CT-USchart').attr('data-filter')
//        //        });
//
//
//    }


function stateMap() {
    
    $().getDeviceData({
            domElement: document.getElementById('stateMap'),
            chartType: 'stateMap',
            chartElement: '#stateMap',
            dimensions: $('#stateMap').attr('data-dimensions'),
            metrics: $('#stateMap').attr('data-metrics'),
            //legend: document.getElementById("'.$chartID.'legend")
            //legend: document.getElementById('heatLegend'),
            filter: $('#stateMap').attr('data-filter'),
            filterName: $('#stateMap').attr('data-filter-name'),
            filterVal: $('#stateMap').attr('data-filter-value')
        });
    
    
    
    
    
}
                
function countryMap() {
    $().getDeviceData({
            domElement: document.getElementById('countryMap'),
            chartType: 'countryMap',
            chartElement: '#countryMap',
            dimensions: $('#countryMap').attr('data-dimensions'),
            metrics: $('#countryMap').attr('data-metrics'),
            //legend: document.getElementById("'.$chartID.'legend")
            //legend: document.getElementById('heatLegend'),
            filter: $('#countryMap').attr('data-filter'),
            filterName: $('#countryMap').attr('data-filter-name'),
            filterVal: $('#countryMap').attr('data-filter-value')
        }); 
}


    
    function loadHeatMap() {
    $().getDeviceData({
            domElement: document.getElementById('heatMap'),
            chartType: $('#heatMap').attr('data-charttype'),
            chartElement: '#heatMap',
            dimensions: $('#heatMap').attr('data-dimensions'),
            metrics: $('#heatMap').attr('data-metrics'),
            filter: $('#heatMap').attr('data-filter'),
            filterName: $('#heatMap').attr('data-filter-name'),
            filterVal: $('#heatMap').attr('data-filter-value')
        }); 
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    /////////////////// Map Hover //////////////////////////

    function mapHover() {
        $(this).css({
            'fill': '#aadff3ff'
        });
        var name = $(this).attr('data-name');
        var metricVal = $(this).attr('data-metricval');
        var percent = $(this).attr('data-metricpercent');
        $('#dashboard-area').prepend('<div id="pieHover">' + name + '<br/>Sessions: ' + metricVal + ' (' + percent + '%)</div>');
        var x = event.clientX;
        var y = event.clientY;
        $('#pieHover').css({
            'top': y + 'px',
            'left': x + 20 + 'px'
        });
        this.onmousemove = function (e) {
            var x = e.clientX,
                y = e.clientY;
            $('#pieHover').css({
                'top': y + 'px',
                'left': x + 20 + 'px'
            });
        };
    }

    function mapOff() {
        var definedColor = $(this).attr('data-pathfill');

        if (typeof definedColor !== 'undefined') {
            $(this).css({
                'fill': definedColor
            });
        } else {
            $(this).css({
                'fill': 'rgb(245, 245, 245)'
            });
        }


        //        $(this).css({
        //            'fill': 'rgb(245, 245, 245)'
        //        });
        $('#pieHover').remove();
    }

    ///////////////////////////////////////////////////////////////









    //setTimeout(function(){
    //
    //
    //    // minimal heatmap instance configuration
    //    var heatmapInstance = h337.create({container: document.querySelector('.heatmap')});
    //
    //    // now generate some random data
    //    var points = [];
    //    var max = 0;
    //    var width = 840;
    //    var height = 400;
    //    var len = 200;
    //
    //    while (len--) {
    //        var val = Math.floor(Math.random() * 100);
    //       // max = Math.max(max, val);
    //        var point = {
    //            x: Math.floor(Math.random() * width),
    //            y: Math.floor(Math.random() * height),
    //            value: val
    //        };
    //        points.push(point);
    //    }
    //    // heatmap data format
    //    var data = {
    //        max: max,
    //        data: points
    //    };
    //    // if you have a set of datapoints always use setData instead of addData
    //    // for data initialization
    //    heatmapInstance.setData(data);
    //
    //
    //}, 2000);






    ////////////////////////// Create Chart Colors ////////////////////////////




    //    function createChartColors(legendId) {
    //       // alert('triggered');
    //        $(legendId).find('li').each(function(){
    //           console.log($(this)); 
    //        });
    //        
    //        
    //        
    //        
    //        
    //    }









    /////////////////////////////////////////////////////////////////////////////////


    ////////////////////////// Lighten/Darken Colors ////////////////////////////



    //    function LightenDarkenColor(col, amt) {
    //  
    //        var usePound = false;
    //
    //        if (col[0] == "#") {
    //            col = col.slice(1);
    //            usePound = true;
    //        }
    //
    //        var num = parseInt(col,16);
    //
    //        var r = (num >> 16) + amt;
    //
    //        if (r > 255) r = 255;
    //        else if  (r < 0) r = 0;
    //
    //        var b = ((num >> 8) & 0x00FF) + amt;
    //
    //        if (b > 255) b = 255;
    //        else if  (b < 0) b = 0;
    //
    //        var g = (num & 0x0000FF) + amt;
    //
    //        if (g > 255) g = 255;
    //        else if (g < 0) g = 0;
    //
    //        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    //
    //    }



    /////////////////////////////////////////////////////////////////////////////////



    function favClick() {
        $('.fav-update').click(function () {
            if ($(this).attr('data-fav') == 1) {
                var dataFav = 0;
                $(this).attr('data-fav', 0);
                $(this).css('color', '#cccccc');
            } else {
                var dataFav = 1;
                $(this).attr('data-fav', 1);
                $(this).css('color', '#ffc800');
            }
            var dataChartId = $(this).attr('data-chartid');
            updateFavs(dataChartId, dataFav);
        });
    }


    function updateFavs(dataChartId, dataFav) {
        $.ajax({
            type: 'POST',
            url: "app/dashboard/updateFavorites.php",
            data: {
                chartId: dataChartId,
                fav: dataFav
            },
            error: function (data) {
                console.log(data.responseText);
            }
        });
    }


    function createChart() {
        $.ajax({
            type: 'POST',
            url: "app/dashboard/updateChart.php",
            data: {
                Action: 'create',
                AccountID: '1001',
                Name: $('#f_CustomName').val(),
                Metrics: $('#f_CustomMetrics').val(),
                Dimensions: $('#f_CustomDimensions').val(),
                ChartType: $('#f_CustomType').val(),
                Size: 'chart-md',
                Favorite: $('#f_Favorite').val()
            },
            success: function (data) {
                alert('Chart Saved Successfully');
            },
            error: function (data) {
                console.log(data.responseText);
            }
        });
    }


    function deleteChart() {
        var chartId = $(this).attr('data-chartid');
        $.ajax({
            type: 'POST',
            url: "app/dashboard/updateChart.php",
            data: {
                Action: 'delete',
                ChartID: chartId
            },
            success: function (data) {
                alert('Chart Deleted');
            },
            error: function (data) {
                console.log(data.responseText);
            }
        });
    }

    function loadDevicePage() {
        $('#osChart').getDeviceData({
            domElement: document.getElementById('osChart'),
            chartType: 'bar',
            chartElement: '#osChart',
            dimensions: 'ga:operatingSystem',
            metrics: 'ga:sessions',
            legend: document.getElementById('osLegend')
        });
        $('#browserChart').getDeviceData({
            domElement: document.getElementById('browserChart'),
            chartType: 'bar',
            chartElement: '#browserChart',
            dimensions: 'ga:browser',
            metrics: 'ga:sessions',
            legend: document.getElementById('browserLegend')
        });
        $('#deviceChart').getDeviceData({
            domElement: document.getElementById('deviceChart'),
            chartType: 'pie',
            chartElement: '#deviceChart',
            dimensions: 'ga:deviceCategory',
            metrics: 'ga:sessions',
            legend: document.getElementById('deviceLegend')
        });
    }

    function loadChartOptions() {
        $('.change-chart-view').change(function () {
            var chart = '#' + $(this).parents('.card-body').find('.chart-container').attr('id');
            var cLegend = $(this).parents('.card-body').find('.legend')[0];
            var type = $(this).val();
            var dimensions = $(this).parents('.card-body').find('.chart-container').data('dimensions');
            var metrics = $(this).parents('.card-body').find('.chart-container').data('metrics');
            $(chart).empty();
            $(chart).getDeviceData({
                chartType: type,
                chartElement: chart,
                dimensions: dimensions,
                metrics: metrics,
                legend: cLegend
            });
        });
    }



    $('#dashboardMenu .main-list li').click(menuNav);









    //    function getPageView() {
    //        var dims = [];
    //        dims.push('ga:date');
    //        var jsonDims = JSON.stringify(dims);
    //        $.ajax({
    //            type: 'POST',
    //            url: "dashboard/site/admin/getMediumData.php",
    //            data: {
    //                date_start: '7daysAgo',
    //                date_end: 'today',
    //                metric: 'ga:pageviews',
    //                dims: jsonDims,
    //                type: 'time'
    //            },
    //            success: function (data) {
    //                var mediumArray = [];
    //                for (i = 0; i < data.length; i++) {
    //                    mediumArray.push(data[i]);
    //                }
    //                //handleData(mediumArray);
    //                var pageChart = new Chartist.Line('.view-chart', {
    //                    series: [
    //                        {
    //                            name: 'series-1',
    //                            data: mediumArray
    //                            }
    //                          ]
    //                }, {
    //                    low: 0,
    //                    showArea: true,
    //                    showPoint: false,
    //                    fullWidth: true
    //                }, {
    //                    axisX: {
    //                        type: Chartist.FixedScaleAxis,
    //                        divisor: 90,
    //                        labelInterpolationFnc: function (value) {
    //                            return moment(value).format('MMM D');
    //                        }
    //                    }
    //                });
    //                pageChart.on('draw', function (data) {
    //                    if (data.type === 'line' || data.type === 'area') {
    //                        data.element.animate({
    //                            d: {
    //                                begin: 0 * data.index,
    //                                dur: 1000,
    //                                //                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
    //                                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height() + 15).stringify(),
    //                                to: data.path.clone().stringify(),
    //                                easing: Chartist.Svg.Easing.easeOutQuint
    //                            }
    //                        });
    //                    }
    //                });
    //                $('.view-chart').addClass('view-chart-90');
    //            }
    //        });
    //    }









    function getLocationData() {
        var chartData = [];
        $.ajax({
            type: 'POST',
            url: "dashboard/site/admin/getdataclass.php",
            data: {
                date_start: '7daysAgo',
                date_end: 'today',
                metric: 'ga:pageviews',
                dimension: 'ga:country'
            },
            success: function (data) {
                var lArray = [];
                var vArray = [];
                var labels = data[0];
                var views = data[1];
                for (i = 0; i < views.length; i++) {
                    var l = labels[i];
                    var v = views[i].values[0];
                    vArray.push(parseInt(v));
                    lArray.push(l);
                }
                var data = {
                    series: vArray
                };
                var sum = function (a, b) {
                    return a + b
                };
                var options = {
                    labelInterpolationFnc: function (value, idx) {
                        var percentage = Math.round(value / data.series.reduce(sum) * 100) + '%';
                        return lArray[idx] + ' ' + perentage + '%';
                    }
                };
                var responsiveOptions = [
                    ['screen and (min-width: 640px)', {
                        chartPadding: 30,
                        labelOffset: 80,
                        labelDirection: 'explode',
                        labelInterpolationFnc: function (value, idx) {
                            var percentage = Math.round(value / data.series.reduce(sum) * 100) + '%';
                            return lArray[idx] + ' ' + percentage;
                        }
                    }],
                    ['screen and (min-width: 1024px)', {
                        labelOffset: 80,
                        chartPadding: 30
                    }]
                ];
                new Chartist.Pie('.location-chart', data, options, responsiveOptions);
            }
        });
    }

    /////////////////////////////////////////////////////////////////////
    /////////////////////// Sessions By Source ///////////////////////
    /////////////////////////////////////////////////////////////////////

    function getSourceReferral(handleData) {
        var dims = [];
        dims.push('ga:date');
        var jsonDims = JSON.stringify(dims);

        $.ajax({
            type: 'POST',
            url: "dashboard/site/admin/getMediumData.php",
            data: {
                date_start: '7daysAgo',
                date_end: 'today',
                metric: 'ga:sessions',
                dims: jsonDims,
                type: 'time',
                filter: 'referral'
            },
            success: function (data) {
                var mediumArray = [];
                for (i = 0; i < data.length; i++) {
                    mediumArray.push(data[i]);
                }
                handleData(mediumArray);
            },
            error: function (data) {
                console.log('getSourceReferral - ' + data.responseText);
            }
        });
    }

    function getSourceNone(handleData) {
        var dims = [];
        dims.push('ga:date');
        var jsonDims = JSON.stringify(dims);
        $.ajax({
            type: 'POST',
            url: "dashboard/site/admin/getMediumData.php",
            data: {
                date_start: '7daysAgo',
                date_end: 'today',
                metric: 'ga:sessions',
                dims: jsonDims,
                type: 'time',
                filter: '(none)'
            },
            success: function (data) {
                var mediumArray = [];
                for (i = 0; i < data.length; i++) {
                    mediumArray.push(data[i]);
                }
                handleData(mediumArray);
            },
            error: function (data) {
                console.log('getSourceNone - ' + data.responseText);
            }
        });
    }

    function getSourceOrganic(handleData) {
        var dims = [];
        dims.push('ga:date');
        var jsonDims = JSON.stringify(dims);
        $.ajax({
            type: 'POST',
            url: "dashboard/site/admin/getMediumData.php",
            data: {
                date_start: '7daysAgo',
                date_end: 'today',
                metric: 'ga:sessions',
                dims: jsonDims,
                type: 'time',
                filter: 'organic'
            },
            success: function (data) {
                var mediumArray = [];
                for (i = 0; i < data.length; i++) {
                    mediumArray.push(data[i]);
                }
                handleData(mediumArray);
            },
            error: function (data) {
                console.log('getSourceOrganic - ' + data.responseText);
            }
        });
    }

    function loadSourceChart() {
        var refArray;
        var noneArray;
        getSourceReferral(function (output) {
            refArray = output;
        });
        getSourceNone(function (output) {
            noneArray = output;
        });
        getSourceOrganic(function (output) {
            orgArray = output;
        });

        function checkVariable() {
            if (typeof refArray !== 'undefined' && typeof noneArray !== 'undefined' && typeof orgArray !== 'undefined') {
                var legendDiv = document.getElementById('sourceLegend');
                var sourceChart = new Chartist.Line('.source-chart', {
                    series: [
                        {
                            name: 'series-1',
                            data: refArray
                    }, {
                            name: 'series-2',
                            data: noneArray
                  }, {
                            name: 'series-3',
                            data: orgArray
                  }
                  ]
                }, {
                    axisX: {
                        type: Chartist.FixedScaleAxis,
                        divisor: 90,
                        labelInterpolationFnc: function (value) {
                            return moment(value).format('MMM D');
                        }
                    },
                    plugins: [
                        Chartist.plugins.legend({
                            legendNames: ['Referral', 'Direct', 'Organic'],
                            position: legendDiv
                        })
                    ],
                });
                $('.source-chart').addClass('view-chart-90');
                $('#sourceLegend').addClass('inline-legend');
                sourceChart.on('draw', function (data) {
                    if (data.type === 'line' || data.type === 'area') {
                        data.element.animate({
                            d: {
                                begin: 0 * data.index,
                                dur: 1000,
                                //                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height() + 15).stringify(),
                                to: data.path.clone().stringify(),
                                easing: Chartist.Svg.Easing.easeOutQuint
                            }
                        });
                    }
                });
            } else {
                window.setTimeout(checkVariable, 100);
            }
        }
        checkVariable();




    }



    /////////////////////////////////////////////////////////////////////
    /////////////////////// Custom Page //////////////////////////////
    /////////////////////////////////////////////////////////////////////

    //    $('.fav-update path').click(function(){
    //       var dataChartId = $(this).data('chartid');
    //        var dataFav = $(this).data('fav');
    //        alert(dataChartId);
    //        alert(dataFav);
    //    });


    //$('#customPreview').click(chartPreview);

    //function chartSave() {


    //        $('#customChartForm').submit(function(event){
    //            alert('clicked');
    //            event.preventDefault();
    //           
    //            var posting = $.post('app/dashboard/updateFavorites.php', {
    //                AccountID: 1001,
    //                Name: $('#f_CustomName').val(),
    //                Metrics: $('#f_CustomMetrics').val(),
    //                Dimensions: $('#f_CustomDimensions').val(),
    //                ChartType: $('#f_CustomType').val(),
    //                Size: 'chart-md',
    //                Favorite: $('#f_Favorite')
    //            });
    //            
    //            posting.done(function(data){
    //                alert('Chart Saved Successfully');
    //            });
    //            
    //        });





    //        $.ajax({
    //            type: 'POST',
    //            url: "app/dashboard/updateFavorites.php",
    //            data: {
    //                chartId: dataChartId,
    //                fav: dataFav
    //            },
    //            error: function (data) {
    //                console.log(data.responseText);
    //            }
    //        }); 




    // }









    function chartPreview() {
        TweenMax.to($('#preview'), 0.5, {
            width: 400
        });
        var dataType = $('select[name="CustomType"]').val();
        var dataMetrics = $('select[name="CustomMetrics"]').val();
        var dataDimensions = $('select[name="CustomDimensions"]').val();
        console.log(dataMetrics);
        console.log(dataDimensions);
        var datFav = $('select[name="Favorite"]').val();
        $('#deviceChart').getDeviceData({
            domElement: document.getElementById('preview'),
            chartType: dataType,
            chartElement: '#preview',
            dimensions: dataDimensions,
            metrics: dataMetrics,
            legend: document.getElementById('deviceLegend')
        });
    }









    //    $('#f_MetricGroup').change(function(){
    //       alert('changedddd'); 
    //    });


    //    $('#f_MetricGroup').change(function(){getMetadata('metric')});
    //    $('#f_DimensionGroup').change(function(){getMetadata('dimension')});


    function getMetadata(dType, el) {
        var gName = $(el).val();
        if (dType == 'metric') {
            var drop = $('#f_CustomMetrics');
        }
        if (dType == 'dimension') {
            var drop = $('#f_CustomDimensions');
        }
        $(drop).empty();
        $.ajax({
            type: 'POST',
            url: "dashboard/site/admin/getMetadata.php",
            data: {
                DataType: dType,
                GroupName: gName
            },
            success: function (data) {
                for (i = 0; i < data.length; i++) {
                    var metricId = data[i].ID;
                    var uiName = data[i].UiName;
                    $(drop).append('<option value="' + metricId + '">' + uiName + '</option>');
                }
            },
            error: function (data) {
                console.log(data.responseText);
            }
        });
    }









    /////////////////////////////////////////////////////////////////////
    /////////////////////// Device Page //////////////////////////////
    /////////////////////////////////////////////////////////////////////

    //    
    //    function returnData(output) {
    //        console.log(output);
    //    }
    //    
    //   (function ( $ ) {
    //        $.fn.getDeviceData = function(options) {
    //        console.log(options.dimensions);
    //        var dims = [];
    //         dims.push(options.dimensions);
    //        var jsonDims = JSON.stringify(dims);
    //        $.ajax({
    //            type: 'POST',
    //            url: "dashboard/site/admin/getMediumData.php",
    //            data: {
    //                date_start: '90daysAgo',
    //                date_end: 'today',
    //                metric: options.metrics,
    //                dims: jsonDims
    //            },
    //            success: function (data) {
    //             //   console.log(data);
    //                var dataArray = {};
    //                for (i = 0; i < data.length; i++) {
    ////                    dataArray.push('count'[data[i][0][0].values]);
    //                    dataArray[i] = {
    //                        dimension: data[i][0][1],
    //                        metric: data[i][0][0].values[0]
    //                    }
    ////                     data[i][0][0].values;
    ////                    dataArray[i]['count'] = data[i][0][0].values;
    //                }
    //                options.type(dataArray);
    //                
    //                
    //                
    //                
    //                var data = {
    //                    series: vArray
    //                };
    //                var sum = function (a, b) {
    //                    return a + b
    //                };
    //                var options = {
    //                    labelInterpolationFnc: function (value, idx) {
    //                        var percentage = Math.round(value / data.series.reduce(sum) * 100) + '%';
    //                        return lArray[idx] + ' ' + perentage + '%';
    //                    }
    //                };
    //                var responsiveOptions = [
    //                    ['screen and (min-width: 640px)', {
    //                        chartPadding: 30,
    //                        labelOffset: 80,
    //                        labelDirection: 'explode',
    //                        labelInterpolationFnc: function (value, idx) {
    //                            var percentage = Math.round(value / data.series.reduce(sum) * 100) + '%';
    //                            return lArray[idx] + ' ' + percentage;
    //                        }
    //                    }],
    //                    ['screen and (min-width: 1024px)', {
    //                        labelOffset: 80,
    //                        chartPadding: 30
    //                    }]
    //                ];
    //                new Chartist.Pie('.location-chart', data, options, responsiveOptions);
    //                
    //            },
    //            
    //            error: function (data) {
    //                console.log('getSourceOrganic - ' + data.responseText);
    //            }
    //        });
    //    }}( jQuery ));

    // console.log($('#browserChart'));





    //setTimeout(function(){
    //    console.log(document.getElementById('osLegend'));
    //}, 0)

    //    
    //    
    //    function getDeviceData(options) {
    //        console.log(options.dimensions);
    //        var dims = [];
    //         dims.push(options.dimensions);
    //        var jsonDims = JSON.stringify(dims);
    //        
    //        $.ajax({
    //            type: 'POST',
    //            url: "dashboard/site/admin/getMediumData.php",
    //            data: {
    //                date_start: '90daysAgo',
    //                date_end: 'today',
    //                metric: options.metrics,
    //                dims: jsonDims
    //            },
    //            success: function (data) {
    //             //   console.log(data);
    //                var dataArray = {};
    //                for (i = 0; i < data.length; i++) {
    ////                    dataArray.push('count'[data[i][0][0].values]);
    //                    dataArray[i] = {
    //                        dimension: data[i][0][1],
    //                        metric: data[i][0][0].values[0]
    //                    }
    //                        
    //                        
    ////                        data[i][0][0].values;
    ////                    dataArray[i]['count'] = data[i][0][0].values;
    //                    
    //                }
    //                options.type(dataArray);
    ////                console.log(dataArray);
    //                
    ////                var data = {
    ////                    series: vArray
    ////                };
    ////                var sum = function (a, b) {
    ////                    return a + b
    ////                };
    ////                var options = {
    ////                    labelInterpolationFnc: function (value, idx) {
    ////                        var percentage = Math.round(value / data.series.reduce(sum) * 100) + '%';
    ////                        return lArray[idx] + ' ' + perentage + '%';
    ////                    }
    ////                };
    ////                var responsiveOptions = [
    ////                    ['screen and (min-width: 640px)', {
    ////                        chartPadding: 30,
    ////                        labelOffset: 80,
    ////                        labelDirection: 'explode',
    ////                        labelInterpolationFnc: function (value, idx) {
    ////                            var percentage = Math.round(value / data.series.reduce(sum) * 100) + '%';
    ////                            return lArray[idx] + ' ' + percentage;
    ////                        }
    ////                    }],
    ////                    ['screen and (min-width: 1024px)', {
    ////                        labelOffset: 80,
    ////                        chartPadding: 30
    ////                    }]
    ////                ];
    ////                new Chartist.Pie('.location-chart', data, options, responsiveOptions);
    //                 
    //            },
    //            
    //            error: function (data) {
    //                console.log('getSourceOrganic - ' + data.responseText);
    //            }
    //        });
    //    }
    //    
    //    
    //    









    //    loadSourceChart();
    //    getLocationData();
    //    getPageView();



});
