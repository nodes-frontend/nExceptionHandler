/// <reference path="../node_modules/bugsnag-js/src/bugsnag.d.ts" />

namespace nExcptionHandler {
    'use strict';

    export interface IExceptionHandlerConfig {
        appErrorPrefix: string,
        useBugsnag: boolean,
        bugsnagConfiguration: Object,
        showCrashTemplateOnException: boolean,
        crashTemplate: string
    }

    export class ExceptionHandlerProvider {

        constructor() {}

        config: IExceptionHandlerConfig = {
            appErrorPrefix: undefined,
            useBugsnag: false,
            bugsnagConfiguration: {},
            showCrashTemplateOnException: true,
            crashTemplate: [
                '<div style="width:100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #f7f7f7;">',
                    '<h3>Error</h3>',
                    '<p>Sorry, something went wrong.</p>',
                    '<button style="color: rgb(17, 85, 204); font-size: 14px;" onclick="window.location.reload()">Reload</button>',
                '</div>'
            ].join('')
        };

        configure(cfg: any) {
            if(!cfg.bugsnagConfiguration && cfg.useBugsnag === true) {
                throw 'You need to provide a Bugsnag Configration to use Bugsnag :-)';
            }
            if(cfg.bugsnagConfiguration && cfg.useBugsnag === true) {
                if(!cfg.bugsnagConfiguration.apiKey) {
                    throw 'You need to provide the apiKey for Bugsnag';
                }
            }


            for(var key in cfg) {
                if(cfg.hasOwnProperty(key) && key !== 'bugsnagConfiguration') {
                    /* istanbul ignore else */
                    if(this.config.hasOwnProperty(key)) {
                        this.config[key] = cfg[key];
                    }
                }
            }

            for(var key in cfg.bugsnagConfiguration) {
                /* istanbul ignore else */
                if(cfg.bugsnagConfiguration.hasOwnProperty(key)) {
                    this.config.bugsnagConfiguration[key] = cfg.bugsnagConfiguration[key];

                    /* istanbul ignore else */
                    if('Bugsnag' in window) {
                        Bugsnag[key] = cfg.bugsnagConfiguration[key];
                    }
                }
            }

        }
        $get: () => { config: IExceptionHandlerConfig } = () => { return { config: this.config }; }
    }

    extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler'];
    /**
     * Extend the $exceptionHandler service to also display a toast.
     * @param  {Object} $delegate
     * @param  {Object} exceptionHandler
     * @return {Function} the decorated $exceptionHandler service
     */
    export function extendExceptionHandler(
        $delegate: ng.IExceptionHandlerService,
        exceptionHandler: any
    ) {
        return function(exception: any, cause: any) {
            var appErrorPrefix = exceptionHandler.config.appErrorPrefix;

            if('Bugsnag' in window && exceptionHandler.config.useBugsnag) {
                Bugsnag.notifyException(new Error(exception), {diagnostics:{cause: cause}});
            }

            /* istanbul ignore else */
            if(exceptionHandler.config.showCrashTemplateOnException &&
                angular.isDefined(exceptionHandler.config.crashTemplate) &&
                exceptionHandler.config.crashTemplate.length > 0
            ) {
                document.body.innerHTML = exceptionHandler.config.crashTemplate;
            }

            /* istanbul ignore next */
            if(typeof exception === 'string') {
                exception = appErrorPrefix + exception;
            } else {
                exception.message = appErrorPrefix + exception.message;
            }

            /* istanbul ignore next */
            if(cause) {
                $delegate(exception, cause);
            } else {
                $delegate(exception);
            }

        };
    }

    config.$inject = ['$provide'];
    function config($provide: ng.auto.IProvideService) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    angular
        .module('nExceptionHandler')
        .provider('exceptionHandler', ExceptionHandlerProvider)
        .config(config);

}