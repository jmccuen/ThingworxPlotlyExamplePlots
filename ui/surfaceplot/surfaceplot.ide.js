TW.IDE.Widgets.surfaceplot = function () {

let chart = new TWIDEChart(this,1,'3d',1,false);
	
	this.widgetIconUrl = function() {
		return chart.widgetIconUrl();
	};
	
	this.widgetProperties = function () {
		
		let properties = chart.getProperties();
		properties.name = "Surface Plot";
		return properties;
		
	};

	this.renderHtml = function () {
		return chart.renderHtml('widget-surfaceplot', 'Surface Plot');
	};
	
	this.afterRender = function() {
		chart.afterRender();
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