(function() {
	
	angular.module('demoApp', [
		'nDocs',
		'nExceptionHandler'
	]);
	
	angular
		.module('demoApp')
		.config(function(exceptionHandlerProvider) {
			console.log(exceptionHandlerProvider);
			exceptionHandlerProvider.configure({
				useBugsnag: true,
				bugsnagConfiguration: {
					apiKey: '76281fd4cce7f45ae4a2823b2bf4029a',
					releaseStage: 'development'
				},
				crashTemplate: [
					'<div style="width:100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #f7f7f7;">',
						'<h3>Error</h3>',
						'<p>Sorry, something went wrong.</p>',
						'<button style="color: rgb(17, 85, 204); font-size: 14px;" onclick="window.location.reload()">Reload</button>',
					'</div>'
				].join('')
			});
		})
		.controller('demoController', function() {
			var vm = this;
			// throw the exception
			var x = n + 1;
		});
	
})();