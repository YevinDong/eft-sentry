export function isProdRunFn(isDev: boolean, cb?: () => any) {
    if (isDev) console.log('👨‍💻 [sentry]:Development mode, Sentry is disabled.');
    else typeof cb === "function" && cb();
}
export function isInitRunFn(isInit: boolean, cb?: () => any) {
    if (!isInit) console.log('🙅 [sentry]:Sentry has been initialized.');
    else typeof cb === "function" && cb();
}

export function haveSingleton(singleton: unknown, cb?: () => any) {
    if (singleton) {
        console.log("❌ [sentry]:Sentry has been initialized.")
        return singleton;
    } else return typeof cb === "function" && cb();
}