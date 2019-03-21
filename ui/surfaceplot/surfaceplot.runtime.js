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
			let zArray = [];
			
			for (let i = 0; i<rows.length;i++) {
				let row = rows[i];
				if (!zArray[rows[i][properties['XAxisField']]]) {
					zArray[rows[i][properties['XAxisField']]] = [];
				}
				zArray[rows[i][properties['XAxisField']]].push(rows[i][properties['ZDataField1']]);
			}
			
			let trace = new Object();
			trace.z = zArray;
			trace.type = 'surface';
			
			chart.draw([trace]);
			
		}
		
	}
	
};