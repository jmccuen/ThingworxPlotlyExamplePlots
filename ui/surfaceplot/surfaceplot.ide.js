TW.IDE.Widgets.surfaceplot = function () {

let chart = new TWIDEChart(this,1,'3d',1,false);
	
	this.widgetIconUrl = function() {
		return  "'../Common/extensions/PlotlyPlots/ui/timeseriesplot/plotlyicon.png'";
	};
	
	this.widgetProperties = function () {
		
		let properties = chart.getProperties();
		properties.name = "Surface Plot";
		return properties;
		
	};

	this.renderHtml = function () {
		
		return 	'<div class="widget-content widget-surfaceplot">' +
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