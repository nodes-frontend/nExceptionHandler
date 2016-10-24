!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register('2', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var dependencies = [];
                angular.module('nExceptionHandler', dependencies);
            })(component || (component = {}));
        }
    };
});
/// <reference path="../node_modules/bugsnag-js/src/bugsnag.d.ts" />
$__System.register('3', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var nExcptionHandler;
    return {
        setters: [],
        execute: function () {
            var nExcptionHandler;
            (function (nExcptionHandler) {
                'use strict';

                var ExceptionHandlerProvider = function () {
                    function ExceptionHandlerProvider() {
                        var _this = this;
                        this.config = {
                            appErrorPrefix: undefined,
                            useBugsnag: false,
                            bugsnagConfiguration: {},
                            showCrashTemplateOnException: true,
                            crashTemplate: ['<div style="width:100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #f7f7f7;">', '<h3>Error</h3>', '<p>Sorry, something went wrong.</p>', '<button style="color: rgb(17, 85, 204); font-size: 14px;" onclick="window.location.reload()">Reload</button>', '</div>'].join('')
                        };
                        this.$get = function () {
                            return { config: _this.config };
                        };
                    }
                    ExceptionHandlerProvider.prototype.configure = function (cfg) {
                        if (!cfg.bugsnagConfiguration && cfg.useBugsnag === true) {
                            throw 'You need to provide a Bugsnag Configration to use Bugsnag :-)';
                        }
                        if (cfg.bugsnagConfiguration && cfg.useBugsnag === true) {
                            if (!cfg.bugsnagConfiguration.apiKey) {
                                throw 'You need to provide the apiKey for Bugsnag';
                            }
                        }
                        for (var key in cfg) {
                            if (cfg.hasOwnProperty(key) && key !== 'bugsnagConfiguration') {
                                /* istanbul ignore else */
                                if (this.config.hasOwnProperty(key)) {
                                    this.config[key] = cfg[key];
                                }
                            }
                        }
                        for (var key in cfg.bugsnagConfiguration) {
                            /* istanbul ignore else */
                            if (cfg.bugsnagConfiguration.hasOwnProperty(key)) {
                                this.config.bugsnagConfiguration[key] = cfg.bugsnagConfiguration[key];
                                /* istanbul ignore else */
                                if ('Bugsnag' in window) {
                                    Bugsnag[key] = cfg.bugsnagConfiguration[key];
                                }
                            }
                        }
                    };
                    return ExceptionHandlerProvider;
                }();
                nExcptionHandler.ExceptionHandlerProvider = ExceptionHandlerProvider;
                extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler'];
                /**
                 * Extend the $exceptionHandler service to also display a toast.
                 * @param  {Object} $delegate
                 * @param  {Object} exceptionHandler
                 * @return {Function} the decorated $exceptionHandler service
                 */
                function extendExceptionHandler($delegate, exceptionHandler) {
                    return function (exception, cause) {
                        var appErrorPrefix = exceptionHandler.config.appErrorPrefix;
                        if ('Bugsnag' in window && exceptionHandler.config.useBugsnag) {
                            Bugsnag.notifyException(new Error(exception), { diagnostics: { cause: cause } });
                        }
                        /* istanbul ignore else */
                        if (exceptionHandler.config.showCrashTemplateOnException && angular.isDefined(exceptionHandler.config.crashTemplate) && exceptionHandler.config.crashTemplate.length > 0) {
                            document.body.innerHTML = exceptionHandler.config.crashTemplate;
                        }
                        if (typeof exception === 'string') {
                            exception = appErrorPrefix + exception;
                        } else {
                            exception.message = appErrorPrefix + exception.message;
                        }
                        if (cause) {
                            $delegate(exception, cause);
                        } else {
                            $delegate(exception);
                        }
                    };
                }
                nExcptionHandler.extendExceptionHandler = extendExceptionHandler;
                config.$inject = ['$provide'];
                function config($provide) {
                    $provide.decorator('$exceptionHandler', extendExceptionHandler);
                }
                angular.module('nExceptionHandler').provider('exceptionHandler', ExceptionHandlerProvider).config(config);
            })(nExcptionHandler || (nExcptionHandler = {}));
        }
    };
});
$__System.register('1', ['2', '3'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (_1) {}, function (_2) {}],
        execute: function () {}
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=component.js.map