function LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
    var num = parseInt(col, 16);
    var r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    var b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    var g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}




(function ($) {
    $.fn.getDeviceData = function (options) {
        // console.log(options.dimensions.split(','));
        //var dimensionArray = [];
        //dimensionArray.push(options.dimensions);
        //var jsonDimensions = JSON.stringify(dimensionArray);
        var jsonDimensions = JSON.stringify(options.dimensions.split(','));
        // console.log(jsonDimensions);
        var el = options.domElement;
        var chartType = options.chartType;
        var dataType = options.dataType;
        var chartEl = options.chartElement;
        var legendDiv = options.legend;
        var chartFilter = options.filter;
        var sortBy = options.sortBy;
        var sortOrder = options.sortOrder;
        var chartBox = options.chartBox;
        var fName = options.filterName;
        var fVal = options.filterVal;
        var gState = options.gstate;
        var dateStart = options.dateStart;
        var dateEnd = options.dateEnd;

        $.ajax({
            type: 'POST',
            url: "dashboard/site/admin/getMediumData.php",
            data: {
                start: dateStart,
                end: dateEnd,
                metric: options.metrics,
                dims: jsonDimensions,
                filter: chartFilter,
                filterName: fName,
                filterVal: fVal,
                sort: sortBy,
                order: sortOrder,
                type: chartType
            },
            success: function (data) {
                // console.log(data);
                var valueArray = [];
                var labelArray = [];
                if (chartType == 'plot' || chartType == 'map' || chartType == 'stateMap' || chartType == 'gMap' || chartType == 'countryMap' || chartType == 'heatMap') {
                    for (i = 0; i < data.length; i++) {
                        valueArray.push(data[i][0]);
                    }
                } else {
                    for (i = 0; i < data.length; i++) {
                        labelArray.push(data[i][0][1]);
                        valueArray.push(parseInt(data[i][0][0].values[0]));
                    }
                }
                createChart(chartType, labelArray, valueArray, legendDiv, chartEl, el, dataType, chartBox, gState, fVal);
            },
            error: function (data) {
                // console.log(data);
                console.log(data.responseText);
            }
        });
    }
}(jQuery));

var chartColors = ['#506FA5', '#A54948', '#85A750', '#73558D', '#4F95AD', '#D58644', '#96A5CE', '#CC9291', '#B7CE95', '#A997BC'];

