describe('nExceptionHandlerConfig', () => {

	let nExceptionHandlerConfig;
	let nExceptionHandlerConfigProvider;

	beforeEach(() => {
		module('nCore.nExceptionHandler.provider');
	});

	// What should the feature do?
	it('should return defaults', () => {

		inject(['nExceptionHandlerConfig', (_nExceptionHandlerConfig) => {
			nExceptionHandlerConfig = _nExceptionHandlerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		const actual = nExceptionHandlerConfig;

		// What is the expected output?
		const expected = {
			useCustomExceptionHandler: true
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should have "configure" function defined', () => {

		// load the provider with module to be able to call its configuration methods
		module(['nExceptionHandlerConfigProvider', (_nExceptionHandlerConfigProvider) => {
			nExceptionHandlerConfigProvider = _nExceptionHandlerConfigProvider;
		}]);

		inject(['nExceptionHandlerConfig', (_nExceptionHandlerConfig) => {
			nExceptionHandlerConfig = _nExceptionHandlerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		const actual = nExceptionHandlerConfigProvider.configure;

		// What is the expected output?
		expect(actual).toEqual( jasmine.any(Function) );
	});

	// What should the feature do?
	it('should configure "useCustomExceptionHandler" to false', () => {

		// load the provider with module to be able to call its configuration methods
		module(['nExceptionHandlerConfigProvider', (_nExceptionHandlerConfigProvider) => {
			nExceptionHandlerConfigProvider = _nExceptionHandlerConfigProvider; // to use the provider in other parts
			nExceptionHandlerConfigProvider.configure({useCustomExceptionHandler: false});
		}]);

		inject(['nExceptionHandlerConfig', (_nExceptionHandlerConfig) => {
			nExceptionHandlerConfig = _nExceptionHandlerConfig; // to use the instance in other parts
		}]);

		// What is the actual output?
		const actual = nExceptionHandlerConfig;

		// What is the expected output?
		const expected = {
			useCustomExceptionHandler: false
		};

		expect(actual).toEqual(expected);
	});

	// What should the feature do?
	it('should return defaults, if no config are provided for configure function', () => {

		// load the provider with module to be able to call its configuration methods
		module(['nExceptionHandlerConfigProvider', (_nExceptionHandlerConfigProvider) => {
			nExceptionHandlerConfigProvider = _nExceptionHandlerConfigProvider; // to use the provider in other parts

			// What is the actual output?
			const actual = nExceptionHandlerConfigProvider.configure();

			// What is the expected output?
			const expected = {
				useCustomExceptionHandler: true
			};

			expect(actual).toEqual(expected);
		}]);
	});
});