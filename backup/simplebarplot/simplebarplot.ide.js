TW.IDE.Widgets.simplebarplot = function () {

	let chart = new TWIDEChart(this,16,'2d',4,false);
	
	this.widgetIconUrl = function() {
		return  "'../Common/extensions/PlotlyPlots/ui/timeseriesplot/plotlyicon.png'";
	};
	
	this.widgetProperties = function () {
		
		let properties = chart.getProperties();
		properties.name = "Simple Bar Plot";
		properties.properties.BarThickness = {
	        'description': 'Bar thickness',
	        'defaultValue': 0.8,
	        'baseType': 'NUMBER',
	        'isVisible': true
		};
	
		return properties;
		
	};

	this.renderHtml = function () {
		
		return 	'<div class="widget-content widget-simplebarplot">' +
				'</div>';
	};
	
	this.afterRender = function() {
		chart.render();
		
		let data = [
			  {
			    x: ['test1', 'test2', 'test3'],
			    y: [1, 3, 6],
			    type: 'bar'
			  }
		];
		
		chart.draw(data);
		
	}
	
	

};