function createChart(chartType, labelArray, valueArray, legendDiv, chartEl, el, dataType, chartBox, gState, fVal) {
    // console.log(gState);
    var chtOptions = {
        chartType: chartType,
        labelArray: labelArray,
        valueArray: valueArray,
        legendDiv: legendDiv,
        chartEl: chartEl,
        el: el,
        dataType: dataType,
        chartBox: chartBox
    };


    function pieDraw() {
        setTimeout(function () {
            $(legendDiv).empty();
            $('#detailTable table tbody').empty();
            var paths = $(chartEl).children('svg').children('.ct-series').find('path');
            var pathsLength = paths.length;
            var labels = $(chartEl).children('svg').children('g').find('.ct-label');
            var dataTotal = 0;
            $(paths).each(function () {
                var ctVal = parseInt($(this).attr('ct:value'));
                dataTotal = dataTotal + ctVal;
            });
            var other = 0;
            var elName = $(el).attr('id');
            for (i = 0; i < pathsLength; i++) {
                var path = paths[i];
                var label = labels[i].textContent;
                var ctVal = parseInt(path.getAttribute('ct:value'));
                var percent = (ctVal / dataTotal * 100).toFixed(2);
                var color = chartColors[i];
                path.setAttribute('data-value', percent);
                path.setAttribute('data-label', label);
                if (i < 10) {
                    path.style.fill = color;
                    if (percent <= 3) {
                        path.style.stroke = 'none';
                    }
                    $(legendDiv).append('<div><span class="legend-color" style="background:' + color + ';"></span><span class="legend-label">' + label + '</span></div>');
                } else {
                    path.style.fill = '#ccccb7';
                    path.style.strokeWidth = 0;
                    path.style.stroke = 'none';
                    if (other == 0) {
                        $(legendDiv).append('<div><span class="legend-color other" style="background:#ccccb7;"></span><span class="legend-label">Other</span></div>');
                        other = 1;
                    }
                }
                if (elName == 'detailChart') {
                    $('#detailTable table tbody').append('<tr><td class="table-label">' + label + '</td><td>' + ctVal + '</td><td>' + percent + '%</td></tr>');
                }



                if (chartType == 'donut') {
                    // $(path).off('click', chartClick);
                    $(path).off('mouseenter', donutHover);
                    $(path).off('mouseleave', donutHoverOff);
                    // $(path).on('click', chartClick);
                    $(path).on('mouseenter', donutHover);
                    $(path).on('mouseleave', donutHoverOff);
                } else {
                    // $(path).off('click', chartClick);
                    $(path).off('mouseenter', pieHover);
                    $(path).off('mouseleave', pieHoverOff);
                    // $(path).on('click', chartClick);
                    $(path).on('mouseenter', pieHover);
                    $(path).on('mouseleave', pieHoverOff);
                }
            }
        }, 1);
    }




    function barDraw() {
        setTimeout(function () {
            $(legendDiv).empty();
            var lines = $(chartEl).find('.ct-bar');
            var linesLength = lines.length;
            var labels = $(chartEl).find('.ct-label.ct-horizontal');
            var gridFirst = $(el).find('.ct-grid').first();
            var gridLast = $(el).find('.ct-grid').last();
            var gridH = $(gridFirst).attr('y2') - $(gridFirst).attr('y1');
            var gridW = $(gridLast).attr('x2') - $(gridLast).attr('x1');
            var barW = gridW / linesLength * .5;
            var elName = $(el).attr('id');
            var dataTotal = 0;
            $(lines).each(function () {
                var ctVal = parseInt($(this).attr('ct:value'));
                //console.log(ctVal);
                dataTotal = dataTotal + ctVal;
            });
            for (i = 0; i < linesLength; i++) {
                var line = lines[i];
                var label = labels[i].textContent;
                var color = chartColors[i];
                var ctVal = line.getAttribute('ct:value');
                var percent = (ctVal / dataTotal * 100).toFixed(2);
                line.setAttribute('data-value', ctVal);
                line.setAttribute('data-label', label);
                line.style.strokeWidth = barW + 'px';
                if (i < 10) {
                    line.style.stroke = color;
                    $(legendDiv).append('<div><span class="legend-color" style="background:' + color + ';"></span><span class="legend-label">' + label + '</span></div>');
                } else {
                    var color1 = chartColors[i - 10];
                    var newColor = LightenDarkenColor(color1, 50);
                    $(legendDiv).append('<div><span class="legend-color" style="background:' + newColor + ';"></span><span class="legend-label">' + label + '</span></div>');
                }
                $(line).off('mouseenter', pieHover);
                $(line).off('mouseleave', pieHoverOff);
                $(line).on('mouseenter', pieHover);
                $(line).on('mouseleave', pieHoverOff);

                if (elName == 'detailChart') {
                    $('#detailTable table tbody').append('<tr><td class="table-label">' + label + '</td><td>' + ctVal + '</td><td>' + percent + '%</td></tr>');
                }

            }

            //            for (i = 0; i < pathsLength; i++) {
            //                var path = paths[i];
            //                var label = labels[i].textContent;
            //                var color = chartColors[i];
            //                
            ////                var ctVal = parseInt(path.getAttribute('ct:value'));
            ////                var percent = (ctVal / dataTotal * 100).toFixed(2);
            //                
            ////                path.setAttribute('data-percent', percent);
            ////                path.setAttribute('data-label', label);
            //                
            //                
            //                
            //                if (i < 10) {
            //                    path.style.fill = color;
            //                    if (percent <= 3) {
            //                        path.style.stroke = 'none';
            //                    }
            //                    $(legendDiv).append('<div><span class="legend-color" style="background:' + color + ';"></span><span class="legend-label">' + label + '</span></div>');
            //                } else {
            //                    path.style.fill = '#ccccb7';
            //                    path.style.strokeWidth = 0;
            //                    path.style.stroke = 'none';
            //                    if (other == 0) {
            //                        $(legendDiv).append('<div><span class="legend-color other" style="background:#ccccb7;"></span><span class="legend-label">Other</span></div>');
            //                        other = 1;
            //                    }
            //                } 
            //            }


        }, 1);
    }



    if (chartType == 'gauge') {
        
       // console.log(valueArray);
        
        
        const dayTotal = (valueArray.length - 1) / 2;
        
        
       // console.log(30 % 60);
        
        let compareTotal = 0;
        let compareLast = 0;
        let comparePrev = 0;
        for (i=0;i<valueArray.length;i++) {
            if (i <= dayTotal && i != 0) {
                comparePrev = comparePrev + valueArray[i];
                compareTotal = compareTotal + valueArray[i];
            } 
            else if (i > dayTotal) {
                compareLast = compareLast + valueArray[i];
                compareTotal = compareTotal + valueArray[i];
            }
        }
        
//        console.log(compareTotal);
//        console.log(comparePrev);
//        console.log(compareLast);
        
        
//        comparePrev = 400;
//        compareLast = 300;
//        compareTotal = 700;
        
        
        
       if (compareLast >= comparePrev) {
           var increase = compareLast - comparePrev;
           var percentChange = (increase/comparePrev * 100).toFixed(1);
       } else {
           var decrease = comparePrev - compareLast;
           var percentChange = (decrease/compareLast * 100).toFixed(1);
       }
      // console.log(percentChange);
        if (increase) {
            var gaugeVal1 = 100 + parseInt(percentChange);
        } else {
            var gaugeVal1 = 100 - parseInt(percentChange);
        }
        var gaugeVal2 = 200 - gaugeVal1;
        

        
//        var data = {
//            series: [gaugeVal1, gaugeVal2]
//        };
//        var options = {
//            donut: true,
//            donutSolid: true,
//            donutWidth: 40,
//            startAngle:270,
//            total:400,
//            showLabel:false
//        };
        
        
        var data = {
//            series: [compareLast, comparePrev]
            series: [compareLast, comparePrev]
        };
        var options = {
            donut: true,
            donutSolid: true,
            donutWidth: 20,
           // startAngle:270,
            startAngle:225,
         //   endAngle: 135,
            total:compareTotal * 1.5,
            showLabel:false
        };
        
        
        
        var newChart = new Chartist.Pie(chartEl, data, options);
        
        newChart.on('created', function(){
            var paths = $(chartEl).children('svg').children('.ct-series').find('path');
            
            if (increase) {
                for (i=0;i<paths.length;i++) {
                    paths[i].style.fill = i == 0 ? '#33cc33' : '#CFD1BE';
                }
            } else {
                for (i=0;i<paths.length;i++) {
                    paths[i].style.fill = i == 0 ? '#ff0000' : '#CFD1BE';
                }
            }
        });
        
        $(chartEl).on('click', function () {
            chartDetails(chtOptions)
        });
     //   $(chartBox).find('.chart-type svg').click(changeChart);
        
//        var chartIcon = $(chartBox).find('.chart-type svg');
//        $(document).off('click', chartIcon, changeChart);
//        $(document).on('click', chartIcon, changeChart);
        
//        $(chartBox).find('.chart-type svg').off('click', changeChart);
//        $(chartBox).find('.chart-type svg').on('click', changeChart);
        
        
        
        

        $(chartBox).find('.chart-type svg').each(function () {
            if ($(this).attr('data-type') == 'pie') {
                $(this).addClass('active');
            }
        });

    }









    if (chartType == 'pie' || chartType == 'donut') {
        $(legendDiv).show();
        var data = {
            labels: labelArray,
            series: valueArray
        };
        var sums = function (a, b) {
            return a + b
        };
        if (chartType == 'donut') {
            var options = {
                labelInterpolationFnc: function (value) {
                    return value;
                },
                donut: true,
                donutSolid: true,
                donutWidth: 40
            };
        } else {
            var options = {
                labelInterpolationFnc: function (value) {
                    return value;
                }
            };
        }
        var newChart = new Chartist.Pie(chartEl, data, options);
        newChart.on('created', pieDraw);
        //        $(chartBox).find('.chart-type svg').click(function(){
        //            $(chartBox).find('.chart-type svg.active').removeClass('active');
        //            createChart('line', labelArray, valueArray, legendDiv, chartEl, el, dataType, chartBox);
        //        });
        //    createChart(opt.chartType, opt.labelArray, opt.valueArray, document.getElementById('detailLegend'), '#detailChart', document.getElementById('detailChart'), opt.dataType);
        //  console.log($(chartEl));
        $(chartEl).on('click', function () {
            chartDetails(chtOptions)
        });
      //  $(chartBox).find('.chart-type svg').click(changeChart);

//        $(chartBox).find('.chart-type svg').off('click', changeChart);
//        $(chartBox).find('.chart-type svg').on('click', changeChart);
        
        
        $(chartBox).find('.chart-type svg').each(function () {
            if ($(this).attr('data-type') == 'pie') {
                $(this).addClass('active');
            }
        });

    }






    if (chartType == 'gMap' || chartType == 'stateMap' || chartType == 'countryMap' || chartType == 'heatMap') {
        //console.log(gState);
        //console.log(chartType);
        console.log('triggered')
        //myMap(el, valueArray, chartType, fVal, gState);

        heatMap(el, valueArray, chartType, fVal, gState);



    }









    if (chartType == 'stateMap' || chartType == 'countryMap' || chartType == 'gMap') {

        // console.log(valueArray)

        if (chartType == 'countryMap') {
            console.log(valueArray);
        }


        var i = valueArray.length
        while (i--) {
            if (valueArray[i]['x'] == 0 || valueArray[i]['y'] == 0 || valueArray[i]['y'] > 51) {
                valueArray.splice(i, 1);
            }
        }
        //        valueArray.push({
        //            x: '-73.727677',
        //            y: '42.050535'
        //        });
        //        valueArray.push({
        //            x: '-71.787001',
        //            y: '42.050535'
        //        });

        var coordArray = [];

        for (i = 0; i < valueArray.length; i++) {
            coordArray.push({
                x: valueArray[i]['dimensions'][0],
                y: valueArray[i]['dimensions'][1]
            });
        }



        coordArray.push({
            x: '-73.727677',
            y: '42.050535'
        });
        coordArray.push({
            x: '-71.787001',
            y: '42.050535'
        });

        // console.log(coordArray);

        var newChart = new Chartist.Line(chartEl, {
            series: [coordArray]
        }, {
            showLine: false,
            high: 42.050535,
            low: 40.986961,
            ticks: [25, 30, 35, 40, 45, 50, 55, 60],
            width: '530px',
            // height:'330px',
            axisX: {
                type: Chartist.AutoScaleAxis
            },
            axisY: {
                ticks: [25, 30, 35, 40, 45, 50, 55, 60]
            }
        });
        newChart.on('draw', function (ctx) {
            if (ctx.type === 'point') {
                var foreignObject = new Chartist.Svg('foreignObject', {
                    x: ctx.x,
                    y: ctx.y,
                    class: 'ct-point-heatmap'
                });
                ctx.element.replace(foreignObject);
            }
        });
        newChart.on('created', function (ctx) {
            var gridFirst = $(el).find('.ct-grid.ct-horizontal').first();
            var gridLast = $(el).find('.ct-grid.ct-horizontal').last();
            var gridH = $(gridFirst).attr('y2') - $(gridFirst).attr('y1');
            //            var gridW = $(gridLast).attr('x2') - $(gridLast).attr('x1');
            var gridW = $('.ct-grid.ct-vertical').attr('x2') - $('.ct-grid.ct-vertical').attr('x1');
            var gridL = $(el).find('.ct-grids').offset().left;
            var svgL = $(el).find('svg').offset().left;

            var gridT = $(el).find('.ct-grids').offset().top;
            var svgT = $(el).find('svg').offset().top;

            //   console.log($(el).parent().children('.map-overlay'));
            //   console.log(svgL + ' ' + gridL);
            var marginL = gridL - svgL;
            var marginT = gridT - svgT;
            $(el).parent().children('.map-overlay').css({
                'width': gridW + 'px',
                'margin-left': marginL + 'px',
                'margin-top': marginT + 'px'
            });

            $(el).css({
                //                'background-size': gridW - 25 + 'px ' + gridH + 'px',
                //                'background-position-x': gridL - svgL + 'px',
                //     'width':'530px'
            })
        });





    }









    if (chartType == 'map') {
        var paths = $('.map svg path');
        var dataTotal = 0;
        for (i = 0; i < valueArray.length; i++) {
            dataTotal = dataTotal + parseInt(valueArray[i]['metrics'][0]['values']);
        }
        for (i = 0; i < valueArray.length; i++) {
            var name = valueArray[i]['dimensions'][0];
            var abbr = valueArray[i]['dimensions'][1];
            var metricVal = valueArray[i]['metrics'][0]['values'];
            var percent = (metricVal / dataTotal * 100).toFixed(2);
            for (j = 0; j < paths.length; j++) {
                if (paths[j]['id'] == abbr) {
                    paths[j].setAttribute('data-name', name);
                    paths[j].setAttribute('data-metricval', metricVal);
                    paths[j].setAttribute('data-metricpercent', percent);
                    if (percent <= 1) {
                        paths[j].style.fill = '#FAE8E9';
                        paths[j].setAttribute('data-pathfill', '#FAE8E9');
                    }
                    if (percent > 1 && percent < 25) {
                        paths[j].style.fill = '#e38286';
                        paths[j].setAttribute('data-pathfill', '#e38286');
                    }
                    if (percent >= 25 && percent < 50) {
                        paths[j].style.fill = '#da585e';
                        paths[j].setAttribute('data-pathfill', '#da585e');
                    }
                    if (percent >= 50) {
                        paths[j].style.fill = '#d12e36';
                        paths[j].setAttribute('data-pathfill', '#d12e36');
                    }
                }
            }
        }
        $('.map').find('path').on('click', function () {
            // console.log($(this));
            var gStateName = $(this).attr('id');
            // chtOptions.push({state: stateName});
            console.log(gStateName);
            chtOptions.gstate = gStateName;
            chartDetails(chtOptions);
        })



    }


    if (chartType == 'plot') {




        var i = valueArray.length
        while (i--) {
            if (valueArray[i]['x'] == 0 || valueArray[i]['y'] == 0 || valueArray[i]['y'] > 51) {
                valueArray.splice(i, 1);
            }
        }
        valueArray.push({
            x: '-124.7844079',
            y: '49'
        });
        valueArray.push({
            x: '-66.9513812',
            y: '49'
        });
        var newChart = new Chartist.Line(chartEl, {
            series: [valueArray]
        }, {
            showLine: false,
            high: 49.3457868,
            low: 24.7433195,
            ticks: [25, 30, 35, 40, 45, 50, 55, 60],
            axisX: {
                type: Chartist.AutoScaleAxis
            },
            axisY: {
                ticks: [25, 30, 35, 40, 45, 50, 55, 60]
            }
        });
        newChart.on('draw', function (ctx) {
            if (ctx.type === 'point') {
                var foreignObject = new Chartist.Svg('foreignObject', {
                    x: ctx.x,
                    y: ctx.y,
                    class: 'ct-point-heatmap'
                });
                ctx.element.replace(foreignObject);
            }
        });
        newChart.on('created', function (ctx) {
            var gridFirst = $(el).find('.ct-grid').first();
            var gridLast = $(el).find('.ct-grid').last();
            var gridH = $(gridFirst).attr('y2') - $(gridFirst).attr('y1');
            var gridW = $(gridLast).attr('x2') - $(gridLast).attr('x1');
            var gridL = $(el).find('.ct-grids').offset().left;
            var svgL = $(el).find('svg').offset().left;
            $('.location-us').css({
                'background-size': gridW - 25 + 'px ' + gridH + 'px',
                'background-position-x': gridL - svgL + 'px'
            })
        });
        
//        $(chartBox).find('.chart-type svg').off('click', changeChart);
//        $(chartBox).find('.chart-type svg').on('click', changeChart);
        
        
     //   $(chartBox).find('.chart-type svg').click(changeChart);





    }









    if (chartType == 'bar') {
        var barChart = new Chartist.Bar(chartEl, {
            labels: labelArray,
            series: [valueArray]
        }, {
            axisX: {
                offset: 0
            }
        });
        //        newChart.on('draw', function (context) {
        //            var max = 100;
        //            if (context.type === 'bar') {
        //                context.element.attr({
        //                    style: 'stroke: hsl(' + Math.floor(Chartist.getMultiValue(context.value) / max * 100) + ', 50%, 50%);'
        //                });
        //            }
        //        });
        barChart.on('created', barDraw);
        // console.log($(chartBox).find('.chart-type svg'));

        //        $(chartBox).find('.chart-type svg').each(function(){
        //           if ($(this).hasClass('bar-type')) {
        //               $(this).addClass('active');
        //           } 
        //        });


//        $(chartBox).find('.chart-type svg').off('click', changeChart);
//        $(chartBox).find('.chart-type svg').on('click', changeChart);

       // $(chartBox).find('.chart-type svg').click(changeChart);
        $(chartBox).find('.chart-type svg').each(function () {
            if ($(this).attr('data-type') == 'bar') {
                $(this).addClass('active');
            }
        });

        $(chartEl).on('click', function () {
            chartDetails(chtOptions)
        });
        //        $(window).resize(function () {
        //            newChart.detach();
        //            newChart.update();
        //        });
    }



    if (chartType == 'line') {
        $(legendDiv).hide();

        $(chartBox).find('.card-body').removeClass('card-grid-legend').addClass('card-grid');

        var data = {
            labels: labelArray,
            series: [valueArray]
        };
        if (dataType == 'time') {
            var options = {
                low: 0,
                showArea: true,
                fullWidth: true,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return moment(value).format('MMM D');
                    }
                }
            }
        } else {
            var options = {
                low: 0,
                showArea: true,
                chartPadding: {
                    bottom: 40
                },
                axisX: {
                    labelOffset: {
                        y: 30
                    }
                }
            }
        }
        var newChart = new Chartist.Line(chartEl, data, options);
        
        newChart.on('created', function (ctx) {
            if (dataType != 'time') {
                var xLabel = $(chartEl).find('.ct-label.ct-horizontal');
                var colW = $(chartEl).find('.ct-grid.ct-horizontal:nth-child(2)').attr('x1') - $(chartEl).find('.ct-grid.ct-horizontal').first().attr('x1');
               // console.log(colW);
                if (colW < 80) {
                    TweenMax.set(xLabel, {
                        rotation: 45,
                        width: 80,
                        height: 12,
                        overflow: 'hidden'
                    });
                } else {
                    // TweenMax.set(xLabel, {width:80, height:12, overflow:'hidden'});
                } 
            }
        })



        if (dataType == 'time') {
            newChart.on('created', function () {
                var gridW = $(chartEl).find('.ct-grid.ct-vertical').first().attr('x2') - $(chartEl).find('.ct-grid.ct-vertical').first().attr('x1') - 10;
                var hLabels = $(chartEl).find('.ct-label.ct-horizontal');
                var hLabelsLen = hLabels.length;
                var step = 0;
                if (hLabelsLen > 14) {
                    var labelW = gridW / (hLabelsLen / 7);
                    for (i = 0; i < hLabelsLen; i++) {
                        if (i != step) {
                            hLabels[i].style.display = 'none';
                        } else {
                            hLabels[i].style.width = labelW + 'px';
                            step = step + 7;
                        }
                    }
                }
            });
        }
        
        
        
    //    $(chartBox).on('click', )
        
    //   var chartIcon = $(chartBox).find('.chart-type svg');
