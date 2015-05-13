(function () {
	'use strict';

	angular
		.module('nCore.nExceptionHandler')
		.config(nExceptionHandlerConfig);

	function nExceptionHandlerConfig($provide) {
		$provide.decorator('$exceptionHandler', _extendExceptionHandler);
	}

	function _extendExceptionHandler($delegate, nLogger) {
		return function(exception, cause) {
			nLogger.error(exception, cause);
		};
	}

})();
