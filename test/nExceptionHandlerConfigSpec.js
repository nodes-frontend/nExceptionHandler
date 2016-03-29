describe('nExceptionHandler', function () {
	var nLogger;
	var nExceptionHandlerConfig;
	var $exceptionHandler;
	var _delegate;
	var _window;

	// Config
	var useCustomExceptionHandler;
	var useNativeStackTrace;

	beforeEach(function() {
		module(function($provide, $exceptionHandlerProvider) {

			$provide.service('nLogger', function() {
				return {
					error: jasmine.createSpy('nLogger.error')
				};
			});

			$provide.provider('nExceptionHandlerConfig', function() {

				this.$get = function() {
					return {
						useCustomExceptionHandler: useCustomExceptionHandler
					};
				};
			});

			// Toogle availability of captureStackTrace
			var Error;

			if(useNativeStackTrace) {
				Error = {
					captureStackTrace: jasmine.createSpy('Error.captureStackTrace')
				};
			} else {
				Error = {};
			}

			$provide.value('$window', {
				Error: Error
			});

			$exceptionHandlerProvider.mode('log');
		});

		module('nCore.nExceptionHandler.config');
	});

	function _inject() {
		inject(['nLogger', 'nExceptionHandlerConfig', '$exceptionHandler', '$window', function(_nLogger, _nExceptionHandlerConfig, _$exceptionHandler, $window) {
			nExceptionHandlerConfig = _nExceptionHandlerConfig;
			nLogger 				= _nLogger;
			$exceptionHandler 		= _$exceptionHandler;
			_window					= $window;

		}]);
	}

	it('should call nLogger.error, if useCustomExceptionHandler is true', function() {

		useCustomExceptionHandler = true;

		_inject();

		$exceptionHandler('Oops! Something went wrong');
		expect(nLogger.error).toHaveBeenCalled();
	});

	it('should not call nLogger.error, if useCustomExceptionHandler is false', function() {

		useCustomExceptionHandler = false;

		_inject();

		$exceptionHandler('Oops! Something went wrong');
		expect(nLogger.error).not.toHaveBeenCalled();
	});

	it('should use native stacktrace, if available', function() {

		useCustomExceptionHandler 	= true;
		useNativeStackTrace 		= true;

		_inject();

		$exceptionHandler('Oops! Something went wrong');
		expect(_window.Error.captureStackTrace).toHaveBeenCalled();
	});
});