//        $(document).off('click', $(chartBox).find('.chart-type svg'), changeChart);
//        $(document).on('click', chartIcon, changeChart);
        
//        $(chartBox).find('.chart-type svg').off('click', changeChart);
//        $(chartBox).find('.chart-type svg').on('click', changeChart);
        
        
       //     $(chartBox).find('.chart-type svg').click(changeChart);
            $(chartBox).find('.chart-type svg').each(function () {
                if ($(this).attr('data-type') == 'line') {
                    $(this).addClass('active');
                }
            });
        
            
            
        
        
        
    }
    $(legendDiv).addClass('inline-legend');
    
    
//    setTimeout(function(){
//        console.log($(chartBox).find('.chart-type'));
////       $(chartBox).find('.chart-type svg').off('click', changeChart);
////        $(chartBox).find('.chart-type svg').on('click', changeChart);
//    }, 1000)
    

    
    
    
    
    
    
    
    
    
    
    
}



function changeChart() {
    
    
    
        alert('clicked');
     //   $(chartBox).find('.chart-type svg.active').removeClass('active');
        var type = $(this).attr('data-type');
        createChart(type, labelArray, valueArray, legendDiv, chartEl, el, dataType, chartBox);
    }





function heatMap(mapEl, valueArray, chartType, fVal, gState) {


    map = new google.maps.Map(document.getElementById('heatMap'), {
        zoom: 5,
        mapTypeId: 'satellite',
        styles: [
            {
                featureType: 'road',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'landscape',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'poi',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'administrative.neighborhood',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'administrative.locality',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'water',
                stylers: [{
                    color: '#f5f5f5'
                }]
            }
        ]
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getHeatData(valueArray),
        map: map,

        //maxIntensity: 30,
        radius: 20
    });


    google.maps.event.addListener(map, 'zoom_changed', function () {
        // heatmap.setOptions({radius:getNewRadius()});
        //   console.log('triggered');
        var zoomLevel = map.getZoom();
        var m = heatmap.get('maxIntensity');
        console.log(zoomLevel);
        //  console.log(m);
        if (m > 2) {
            heatmap.setOptions({
                maxIntensity: m * 0.8
            });
        }



    });



    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': 'Connecticut'
    }, function (results, status) {
        var ne = results[0].geometry.viewport.getNorthEast();
        var sw = results[0].geometry.viewport.getSouthWest();
        map.fitBounds(results[0].geometry.viewport);
    });
}







