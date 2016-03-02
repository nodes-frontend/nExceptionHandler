(function() {
	'use strict';

	angular
		.module('nCore.nExceptionHandler.config', [])
		.provider('nExceptionHandlerConfig', nExceptionHandlerConfig);

	function nExceptionHandlerConfig() {
		/*jshint validthis: true */

		var defaults = {
			useCustomExceptionHandler: true
		};

		// If config provided, acts as a setter, else acts as a getter
		this.configure = function(config) {
			if(!arguments[0]) {
				return defaults;
			} else {
				angular.extend(defaults, config);
			}
		};

		/* @ngInject */
		this.$get = function() {
			return defaults;
		};

	}

})();