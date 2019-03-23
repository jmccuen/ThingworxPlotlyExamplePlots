TW.Runtime.Widgets.surfaceplot= function () {
	let properties = this.properties;
	let thisWidget = this;
	let chart = new TWRuntimeChart(thisWidget);
	
	this.renderHtml = function () {
		return 	'<div class="widget-content widget-surfaceplot">' +
				'</div>';
	};

	this.afterRender = function () {
		chart.render();
	};
	

	this.updateProperty = function (updatePropertyInfo) {
		if (updatePropertyInfo.TargetProperty === 'Data') {
			let rows = updatePropertyInfo.ActualDataRows;
			
			
			let z = [];
			
			for (let i = 0; i<rows.length;i++) {
				let row = rows[i];
				let x = properties['XAxisField'];
				let value = properties['ZDataField1'];
				if (!z[row[x]]) {
					z[row[x]] = [];
				}
				z[row[x]].push(row[value]);
			}
			
			let trace = new Object();
			trace.series = 1;
			trace.z = z;
			trace.type = 'surface';

			
			chart.draw([trace]);
			
		}
		
	}
	
};