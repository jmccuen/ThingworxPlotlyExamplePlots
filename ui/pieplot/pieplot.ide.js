TW.IDE.Widgets.pieplot = function () {

	let chart = new TWIDEChart(this,0,'pie',0,false);
	
	this.widgetIconUrl = function() {
		return  "'../Common/extensions/PlotlyPlots/ui/pieplot/plotlyicon.png'";
	};

	this.widgetProperties = function () {
		let properties = chart.getProperties();
		
		properties.properties.ValuesField =  {
                'description': 'Values Field',
                'baseType': 'FIELDNAME',
                'sourcePropertyName': 'Data',
                'isBindingTarget': false,
                'isVisible': true,
                'baseTypeRestriction': 'NUMBER'
        }; 
		
		properties.properties.LabelsField =  {
                'description': 'Labels Field',
                'baseType': 'FIELDNAME',
                'sourcePropertyName': 'Data',
                'isBindingTarget': false,
                'isVisible': true
        };  
		
		properties.properties['ColorFormat'] =  {
                'description': 'Color format',
                'baseType': 'STATEFORMATTING',
                'baseTypeInfotableProperty': 'Data',
                'isVisible': true
        };
		
		properties.name = "Pie Plot";
		return properties;
	};


	this.renderHtml = function () {
		return 	'<div class="widget-content widget-pieplot">' +
				'</div>';
	};
	
	this.afterRender = function() {
		chart.render();
		
		let data = [{
			  values: [19, 26, 55],
			  labels: ['Residential', 'Non-Residential', 'Utility'],
			  type: 'pie'
			}];
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

};