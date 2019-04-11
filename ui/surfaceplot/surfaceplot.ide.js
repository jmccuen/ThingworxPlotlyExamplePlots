TW.IDE.Widgets.surfaceplot = function () {

let chart = new TWIDEChart(this,'Surface Plot', 'widget-surfaceplot', 1,'3d',1,false);
	
	this.widgetIconUrl = function() {
		return chart.widgetIconUrl();
	};
	
	this.widgetProperties = function () {
		
		let properties = chart.widgetProperties();
		return properties;
		
	};

	this.renderHtml = function () {
		return chart.renderHtml();
	};
	
	this.afterRender = function() {
		return chart.afterRender();
	};
	
	this.afterLoad = function() {
		return chart.afterLoad();	
	};
	
	this.afterSetProperty = function(name,value) {
		return chart.afterSetProperty(name,value);
		
	};
	
	this.beforeSetProperty = function(name,value) {
		return chart.beforeSetProperty(name,value);
	};

};