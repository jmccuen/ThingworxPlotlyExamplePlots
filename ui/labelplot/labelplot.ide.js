TW.IDE.Widgets.labelplot = function () {

	this.widgetIconUrl = function() {
		return  "'../Common/extensions/PlotlyPlots/ui/labelplot/default_widget_icon.ide.png'";
	};

	this.widgetProperties = function () {
		return {
			'name': 'labelplot',
			'description': '',
			'category': ['Common'],
			'properties': {
				'labelplot Property': {
					'baseType': 'STRING',
					'defaultValue': 'labelplot Property default value',
					'isBindingTarget': true
				}
			}
		}
	};

	this.afterSetProperty = function (name, value) {
		var thisWidget = this;
		var refreshHtml = false;
		switch (name) {
			case 'Style':
			case 'labelplot Property':
				thisWidget.jqElement.find('.labelplot-property').text(value);
			case 'Alignment':
				refreshHtml = true;
				break;
			default:
				break;
		}
		return refreshHtml;
	};

	this.renderHtml = function () {
		// return any HTML you want rendered for your widget
		// If you want it to change depending on properties that the user
		// has set, you can use this.getProperty(propertyName).
		return 	'<div class="widget-content widget-labelplot">' +
					'<span class="labelplot-property">' + this.getProperty('labelplot Property') + '</span>' +
				'</div>';
	};

	this.afterRender = function () {
		// NOTE: this.jqElement is the jquery reference to your html dom element
		// 		 that was returned in renderHtml()

		// get a reference to the value element
		valueElem = this.jqElement.find('.labelplot-property');
		// update that DOM element based on the property value that the user set
		// in the mashup builder
		valueElem.text(this.getProperty('labelplot Property'));
	};

};