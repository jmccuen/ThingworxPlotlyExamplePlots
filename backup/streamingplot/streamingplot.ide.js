TW.IDE.Widgets.streamingplot = function () {

	let chart = new TWIDEChart(this,16,'2d',4,true);
	
	this.widgetIconUrl = function() {
		return  "'../Common/extensions/PlotlyPlots/ui/timeseriesplot/plotlyicon.png'";
	};
	
	this.widgetProperties = function () {
		
		let properties = chart.getProperties();
		properties.name = "Streaming Plot";
		return properties;
		
	};

	this.renderHtml = function () {
		
		return 	'<div class="widget-content widget-streamingplot">' +
				'</div>';
	};
	
	this.afterRender = function() {
		chart.render();
		
		let data = [
			  {
			    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
			    y: [1, 3, 6],
			    type: 'scatter'
			  }
		];
		
		chart.draw(data);
		
	}
	
	

};