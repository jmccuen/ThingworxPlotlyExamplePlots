TW.Runtime.Widgets.pieplot= function () {
	
	let thisWidget = this;
	let properties = this.properties;
	let chart = new TWRuntimeChart(thisWidget);
	
	this.renderHtml = function () {
		return 	'<div class="widget-content widget-pieplot">' +
				'</div>';
	};

	this.afterRender = function () {
		chart.render();
		
	};

	this.updateProperty = function (updatePropertyInfo) {
		 chart.update(updatePropertyInfo);
		 if (updatePropertyInfo.TargetProperty === 'Data') {
			 
			 let data = [];
			 let labels = [];
			 let values = [];
			 let label = properties["LabelsField"];
			 let value = properties["ValuesField"];
			 
			 const rows = updatePropertyInfo.ActualDataRows;
			 let formatter = properties['ColorFormat'];
			 
			 let line = new Object();
			 let marker = new Object();
	         for (let i=0;i<rows.length;i++) {
	        	 let row = rows[i];
	        	 
	        	 if (formatter) {
	                 let style = TW.getStyleFromStateFormatting({ DataRow: row, StateFormatting: formatter });
	                 if (!line.colors) { 
	                 	line.colors = [] 
	                 };
	                 if (!marker.colors) { 
	                	 marker.colors = [] 
	                 };
	                 
	                 line.colors.push(style.lineColor);
	                 marker.colors.push(style.backgroundColor);
	             };
	        	 
	        	 labels.push(row[label]);
	        	 values.push(row[value]);
	         }
	         
	         let trace = new Object();
	         
	         trace.values = values;
	         trace.labels = labels;
	         trace.marker = marker;
	         trace.line = line;
	         trace.type = 'pie';
	         
	         data.push(trace);
			 
			 chart.draw(data);
		 }
	}
};