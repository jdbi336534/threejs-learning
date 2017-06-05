$(function() {
    var startx;
    var starty;
    var endx;
    var endy;
    var line;
    var lineArry = [];
    var flag = false;
    var r = Raphael('holder', $(window).width(), $(window).height());
    var $draggable = $('.node_table').draggabilly({
        handle: '.drag_tr',
        containment: '#holder'
    });
    // var $draggable = $('.drag1').draggabilly({
    //     handle: '.drag_tr',
    //     containment: '#holder'
    // })
    $('.btn').on('click', function(e) {
        $("#holder").append('<div class="node_table" style="height:100px;width:100px;"><div class="drag_tr append" style="height:60px;"></div></div>');
        var $draggable = $('.node_table').draggabilly({
            handle: '.drag_tr',
            containment: '#holder'
        });
    });
    $('.line_out').on('mousedown', function(e) {
        console.log('mousedown');
        flag = true;
        startx = e.pageX;
        starty = e.pageY;
        var pathStr = 'M' + startx + ' ' + starty + 'L' + e.pageX + ' ' + e.pageY;
        console.log('startpath:', pathStr);
        line = r.path(pathStr).attr({
            'stroke-width': '0.8',
            'fill': 'none',
            'stroke': 'rgb(40, 33, 26)',
            'stroke-dasharray': '--',
            'opacity': '0.5',
            'stroke-linejoin': 'miter'
        });
        line.realPath = pathStr;
        // lineArry.push(line);
    });
    $('#holder').mousemove(function(e) {
        endx = e.pageX;
        endy = e.pageY;

        if (flag) {
            console.log('path:', line.getSubpath());
            console.log('line:', line);
            //"M249,86L475,109" 线条要求格式,in 的线，起点坐标不变，终点坐标改变
            // var currentpath = line.realPath;
            var startPoint = line.realPath.split('M')[1];
            //计算当前row坐标
            var startPointz = startPoint.split('L')[1].split(' ');
            // endx = endx + (endx - startPointz[0]);
            // endy = endy + (endy - startPointz[1]);
            // var reDrawPath = 'M' + startx + ' ' + starty + 'L' + endx + ' ' + endy;
            // console.log('startPointz:', startPointz);
            // line.animate({
            //     path: reDrawPath
            // }, 0);
            // line.attr({
            //     path: reDrawPath
            // });
            // line.realPath = reDrawPath;
        }
    });
    $draggable.on('dragMove', function(event, pointer, moveVector) {
        console.log(event);
        var data = event.target.getAttribute('data-which');
        if (data == 'hd1') {
            var left = $('[data-which="hd1"]').parent().parent().parent().offset().left;
            var top = $('[data-which="hd1"]').parent().parent().parent().offset().top;
            // console.log(left, top);
            var startPoint = line.realPath.split('M')[1];
            //计算当前row坐标
            var startPointz = startPoint.split('L')[1].split(' ');
            var movendx = parseInt(startPointz[0]) + (parseInt(event.pageX) - parseInt(startPointz[0]) - parseInt(event.offsetX));
            var movendy = parseInt(startPointz[1]) + (parseInt(event.pageY) - parseInt(startPointz[1]) - parseInt(event.offsetY));
            var reDrawPath = 'M' + startx + ' ' + starty + 'L' + left + ' ' + top;
            console.log('reDrawPath:', reDrawPath, 'startPointz:', startPointz);
            line.attr({
                path: reDrawPath
            });
            line.realPath = reDrawPath;
        }

    });
    $('.line_in').mouseup(function(e) {
        console.log('mouseup');
        flag = false;
        endx = e.pageX;
        endy = e.pageY;
        var reDrawPath = 'M' + startx + ' ' + starty + 'L' + endx + ' ' + endy;
        line.animate({
            path: reDrawPath
        }, 0);
    });
});
