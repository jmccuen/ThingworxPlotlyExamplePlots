TW.IDE.Widgets.labelplot = function () {

	let thisWidget = this;
	let chart = new TWIDEChart(this,64,'2d',4,true);
	
	this.widgetIconUrl = function() {
		return chart.widgetIconUrl();
	};
	this.widgetProperties = function () {
		
		let properties = chart.getProperties();
		properties.name = "Label Plot";
		
		properties.properties['ChartType'] = {
            'description': TW.IDE.I18NController.translate('tw.labelchart-ide.properties.chart-type.description'),
            'baseType': 'STRING',
            'defaultValue': 'bar',
            'selectOptions': [
            ]
        };
		
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
		
		let modes = [
			{ value: 'linear', text: 'Linear' },
			{ value: 'spline', text: 'Smooth' },
			{ value: 'hv', text: 'HV Step' },
			{ value: 'vh', text: 'VH Step' },
			{ value: 'hvh', text: 'HVH Step' },
			{ value: 'vhv', text: 'VHV Step' }
		];
		
		let types =  [
			{ value: 'chart', text: 'Use chart type' },
			{ value: 'line', text: 'Line' },
			{ value: 'marker', text: 'Marker' },
			{ value: 'line+marker', text: 'Line/Marker' },
			{ value: 'bar', text: 'Bar' },
			{ value: 'horizontalBar', text: 'Horizontal Bar' },
			{ value: 'area', text: 'Area' },
			{ value: 'area+marker', text: 'Area/Marker' }
		];
		
		properties.properties['ChartType']['selectOptions'] = types;
		
		for (let i=1;i<=chart.MAX_SERIES;i++) {

            let seriesType = {
                'description': '',
                'baseType': 'STRING',
                'isVisible' : false,
                'defaultValue': 'chart',
                'selectOptions': types,
                'series': i
            };
            
			properties.properties['SeriesMode' + i]['defaultValue'] = 'linear';
			properties.properties['SeriesMode' + i]['selectOptions'] = modes;
			properties.properties['SeriesType' + i] = seriesType
		}
		
		let barMode = {
                'description': '',
                'baseType': 'STRING',
                'isVisible' : false,
                'selectOptions': [
                    {'value': 'none', text: 'None'},
                    {'value': 'group', text: 'Group'},
                    {'value': 'stack', text: 'Stack'},
                ]
            };
		properties.properties['BarMode'] = barMode;
		
		return properties;
		
	};

	this.renderHtml = function () {
		return chart.renderHtml('widget-labelplot', 'Label Plot');
	};
	
	this.afterRender = function() {
		chart.afterRender();
	};
	
	this.afterLoad = function() {
		chart.afterLoad();
		let properties = thisWidget.allWidgetProperties().properties;
		let hasBar = false;
		let series = thisWidget.getProperty('NumberOfSeries');
		if (thisWidget.getProperty('ChartType') === 'bar') {
			hasBar = true;
		};
		for (let seriesNumber = 1; seriesNumber <= series; seriesNumber++) {
			if (thisWidget.getProperty('SeriesType' + series) === 'bar') {
				hasBar = true;
				break;
			}
		}
		properties['BarMode']['isVisible'] = hasBar;
		thisWidget.updatedProperties();
	};
	
	this.afterSetProperty = function(name,value) {
		chart.afterSetProperty(name,value);	
		let properties = thisWidget.allWidgetProperties().properties;
		
		if (name === 'ChartType' || name.includes('SeriesType')) {
			if (thisWidget.getProperty(name) === 'bar') {
				properties['BarMode']['isVisible'] = true;
			} else {
				
			}
		}
		thisWidget.updatedProperties();
		
	};

};