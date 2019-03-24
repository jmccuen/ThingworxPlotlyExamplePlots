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
		
		let z = [];
		for (let i=0;i<10;i++) {
			if (!z[i]) {
				z[i] = [];
			}
		    for (j=0;j<10;j++) {
		        z[i].push(Math.random() * 100);
			}
		}
		let trace = new Object();
		trace.z = z;
		trace.type = 'surface';
		
		chart.draw([trace]);
		
	};
	
	this.afterLoad = function() {
		chart.afterLoad();
		
	};
	
	this.afterSetProperty = function() {
		chart.afterSetProperty();
		
	};
	
	this.beforeSetProperty = function() {
		chart.beforeSetProperty();
	};

};