//function getNewRadius() {
//
//
//    var numTiles = 1 << map.getZoom();
//    var center = map.getCenter();
//    var moved = google.maps.geometry.spherical.computeOffset(center, 10000, 90); /*1000 meters to the right*/
//    var projection = new MercatorProjection();
//    var initCoord = projection.fromLatLngToPoint(center);
//    var endCoord = projection.fromLatLngToPoint(moved);
//    var initPoint = new google.maps.Point(
//        initCoord.x * numTiles,
//        initCoord.y * numTiles);
//    var endPoint = new google.maps.Point(
//        endCoord.x * numTiles,
//        endCoord.y * numTiles);
//    var pixelsPerMeter = (Math.abs(initPoint.x - endPoint.x)) / 10000.0;
//    var totalPixelSize = Math.floor(desiredRadiusPerPointInMeters * pixelsPerMeter);
//    console.log(totalPixelSize);
//    return totalPixelSize;
//
//}









function getHeatData(valueArray) {
    console.log(valueArray);
    var heatArray = [];
    for (i = 0; i < valueArray.length; i++) {
        var lat = Number(valueArray[i]['dimensions'][1]);
        var lng = Number(valueArray[i]['dimensions'][0]);
        var w = Number(valueArray[i]['metrics'][0]['values'][0]);
        //heatArray.push(new google.maps.LatLng(lat, lng));
        heatArray.push({
            location: new google.maps.LatLng(lat, lng),
            weight: w
        });
    }
    //console.log(heatArray);
    return heatArray;
}

