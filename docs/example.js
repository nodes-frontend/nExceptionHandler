(function() {
	
	angular.module('demoApp', [
		'nDocs',
		'component'
	]);
	
	angular
		.module('demoApp')
		.controller('demoController', function() {
			var vm = this;
			// throw the exception
			var x = n + 1;
		});
	
})();