TW.IDE.Widgets.timeseriesplot = function () {

	let chart = new TWIDEChart(this,'Timeseries Plot', 'widget-timeseriesplot', 64,'2d',4,true);
	
	this.widgetIconUrl = function() {
		return chart.widgetIconUrl();
	};
	
	this.widgetProperties = function () {
		
		let properties = chart.widgetProperties();
		properties.name = "Timeseries Plot";
		properties.properties['XAxisField']['baseTypeRestriction'] = 'DATETIME';
		properties.properties['ShowMarkers'] = {
				'description': '',
				'baseType': 'BOOLEAN',
				'defaultValue': false
			};
		properties.properties['MarkerSize'] = {
                'description': '',
                'baseType': 'INTEGER',
                'defaultValue': 6
            };
		properties.properties['MarkerShape'] = {
                'description': '',
                'baseType': 'STRING',
                'defaultValue': 'circle'
            };
		
		let options = [
			{ value: 'linear', text: 'Linear' },
			{ value: 'spline', text: 'Smooth' },
			{ value: 'hv', text: 'HV Step' },
			{ value: 'vh', text: 'VH Step' },
			{ value: 'hvh', text: 'HVH Step' },
			{ value: 'vhv', text: 'VHV Step' }
		]
		for (let i=1;i<=chart.MAX_SERIES;i++) {
			properties.properties['XDataField' + i]['baseTypeRestriction'] = 'DATETIME';
			properties.properties['SeriesMode' + i]['defaultValue'] = 'linear';
			properties.properties['SeriesMode' + i]['selectOptions'] = options;
			
		}
		return properties;
		
	};

	this.renderHtml = function () {
		return chart.renderHtml('widget-timeseriesplot', 'Timeseries Plot');
	};
	
	this.afterRender = function() {
		chart.afterRender();
	};
	
	this.afterLoad = function() {
		chart.afterLoad();
		
	};
	
	this.afterSetProperty = function(name, value) {
		chart.afterSetProperty(name, value);
	};


};