function changeGradient() {
    var gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 30);
}

function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 1);
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}



function myMap(mapEl, valueArray, chartType, fVal, gState) {
    //    console.log(valueArray);
    //    console.log(gState);
    var mapProp = {
        // center: new google.maps.LatLng(41.6032, -73.0877),
        zoom: 5,
        styles: [
            {
                featureType: 'road',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'landscape',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'poi',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'administrative.neighborhood',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'administrative.locality',
                stylers: [{
                    visibility: 'off'
                }]
            },
            {
                featureType: 'water',
                stylers: [{
                    color: '#f5f5f5'
                }]
            }
        ]
    };





    var map = new google.maps.Map(mapEl, mapProp);







    //    var layer = new google.maps.FusionTablesLayer({
    //    query: {
    //      select: 'geometry',
    //        from: '1CIj9EIjamblhPXMog7O9LdQOqdw26sLEdKVcB-_J',
    //        where: 'Name = \'General Electric Company\'',
    //        orderBy: 'geometry',
    //        limit: 1
    //       // where: 'Name = \'Cigna Corporation\'',
    //      //  limit: 1
    //    }
    ////        ,
    ////        styles: [{
    //////            where: 'NAME_TXT NOT EQUAL TO \'Connecticut\'',
    ////            where: 'state NOT EQUAL TO \'Connecticut\'',
    ////            polygonOptions: {
    ////               // visible: false
    ////              fillColor: '#f5f5f5',
    ////              fillOpacity: 1,
    ////                strokeColor: '#f5f5f5'
    ////            }
    ////        }]
    // 
    //  });
    //  layer.setMap(map);









    var geocoder = new google.maps.Geocoder();

    if (chartType == 'countryMap') {
        geocoder.geocode({
            'address': 'US'
        }, function (results, status) {
            var ne = results[0].geometry.viewport.getNorthEast();
            var sw = results[0].geometry.viewport.getSouthWest();
            map.fitBounds(results[0].geometry.viewport);
        });


    }
    if (chartType == 'stateMap') {

        geocoder.geocode({
            'address': gState
        }, function (results, status) {
            var ne = results[0].geometry.viewport.getNorthEast();
            var sw = results[0].geometry.viewport.getSouthWest();
            map.fitBounds(results[0].geometry.viewport);
        });


    }







    var cityMap = [];




    for (i = 0; i < valueArray.length; i++) {

        var lt = Number(valueArray[i]['dimensions'][1]);
        var lg = Number(valueArray[i]['dimensions'][0]);
        var cityName = valueArray[i]['dimensions'][2];
        var hitCount = valueArray[i]['metrics'][0]['values'][0];


        cityMap.push({
            'name': cityName,
            center: {
                lat: lt,
                lng: lg
            },
            hits: hitCount
        })




        //   console.log(valueArray[i]['dimensions'][0]); 
        // console.log('triggered');
        //        var latt = parseInt(valueArray[i]['dimensions'][1]);
        //        var lngg = parseInt(valueArray[i]['dimensions'][0]);

        //        var marker = new google.maps.Marker({
        //            position: {
        //                lat: latt,
        //                lng: lngg
        //            },
        //            map: map,
        //            title: valueArray[i]['dimensions'][2]
        //        });

    }


    //    for (var city in cityMap) {
    //        console.log(cityMap[city].center);
    //          // Add the circle for this city to the map.
    //          var cityCircle = new google.maps.Circle({
    //            strokeColor: '#FF0000',
    //            strokeOpacity: 0.8,
    //            strokeWeight: 2,
    //            fillColor: '#FF0000',
    //            fillOpacity: 0.35,
    //            map: map,
    //            center: cityMap[city].center,
    //            radius: Math.sqrt(cityMap[city].hits) * 100
    //          });
    //        }



    for (i = 0; i < cityMap.length; i++) {
        //console.log(cityMap[i]['center']);
        // Add the circle for this city to the map.
        //console.log(Math.sqrt(cityMap[i].hits) * 200);

        if ((Math.sqrt(cityMap[i].hits) * 200) < 1000) {
            var circleRadius = 1000;
        } else {
            var circleRadius = Math.sqrt(cityMap[i].hits) * 200;
        }

        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: cityMap[i].center,
            //radius: Math.sqrt(cityMap[i].hits) * 500,
            radius: circleRadius,
            title: cityMap[i].name + ' ' + cityMap[i].hits
        });

        google.maps.event.addListener(cityCircle, 'mouseover', function () {
            // console.log(this.getMap().getDiv())
            this.getMap().getDiv().setAttribute('title', this.get('title'));
            console.log($(this).attr('title'));
        });

    }



    //  console.log(map.getMap().getDiv())
    //    google.maps.event.addListener(cityCircle, 'mouseover', function () {
    //        console.log(this.getMap().getDiv())
    //        this.getMap().getDiv().setAttribute('title', this.get('title'));
    //        console.log($(this).attr('title'));
    //    });

    //  console.log(cityMap);

}


