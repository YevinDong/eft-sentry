import { type SENTRY_LOCAL_CONFIG } from "./types"
const config: SENTRY_LOCAL_CONFIG = {
    Blacklist: ['localhost'],
    tracesSampleRate: 1
}
export default config;