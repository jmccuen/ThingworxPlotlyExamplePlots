TW.Runtime.Widgets.timeseriesplot= function () {
	
	
	let properties = this.properties;
	let thisWidget = this;
	let chart = new TWRuntimeChart(thisWidget);
	
	this.renderHtml = function () {
		return 	'<div class="widget-content widget-timeseriesplot">' +
				'</div>';
	};

	this.afterRender = function () {
		chart.render();
	};
	

	this.updateProperty = function (updatePropertyInfo) {
		
		chart.update(updatePropertyInfo);
		
		if (updatePropertyInfo.TargetProperty === 'Data') {
			 let data = getData(updatePropertyInfo,false);
			 chart.draw(data);
	     };
		 
		 for (let i=1;i <= Number(properties['NumberOfSeries']);i++) {
        	if (updatePropertyInfo.TargetProperty === 'DataSource'+i) {
        		if (updatePropertyInfo.ActualDataRows.length > 0) {
	        		let data = getData(updatePropertyInfo, true);
	        		chart.draw(data);
        		};
        	};
		 }; 
	};
    
	function getData(it,multi) {
		let dynamic = true;
		 for (let i = 1; i<= properties['NumberOfSeries'];i++) {
			 if (properties['YDataField' + i]) {
				 dynamic = false;
				 break;
			 };
		 };
		 
		 let values;
		 if (dynamic && !multi) {  
			 values = chart.getDynamicXY(it) ;
		 } else {
			 values = chart.getXY(it,multi);
		 };
		 
		 let mode = 'lines';
		 if (properties['ShowMarkers']) {
			 mode = 'lines+markers';
		 }
		 let data = [];
		 for (let key in values.y) {
        	if (properties['YDataField' + key] || dynamic) {
	         	let trace = new Object()
	         	trace.series = key;
	         	trace.dataSource = it.TargetProperty;         	
	         	trace.line = new Object();
	         	trace.line.shape = properties['SeriesType' + key];
		        trace.x = values.x;
		        trace.y = values.y[key].values;
		        trace.marker = new Object();
		        trace.marker.symbol = properties['MarkerShape'];
		        trace.marker.size = properties['MarkerSize'];
		        if (values.y[key].markerColors.length > 0) {
		        	trace.marker.color = values.y[key].markerColors;
		        }
		        if (properties['TooltipText' + key]) {
		        	trace.text = values.y[key].text;
		        }
		        trace.mode = mode;
		        trace.type = 'scatter';
		        data.push(trace);
        	};
		 };
		 
		 return data;
	};
	
}; 