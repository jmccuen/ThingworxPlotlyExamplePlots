TW.Runtime.Widgets.timeseriesplot= function () {
	let chart;
	let thisWidget = this;
	let properties = this.properties;
	
	this.renderHtml = function () {
		return 	'<div class="widget-content widget-timeseriesplot">' +
				'</div>';
	};

	this.afterRender = function () {
		chart = new TWRuntimeChart(this);
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
			 values = getDynamicValues(it) ;
		 } else {
			 values = getValues(it);
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
	
	function getValues(it) {
		const rows = it.ActualDataRows;
		let values = new Object();
        let x = [];       
        let y = new Object();
        
        for (let i=0;i<rows.length;i++) {
        	x.push(rows[i][properties['XAxisField']]);
       	for (let j=1;j<=properties['NumberOfSeries'];j++) {
       		if (properties['YDataField' + j]) {
					if (!y[j]) {	
						y[j] = new Object();
						y[j].values = [];
					};
		    		y[j].values.push(rows[i][properties['YDataField' + j]]);
       		};
       	};
        };
        
        values.x = x;
        values.y = y;
        
        return values;
	}
	function getDynamicValues(it) {
		const rows = it.ActualDataRows;
		let values = new Object();
        let x = [];
        let y = {};
		let shape = it.DataShape;
		
		for (let i=0;i<rows.length;i++) {
			let count = 1;
			x.push(rows[i][properties['XAxisField']]);
			for (let key in shape) {
				if (shape[key].baseType === 'NUMBER' || shape[key].baseType === 'INTEGER') {
					if (!y[count]) {	
						y[count] = new Object();
						y[count].values = [];
					};
					y[count].values.push(rows[i][key]);
					count++;
				};
			};
		};
		values.x = x;
		values.y = y;
		
        return values
	};
	
	function getMultiData(it,series) {
		const rows = it.ActualDataRows;
        let data = []
        let x = [];
        let y = [];
        chart.chartInfo['DataSource' + series] = new Object();
        chart.chartInfo['DataSource' + series].length = rows.length;
        for (let j=0;j<rows.length;j++) {
        	x.push(rows[j][properties['XDataField' + series]]);
        	y.push(rows[j][properties['YDataField' + series]]);
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
	
    this.runtimeProperties = function () {
        return {
            'needsDataLoadingAndError': true,
	        'supportsAutoResize': true
        };
    };
	
}; 