/**
 * Angular Exception Handler, part of the nCore.
 * @version v1.0.0 - 2015-05-13
 * @link https://github.com/nodes-galactic/nExceptionHandler
 * @author Dennis Haulund Nielsen
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {
	'use strict';

	angular.module('nCore.nExceptionHandler', ['nCore.nLogger']);

})();

(function () {
	'use strict';

	angular
		.module('nCore.nExceptionHandler')
		.config(nExceptionHandlerConfig);

	function nExceptionHandlerConfig($provide) {
		$provide.decorator('$exceptionHandler', _extendExceptionHandler);
	}
	nExceptionHandlerConfig.$inject = ["$provide"];

	function _extendExceptionHandler($delegate, nLogger) {
		return function(exception, cause) {
			nLogger.error(exception, cause);
		};
	}
	_extendExceptionHandler.$inject = ["$delegate", "nLogger"];

})();
