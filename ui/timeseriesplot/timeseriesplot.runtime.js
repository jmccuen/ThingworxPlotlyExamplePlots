TW.Runtime.Widgets.timeseriesplot= function () {
	
	let thisWidget = this;
	let properties = this.properties;
	let chart = new TWRuntimeChart(thisWidget);
	
	this.renderHtml = function () {
		return 	'<div class="widget-content widget-timeseriesplot">' +
				'</div>';
	};

	this.afterRender = function () {
		chart.render();
	};
	

	this.updateProperty = function (updatePropertyInfo) {

		 if (updatePropertyInfo.TargetProperty === 'Data') {
			 if (properties['XAxisField']) {
		         chart.chartInfo['Data'] = new Object();
		         chart.chartInfo['Data'].length = updatePropertyInfo.ActualDataRows.length;
				 let data = getSingleData(updatePropertyInfo);
				 chart.draw(data);
			 }; 
	     };
		 
		 for (let i=1;i <= Number(properties['NumberOfSeries']);i++) {
        	if (updatePropertyInfo.TargetProperty === 'DataSource'+i) {
        		if (updatePropertyInfo.ActualDataRows.length > 0) {
	        		let data = getMultiData(updatePropertyInfo, i);
	        		chart.draw(data);
        		};
        	};
		 };
		 
	};
    
	function getSingleData(it) {
		let dynamic = true;
		 for (let i = 1; i<= properties['NumberOfSeries'];i++) {
			 if (properties['YDataField' + i]) {
				 dynamic = false;
				 break;
			 };
		 };
		 
		 let values;
		 if (dynamic) {  
			 values = chart.getDynamicXY(it) ;
		 } else {
			 values = chart.getXY(it);
		 };
		 
		 let data = [];
		 for (let key in values.y) {
        	if (properties['YDataField' + key] || dynamic) {
	         	let trace = new Object()
	         	trace.series = key;
	         	trace.dataSource = 'Data';
		        trace.x = values.x;
		        trace.y = values.y[key].values;
		        trace.type = 'scatter';
		        data.push(trace);
        	};
		 };
		 
		 return data;
	};
	
	function getMultiData(it,series) {
		const rows = it.ActualDataRows;
        let data = []
        let x = [];
        let y = [];
        chart.chartInfo['DataSource' + series] = new Object();
        chart.chartInfo['DataSource' + series].length = rows.length;
        for (let i=0;i<rows.length;i++) {
        	x.push(rows[i][properties['XDataField' + series]]);
        	y.push(rows[i][properties['YDataField' + series]]);
        }
        let trace = new Object();
        trace.dataSource = 'DataSource' + series;
        trace.series = series;
        trace.x = x;
        trace.y = y;
        trace.type = 'scatter';
        data.push(trace);
        
        return data;
		
	};
	
}; 