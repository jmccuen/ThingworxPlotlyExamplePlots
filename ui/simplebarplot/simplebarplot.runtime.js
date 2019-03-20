TW.Runtime.Widgets.simplebarplot= function () {
	let thisWidget = this;
	let properties = this.properties;
	let chart = new TWRuntimeChart(thisWidget);
	
	this.renderHtml = function () {
		return 	'<div class="widget-content widget-simplebarplot">' +
				'</div>';
	};

	this.afterRender = function () {
		chart.render();
	};

	this.updateProperty = function (updatePropertyInfo) {
		 if (updatePropertyInfo.TargetProperty === 'Data') {
			 
			 chart.chartInfo['Data'] = new Object();
	         chart.chartInfo['Data'].length = updatePropertyInfo.ActualDataRows.length;
	         
	 		const rows = updatePropertyInfo.ActualDataRows;
	        let x = [];       
	        let y = new Object();
	        
	        let values = chart.getXY(updatePropertyInfo);
	        
	        let data = [];
			for (let key in values.y) {
	        	if (properties['YDataField' + key] || dynamic) {
		         	let trace = new Object()
		         	trace.series = key;
		         	trace.dataSource = 'Data';
			        trace.x = values.x;
			        trace.y = values.y[key].values;
			        trace.type = 'bar';
			        trace.text = trace.y.map(
			        		function(value) {
			        			return String(Math.round(value));
			        		})
			        trace.textposition = 'auto';
			        trace.hoverinfo = 'none';
			        trace.width = properties['BarThickness']
			        data.push(trace);
	        	};
			 };
	         
			 chart.draw(data);
		 };
	};
	
}; 