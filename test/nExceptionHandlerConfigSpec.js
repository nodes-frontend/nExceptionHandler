describe('nExceptionHandler', () => {
	let nLogger;
	let nExceptionHandlerConfig;
	let $exceptionHandler;
	let _window;

	// Config
	let useCustomExceptionHandler;
	let useNativeStackTrace;

	// Inject function
	const _inject = () => {
		inject(['nLogger', 'nExceptionHandlerConfig', '$exceptionHandler', '$window', (_nLogger, _nExceptionHandlerConfig, _$exceptionHandler, $window) => {
			nExceptionHandlerConfig = _nExceptionHandlerConfig;
			nLogger 				= _nLogger;
			$exceptionHandler 		= _$exceptionHandler;
			_window					= $window;

		}]);
	};

	beforeEach(() => {
		module(($provide, $exceptionHandlerProvider) => {

			$provide.service('nLogger', () => {
				return {
					error: jasmine.createSpy('nLogger.error')
				};
			});

			$provide.provider('nExceptionHandlerConfig', class {
				$get() {
					return {
						useCustomExceptionHandler: useCustomExceptionHandler
					};
				}
			});

			// Toogle availability of captureStackTrace
			let Error;

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

	it('should call nLogger.error, if useCustomExceptionHandler is true', () => {

		useCustomExceptionHandler = true;

		_inject();

		$exceptionHandler('Oops! Something went wrong');
		expect(nLogger.error).toHaveBeenCalled();
	});

	it('should not call nLogger.error, if useCustomExceptionHandler is false', () => {

		useCustomExceptionHandler = false;

		_inject();

		$exceptionHandler('Oops! Something went wrong');
		expect(nLogger.error).not.toHaveBeenCalled();
	});

	it('should use native stacktrace, if available', () => {

		useCustomExceptionHandler 	= true;
		useNativeStackTrace 		= true;

		_inject();

		$exceptionHandler('Oops! Something went wrong');
		expect(_window.Error.captureStackTrace).toHaveBeenCalled();
	});
});