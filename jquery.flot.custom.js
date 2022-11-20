window.last_pie_item = null;
window.last_bar_item = null;

function pieHover(event, pos, obj) {

    var $this = $(this).find('.legend table');
    var percent;
    if (window.last_pie_item && obj != window.last_pie_item) {
        percent = parseInt(window.last_pie_item.series.percent);
        $this.find('tr').eq(window.last_pie_item.seriesIndex).find('td').eq(1).html(window.last_pie_item.series.label);
        window.last_pie_item = null;
    }
    if (obj) {
        percent = parseInt(obj.series.percent);
        $this.find('tr').eq(obj.seriesIndex).find('td').eq(1).html('<b>'+obj.series.label+' <span style="color:#5478c0">['+percent+"%]<span></b>");
        window.last_pie_item = obj;
    }
}

function pieHoverReview(event, pos, obj) {
    var $this = $(this).find('.legend table');
    var indx;
    var $_plot = $(event.target).data("plot");
    var allSeries = $_plot.getData();
    var opt = $_plot.getOptions();

    if (window.last_pie_item && obj != window.last_pie_item) {
        indx = window.last_pie_item.seriesIndex;
        $(this).find('#pieLabel' + indx).css('opacity', '');
        $this.find('tr').eq(indx).find('.rtg-r').removeClass('active');
        window.last_pie_item = null;
        allSeries[indx].color = allSeries[indx].oldColor;
    }
    if (obj) {
        indx = obj.seriesIndex;
        $this.find('tr').eq(indx).find('.rtg-r').addClass('active');
        window.last_pie_item = obj;

        allSeries[indx].oldColor = allSeries[indx].color;
        allSeries[indx].color = opt.colors[indx].replace(', 0.9)', ')').replace('rgba', 'rgb');
    }
    $_plot.draw();
}

function barHover(event, pos, obj) {


    var vunit = $(this).attr('id').replace(/graph/, 'unit');
    var unit = window[vunit] || '';

    var $this = $(this).find('.legend table');
    if (window.last_bar_item && obj != window.last_bar_item) {
        var percent = parseInt(window.last_bar_item.series.data[0][1]);
        $this.find('tr').eq(window.last_bar_item.seriesIndex).find('td').eq(1).html(window.last_bar_item.series.label);
        window.last_bar_item = null;
    }
    if (obj) {
        var percent = parseInt(obj.series.data[0][1]);
        $this.find('tr').eq(obj.seriesIndex).find('td').eq(1).html('<b>'+obj.series.label+' <span style="color:#5478c0">['+percent+unit+']</span></b>');
        window.last_bar_item = obj;
    }
}