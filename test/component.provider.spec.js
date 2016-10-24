'use strict';

describe('nExceptionHandler', function() {
	
	var nExceptionHandlerService;
	var nExceptionHandlerProvider;
	var $exceptionHandler;
	var aExceptionHandlerProvider;
	
	var rootScope;
	
	var mocks = {
		errorMessage: 'fake error',
		prefix: '[TEST]: '
	};
	
	var crashTpl = [
		'<div style="width:100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #f7f7f7;">',
		'<h3>Error</h3>',
		'<p>Sorry, something went wrong.</p>',
		'<button style="color: rgb(17, 85, 204); font-size: 14px;" onclick="window.location.reload()">Reload</button>',
		'</div>'
	].join('');
	
	module.sharedInjector();
	
	beforeAll(module('nExceptionHandler', function(exceptionHandlerProvider, $exceptionHandlerProvider) {
		aExceptionHandlerProvider = $exceptionHandlerProvider;
		aExceptionHandlerProvider.mode('log');
		nExceptionHandlerProvider = exceptionHandlerProvider;
	}));
	
	beforeAll(inject(function(_exceptionHandler_, _$exceptionHandler_, $rootScope) {
		$exceptionHandler = _$exceptionHandler_;
		nExceptionHandlerService = _exceptionHandler_;
		rootScope = $rootScope;
	}));
	
	describe('nExceptionHandlerProvider', function() {
		it('should be configurable', inject(function() {
			expect(nExceptionHandlerProvider.configure).toBeDefined();
		}));
		
		it('should throw an exception when enabling Bugsnag and not providing a configuration Object', inject(function() {
			expect(function() {
				nExceptionHandlerProvider.configure({
					useBugsnag: true
				});
			}).toThrow('You need to provide a Bugsnag Configration to use Bugsnag :-)');
		}));
		
		it('should throw an exception when enabling Bugsnag and not an apiKey in the configuration', inject(function() {
			expect(function() {
				nExceptionHandlerProvider.configure({
					useBugsnag: true,
					bugsnagConfiguration: {}
				});
			}).toThrow('You need to provide the apiKey for Bugsnag');
		}));
		
		it('should apply non Bugsnag configurations to the configuration', inject(function() {
			
			var cfg = {
				appErrorPrefix: 'foo',
				useBugsnag: false,
				bugsnagConfiguration: {},
				showCrashTemplateOnException: false,
				crashTemplate: crashTpl
			};
			
			nExceptionHandlerProvider.configure(cfg);
			
			expect(nExceptionHandlerProvider.config).toEqual(cfg);
		}));
		
		it('should apply Bugsnag configurations', inject(function() {
			
			window.Bugsnag = {};
			
			var bugSnagCfg = {
				apiKey: 'foo'
			};
			
			var cfg = {
				appErrorPrefix: undefined,
				useBugsnag: true,
				bugsnagConfiguration: bugSnagCfg,
				showCrashTemplateOnException: true,
				crashTemplate: crashTpl
			};
			
			nExceptionHandlerProvider.configure(cfg);
			
			expect(window.Bugsnag).toEqual(bugSnagCfg);
			
		}));
		
		it('should throw an error when forced', inject(function() {
			expect(functionThatWillThrow).toThrow();
		}));
	
		it('should append a prefix to the error message if appErrorPrefix is defined', inject(function() {
			
			nExceptionHandlerProvider.configure({
				appErrorPrefix: mocks.prefix,
				useBugsnag: false
			});
			
			try {
				rootScope.$apply(functionThatWillThrow);
			} catch(e) {
				expect(e.message).toEqual(mocks.prefix + mocks.errorMessage);
			}
			
		}));
		
		it('should not append a prefix if appErrorPrefix is not defined', inject(function() {
			nExceptionHandlerProvider.configure({
				useBugsnag: false
			});
			
			try {
				rootScope.$apply(functionThatWillThrow);
			} catch(e) {
				expect(e.message).toEqual(mocks.errorMessage);
			}
			
		}));
		
		it('should send exceptions to Bugsnag', inject(function() {
			
			var exceptionThrown = false;
			
			window.Bugsnag = {
				notifyException: function(exception, options) {
					exceptionThrown = true;
				}
			};
			
			nExceptionHandlerProvider.configure({
				useBugsnag: true,
				bugsnagConfiguration: {
					apiKey: 'foo'
				}
			});
			
			$exceptionHandler({message: 'e'});
			
			expect(exceptionThrown).toEqual(true);
			
		}));
		
		it('should replace document.body.innerHTML with the crashTemplate if it configured', inject(function() {
			
			var crashTpl = '<div>foo</div>';
			
			nExceptionHandlerProvider.configure({
				useBugsnag: false,
				showCrashTemplateOnException: true,
				crashTemplate: crashTpl
			});
			
			try {
				rootScope.$apply(functionThatWillThrow);
			} catch(e) {
				expect(document.body.innerHTML).toEqual(crashTpl);
			}
			
		}));
		
	});
	
	function functionThatWillThrow() {
		throw new Error(mocks.errorMessage);
	}
	
});