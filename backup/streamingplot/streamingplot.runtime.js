TW.Runtime.Widgets.streamingplot= function () {
	
	let thisWidget = this;
	let properties = this.properties;
	let chart = new TWRuntimeChart(thisWidget);
	
	this.renderHtml = function () {
		return 	'<div class="widget-content widget-streamingplot">' +
				'</div>';
	};

	this.afterRender = function () {
		chart.render();
	};

	this.updateProperty = function (updatePropertyInfo) {
		 if (updatePropertyInfo.TargetProperty === 'Data') {
			 
	            const rows = updatePropertyInfo.ActualDataRows;
	            let data = []
	            let x = [];
	            let yArray = [];
	            chart.chartInfo['Data'] = new Object();
	            chart.chartInfo['Data'].length = rows.length;
	            
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
	            	trace.dataSource = 'Data';
		            trace.x = x;
		            trace.y = yArray[i];
		            trace.type = 'scatter';
		            
		            data.push(trace);
	            }
	            
	            
	            if (chart.plotted) {
	            	let update = new Object();
	            	update.x = [data[0].x];
	            	update.y = [data[0].y];
	            	chart.extend(update);
	            } else {
	            	chart.draw(data);
	            }
	        }
		 
			 for (let i=1;i <= Number(properties['NumberOfSeries']);i++) {
		        	if (updatePropertyInfo.TargetProperty === 'DataSource'+i) {
		        		const rows = updatePropertyInfo.ActualDataRows;
		        		if (rows.length > 0) {
				            let data = []
				            let x = [];
				            let y = [];
				            chart.chartInfo['DataSource' + i] = new Object();
				            chart.chartInfo['DataSource' + i].length = rows.length;
				            for (let j=0;j<rows.length;j++) {
				            	x.push(rows[j][properties['XDataField' + i]])
				            	y.push(rows[j][properties['YDataField' + i]])
				            }
				            
				            let trace = new Object();
				            trace.dataSource = 'DataSource' + i;
				            trace.series = i;
				            trace.x = x;
				            trace.y = y;
				            trace.type = 'scatter';
				            data.push(trace)
				            
				            if (chart.plotted) {
				            	chart.extend(data);
				            } else {
				            	chart.draw(data);
				            }
		        		}
		        	}
			 }
	};
	
}; 