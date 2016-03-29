(function() {
	"use strict";

	angular
		.module('nCore.nExceptionHandler.config', [])
		.config(nExceptionHandlerConfig);

	/* @ngInject */
	function nExceptionHandlerConfig($provide) {
		$provide.decorator('$exceptionHandler', _extendExceptionHandler);
	}

	/* @ngInject */
	function _extendExceptionHandler($delegate, $window, nLogger, nExceptionHandlerConfig) {
		/*jshint validthis: true */

		/**
		 * Based on discussions and answers here:
		 * http://stackoverflow.com/questions/464359/custom-exceptions-in-javascript
		 *
		 * Prototypically inherits from Error.
		 *
		 * @param name {String}
		 * @param message {String}
		 * @private
		 */
		function _nException(name, message) {
			this.name = name;
			this.message = message;

			// Use V8's native method if available, otherwise fallback
			if('captureStackTrace' in $window.Error) {
				$window.Error.captureStackTrace(this, _nException);
			} else {
				this.stack = (new Error()).stack;
			}
		}
		_nException.prototype = Object.create(Error.prototype);
		_nException.prototype.name = 'nException';
		_nException.prototype.constructor = _nException;

		/**
		 * Decorates $exceptionHandler
		 *
		 * If useCustomExceptionHandler is true we use our custom implementation of Error,
		 * else we just call the core Angular $exceptionHandler.
		 *
		 * This is also where we would want to invoke any calls to thirdparties.
		 */
		return function nException(exception, cause) {

			if(nExceptionHandlerConfig.useCustomExceptionHandler) {
				nLogger.error(new _nException(exception, cause));
			} else {
				$delegate(exception, cause);
			}

		};
	}

})();