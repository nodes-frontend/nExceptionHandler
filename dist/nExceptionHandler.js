/**
 * Angular Exception Handler, part of the nCore.
 * @version v - 2016-03-02
 * @link https://github.com/nodes-frontend/nExceptionHandler
 * @author Dennis Haulund Nielsen
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {
	'use strict';

	angular.module('nCore.nExceptionHandler', ['nCore.nExceptionHandler.config', 'nCore.nLogger']);

})();

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
(function () {
	'use strict';

	angular
		.module('nCore.nExceptionHandler')
		.config(nExceptionHandlerConfig);

	/* @ngInject */
	function nExceptionHandlerConfig($provide) {
		$provide.decorator('$exceptionHandler', _extendExceptionHandler);
	}
	nExceptionHandlerConfig.$inject = ["$provide"];

	/* @ngInject */
	function _extendExceptionHandler($delegate, nLogger, nExceptionHandlerConfig) {
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
			if('captureStackTrace' in Error) {
				Error.captureStackTrace(this, _nException);
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
	_extendExceptionHandler.$inject = ["$delegate", "nLogger", "nExceptionHandlerConfig"];

})();