function setMarkers(map, valueArray) {

    for (i = 0; i < valueArray.length; i++) {
        //   console.log(valueArray[i]['dimensions'][0]); 
        console.log('triggered');
        var latt = parseInt(valueArray[i]['dimensions'][1]).toFixed(4);
        var lngg = parseInt(valueArray[i]['dimensions'][0]).toFixed(4);
        var marker = new google.maps.Marker({

            position: {
                lat: latt,
                lng: lngg
            },
            map: map,
            title: valueArray[i]['dimensions'][2]


        })




    }






}








var detailsOpened = 0;

function chartDetails(opt) {
    console.log(opt.gstate);
    console.log($(opt.el).attr('id'));
    var chartId = $(opt.el).attr('id');
    var name = $(opt.el).parents('.card-wrapper').children('h4').text();

    var details = $('#detailView');

    if (detailsOpened == 0) {
        TweenMax.to(details, 0.5, {
            x: -600
        });


        if (chartId == 'mapChart') {
            $('#detailLegend').hide();

            $().getDeviceData({
                domElement: document.getElementById('stateMap'),
                chartType: 'stateMap',
                chartElement: '#stateMap',
                dimensions: 'ga:longitude,ga:latitude,ga:city',
                metrics: 'ga:sessions',
                //legend: document.getElementById("'.$chartID.'legend")
                //legend: document.getElementById('heatLegend'),
                filter: 'yes',
                filterName: 'ga:region',
                filterVal: opt.state,
                gstate: opt.gstate
            });



        } else {
            $('#detailTitle').append('<h4>' + name + '</h4>');
            createChart(opt.chartType, opt.labelArray, opt.valueArray, document.getElementById('detailLegend'), '#detailChart', document.getElementById('detailChart'), opt.dataType);
        }





        //        for (i = 0; i < opt.labelArray.length; i++) {
        //            $('#detailTable table').append('<tr><td class="table-label">' + opt.labelArray[i] + '</td><td>' + opt.valueArray[i] + '</td></tr>')
        //        }

        detailsOpened = 1;
    } else {

        setTimeout(function () {
            $('#detailTitle').empty();
            $('#detailLegend').empty();
            $('#detailChart').empty();
            $('#detailTable table tbody').empty();
        }, 500);




        TweenMax.to(details, 0.5, {
            x: 0
        });
        detailsOpened = 0;
    }

}






function donutHover() {
    var label = $(this).attr('data-label');
    var percent = $(this).attr('data-value');
    TweenMax.to(this, 0.3, {
        opacity: 0.8
    });
    $(this).parents('.chart-container').append('<div id="donutHover"><span class="donut-label">' + label + '</span><span class="donut-value"> ' + percent + '<sup>%</sup></span></div>')
}

function donutHoverOff() {
    TweenMax.to(this, 0.3, {
        opacity: 1
    });
    $('#donutHover').remove();
}

function pieHover() {
    var label = $(this).attr('data-label');
    var chtVal = $(this).attr('data-value');
    TweenMax.to(this, 0.3, {
        opacity: 0.8
    });
    if (this.nodeName == 'line') {
        $('#dashboard-area').prepend('<div id="pieHover">' + label + ' ' + chtVal + '</div>');
    } else {
        $('#dashboard-area').prepend('<div id="pieHover">' + label + ' ' + chtVal + '%</div>');
    }
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

function pieHoverOff() {
    TweenMax.to(this, 0.3, {
        opacity: 1
    });
    $('#pieHover').remove();
}
