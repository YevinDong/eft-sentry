import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import { isProdRunFn, isInitRunFn, haveSingleton } from "../utils"
import localConfig from "../config"

import type { VUE_ROUTER, SENTRY_CONFIG, SENTRY_TOTAL_CONFIG } from "../types"
import type { CaptureContext } from '@sentry/types';
import type { Vue as VUE } from "@sentry/vue/types/types";
export interface SENTRY_PROPS {
    app: VUE | VUE[];
    router: VUE_ROUTER;
    env: any;
    config: SENTRY_CONFIG;
    isVue2?: boolean;
}

export default class Init {
    protected config: SENTRY_TOTAL_CONFIG;

    static isInit: boolean = false;
    static isDev: boolean = false;
    static singleton: Init;
    static send(error: any, context: CaptureContext = {}) {
        Init.staticFnRun(() => Sentry.captureException(error, context))
    }
    static msg(msg: any, context: CaptureContext = {}) {
        Init.staticFnRun(() => Sentry.captureMessage(msg, context))
    }
    static staticFnRun(cb: () => any) {
        isProdRunFn(Init.isDev, () => {
            isInitRunFn(Init.isInit, () => {
                typeof cb === "function" && cb();
            }) 
        })
    }
    constructor({ app, router, isVue2, config, env = {} }: SENTRY_PROPS) {
        // # Singleton mode to prevent repeated initialization；
        if (Init.singleton) {
            console.log("❌ [sentry]:Sentry has been initialized.")
            return Init.singleton;
        }
        isProdRunFn(
            // # Determine whether it is a production environment；
            Init.isDev = env.npm_lifecycle_event === "dev"
            , () => {
                this.config = Object.assign({}, localConfig, config);
                Sentry.init({
                    // # if vue2, use app; if vue3, use app;
                    ...isVue2 ? { Vue: (app as VUE) } : { app },
                    environment: this.config.environment || env.NODE_ENV || "production",
                    dsn: this.config.dsn,
                    integrations: [
                        new BrowserTracing({
                            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
                            tracePropagationTargets: this.config.Blacklist,
                        }),
                    ],
                    tracesSampleRate: this.config.tracesSampleRate,
                });
                Init.isInit = true;
                Init.singleton = this;
            })
    }
    // # vue3 plugin ; use app.use(Sentry,{[...]});
    static install(app: VUE, option: Omit<SENTRY_PROPS, "app">) {
        return haveSingleton(Init.singleton,
            () => new Init({
                app,
                ...option
            })
        )
    }
}

