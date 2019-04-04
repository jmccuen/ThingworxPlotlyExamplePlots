TW.IDE.Widgets.timeseriesplot = function () {

	let chart = new TWIDEChart(this,64,'2d',4,true);
	
	this.widgetIconUrl = function() {
		return  "'../Common/extensions/PlotlyPlots/ui/timeseriesplot/plotlyicon.png'";
	};
	
	this.widgetProperties = function () {
		
		let properties = chart.getProperties();
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
		
		return 	'<div class="widget-content widget-timeseriesplot">' +
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
		
	};
	
	this.afterLoad = function() {
		chart.afterLoad();
		
	};
	
	this.afterSetProperty = function(name, value) {
		chart.afterSetProperty(name, value);
		
		
	};
	
	this.beforeSetProperty = function(name, value) {
		chart.beforeSetProperty(name, value);
	};
	
	this.widgetServices = function () {
	    return chart.widgetServices();
	};
	

};