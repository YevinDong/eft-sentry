export declare type Route = {
    /** Unparameterized URL */
    path: string;
    /**
     * Query params (keys map to null when there is no value associated, e.g. "?foo" and to an array when there are
     * multiple query params that have the same key, e.g. "?foo&foo=bar")
     */
    query: Record<string, string | null | (string | null)[]>;
    /** Route name (VueRouter provides a way to give routes individual names) */
    name?: string | symbol | null | undefined;
    /** Evaluated parameters */
    params: Record<string, string | string[]>;
    /** All the matched route objects as defined in VueRouter constructor */
    matched: {
        path: string;
    }[];
};
export interface VUE_ROUTER {
    onError: (fn: (err: Error) => void) => void;
    beforeEach: (fn: (to: Route, from: Route, next: () => void) => void) => void;
}
export interface SENTRY_LOCAL_CONFIG {
    Blacklist: Array<string | RegExp>;
    tracesSampleRate: number;
}
export interface SENTRY_CONFIG extends Partial<SENTRY_LOCAL_CONFIG> {
    dsn: string;
    environment?: string;
}
export type SENTRY_TOTAL_CONFIG = SENTRY_LOCAL_CONFIG & SENTRY_CONFIG;
