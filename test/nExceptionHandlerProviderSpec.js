describe('nExceptionHandlerConfig', function() {

	var nExceptionHandlerConfig;
	var nExceptionHandlerConfigProvider;

	beforeEach(function() {
		module('nCore.nExceptionHandler.provider');
	});

	// What should the feature do?
	it('should return defaults', function() {

		inject(['nExceptionHandlerConfig', function(_nExceptionHandlerConfig) {
			nExceptionHandlerConfig = _nExceptionHandlerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		var actual = nExceptionHandlerConfig;

		// What is the expected output?
		var expected = {
			useCustomExceptionHandler: true
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should have "configure" function defined', function() {

		// load the provider with module to be able to call its configuration methods
		module(['nExceptionHandlerConfigProvider', function(_nExceptionHandlerConfigProvider) {
			nExceptionHandlerConfigProvider = _nExceptionHandlerConfigProvider;
		}]);

		inject(['nExceptionHandlerConfig', function(_nExceptionHandlerConfig) {
			nExceptionHandlerConfig = _nExceptionHandlerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		var actual = nExceptionHandlerConfigProvider.configure;

		// What is the expected output?
		expect(actual).toEqual( jasmine.any(Function) );
	});

	// What should the feature do?
	it('should configure "useCustomExceptionHandler" to false', function() {

		// load the provider with module to be able to call its configuration methods
		module(['nExceptionHandlerConfigProvider', function(_nExceptionHandlerConfigProvider) {
			nExceptionHandlerConfigProvider = _nExceptionHandlerConfigProvider; // to use the provider in other parts
			nExceptionHandlerConfigProvider.configure({useCustomExceptionHandler: false});
		}]);

		inject(['nExceptionHandlerConfig', function(_nExceptionHandlerConfig) {
			nExceptionHandlerConfig = _nExceptionHandlerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		var actual = nExceptionHandlerConfig;

		// What is the expected output?
		var expected = {
			useCustomExceptionHandler: false
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should return defaults, if no config are provided for configure function', function() {

		// load the provider with module to be able to call its configuration methods
		module(['nExceptionHandlerConfigProvider', function(_nExceptionHandlerConfigProvider) {
			nExceptionHandlerConfigProvider = _nExceptionHandlerConfigProvider; // to use the provider in other parts

			// What is the actual output?
			var actual = nExceptionHandlerConfigProvider.configure();

			// What is the expected output?
			var expected = {};

			expect(actual).toEqual({
				useCustomExceptionHandler: true
			});
		}]);

		inject(['nExceptionHandlerConfig', function(_nExceptionHandlerConfig) {
			nExceptionHandlerConfig = _nExceptionHandlerConfig; // to use the instance in other parts
		}]);
	});
});