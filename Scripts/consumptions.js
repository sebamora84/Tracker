$(function(){
	$('#dateFrom').datetimepicker({
		startDate:'-1970/01/02',
		format:'Y-m-d H:i:s'
		});
	$('#dateFrom').val(moment(Date.now()).subtract(6, 'hours').format('YYYY-MM-DD HH:mm:ss'));
	$('#dateTo').datetimepicker({
		startDate:'-1970/01/02',
		format:'Y-m-d H:i:s'
		});
	$('#dateTo').val(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
	$.datetimepicker.setLocale('es');
	renderPlot();	
	$('#chartExecute').click(function(){
		renderPlot()
		});
	
	
});
var plot1;
function renderPlot(){
	var functionRenderer = function() {
		  if (plot1) {
		        plot1.destroy();
		    }
		var millisFrom = Date.parse($('#dateFrom').val());
		var millisTo = Date.parse($('#dateTo').val());
		var interval = 30 * 60 * 1000;
	    var data = [[]];
	    var y =10000;
	    for (var i=millisFrom; i<millisTo; i+=interval) {
	       
	      y-=(Math.random() * 200 + 150);
	      

	      if(y<5000 && y>4000) {
	    	  y-=500;
	      }
	      
	      if(y<0) {
	    	  y=0;
	      }
	      data[0].push([new Date(i), y ]);
	    }
	    return data;
	  };
	 
	  // we have an empty data array here, but use the "dataRenderer"
	  // option to tell the plot to get data from our renderer.
	   plot1 = $.jqplot('chartContainer',[],{
	      title: 'Consumo del navío',
	      dataRenderer: functionRenderer,
	      animate: true,
	      cursor: {
	            show: true,
	            zoom: true,
	            looseZoom: true,
	            showTooltip: false
	        },
	      axes: {
	          xaxis: {
	            label: "Fecha",
	            renderer:$.jqplot.DateAxisRenderer,
	            tickOptions:{formatString:'%H:%M'},
	          },
	          yaxis: {
	            label: "Consumo"
	          }
	        },
	        grid: {
	            gridLineWidth: 1,
	            gridLineColor: 'rgb(235,235,235)',
	            drawGridlines: true
	        },
	        highlighter: {
	            show: true, 
	            showLabel: true, 
	            tooltipAxes: 'y',
	            sizeAdjust: 7.5 , tooltipLocation : 'ne'
	        }
	  });
}
