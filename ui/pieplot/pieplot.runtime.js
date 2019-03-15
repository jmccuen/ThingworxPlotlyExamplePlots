TW.Runtime.Widgets.pieplot= function () {
	let chart;
	let thisWidget = this;
	let properties = this.properties;
	
	this.renderHtml = function () {
		return 	'<div class="widget-content widget-pieplot">' +
				'</div>';
	};

	this.afterRender = function () {
		chart = new TWRuntimeChart(this);
		chart.render();
		
	};

	this.updateProperty = function (updatePropertyInfo) {
		 if (updatePropertyInfo.TargetProperty === 'Data') {
			 
			 var data = [];
			 var labels = [];
			 var values = [];
			 var label = properties["LabelsField"];
			 var value = properties["ValuesField"];
			 
			 const rows = updatePropertyInfo.ActualDataRows;

	         for (let i=0;i<rows.length;i++) {
	        	 let row = rows[i];
	        	 labels.push(row[label]);
	        	 values.push(row[value]);
	         }
	         
	         data.push({"values": values, "labels": labels, type:"pie"});
			 
			 chart.draw(data);
		 }
	}
};