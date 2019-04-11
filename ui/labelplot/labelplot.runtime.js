TW.Runtime.Widgets.labelplot = function () {
	
	
	let properties = this.properties;
	let thisWidget = this;
	let chart = new TWRuntimeChart(thisWidget, 'widget-labelplot');
	
	this.renderHtml = function () {
		return 	chart.renderHtml();
	};

	this.afterRender = function () {
		chart.afterRender();
		chart.layout.barmode = properties['BarMode'];
		return;
	};
	

	this.updateProperty = function (updatePropertyInfo) {
		
		chart.updateProperty(updatePropertyInfo);
		
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
		 
		dynamic = false; //TODO: work on this later
		let values;
		if (dynamic && !multi) {  
			values = chart.getDynamicXY(it) ;
		} else {
			values = chart.getXY(it,multi);
		};
		 
			
		let chartType = properties['ChartType'];
		
		let data = [];
		for (let key in values.y) {
			let seriesType = properties['SeriesType'+key];
			
			if (properties['YDataField' + key] || dynamic) {
	         	let trace = new Object()
	         	trace.series = key;
	         	trace.dataSource = it.TargetProperty;         	
	         	trace.line = new Object();
	         	trace.marker = new Object();
	         	trace.line.shape = properties['SeriesMode' + key];
			    trace.marker.symbol = properties['MarkerShape'];
			    trace.marker.size = properties['MarkerSize'];
	         	
		        trace.x = values.x;
		        trace.y = values.y[key].values;

		        if (values.y[key].markerColors.length > 0) {
		        	trace.marker.color = values.y[key].markerColors;
		        }
		        if (properties['TooltipText' + key]) {
		        	trace.text = values.y[key].text;
		        	trace.textposition = 'auto';
		        }
		        if (properties['SeriesType' + key] === 'chart') {
		        	trace = getChartType(trace,chartType);
		        } else {
		        	trace = getChartType(trace, seriesType);
		        };
		        
		        data.push(trace);
        	};
		};
		 
		return data;
	};
	
	function getChartType(trace,type) {
		switch(type) {
			case 'horizontalBar':
				trace.type = 'bar';
				trace.orientation = 'h';
				break;
			case 'areas':
				trace.mode = 'lines';
				trace.type = 'scatter'; 
				trace.fill = 'tozeroy';
				break;
			case 'areas+markers':
				trace.mode = 'lines+markers';
				trace.type = 'scatter'; 
				trace.fill = 'tozeroy';
				break;
			case 'lines':
				trace.mode = 'lines';
				trace.type = 'scatter';
				break;
			case 'lines+markers':
				trace.mode = 'lines+markers';
				trace.type = 'scatter';
				break;
			case 'markers':
				trace.mode = 'markers';
				trace.type = 'scatter';
				break;
			case 'bar':
				trace.type = 'bar';
				break
			default:
				trace.type = 'scatter';
				break;	
		};
		return trace;
	};
	
}; 