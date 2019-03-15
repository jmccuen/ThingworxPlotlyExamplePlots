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
	            const rows = updatePropertyInfo.ActualDataRows;
	            let data = []
	            let x = [];
	            let yArray = [];
	            
	            for (let i=0;i<rows.length;i++) {
	            	x.push(rows[i][properties['XAxisField']])
	            	
	            	for (j=1;j<=properties['NumberOfSeries'];j++) {
	            		if (i==0) {
	            			yArray.push([]);
	            		}
	            		let y = rows[i][properties['YDataField' + j]]
	            		yArray[j-1].push(y)
	            	}
	            	
	            }
	            
	            for (i=0;i<properties['NumberOfSeries'];i++) {
	            	let trace = new Object()
	            	trace.series = i+1;
		            trace.x = x;
		            trace.y = yArray[i];
		            trace.type = 'scatter';
		            
		            data.push(trace);
	            }
	            
	            
	            chart.draw(data);
	        }
		 
			 for (let i=1;i <= Number(properties['NumberOfSeries']);i++) {
		        	if (updatePropertyInfo.TargetProperty === 'DataSource'+i) {
		        		console.log(i);
		        		const rows = updatePropertyInfo.ActualDataRows;
		        		if (rows.length > 0) {
				            let data = []
				            let x = [];
				            let y = [];
				            
				            for (let j=0;j<rows.length;j++) {
				            	x.push(rows[j][properties['XDataField' + i]])
				            	y.push(rows[j][properties['YDataField' + i]])
				            }
				            
				            let trace = new Object();
				            trace.series = i;
				            trace.x = x;
				            trace.y = y;
				            trace.type = 'scatter';
				            data.push(trace)
				            
				            chart.draw(data);
		        		}
		        	}
			 }
	};
	
};