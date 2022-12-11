import { version } from "../package.json"
console.log(`✅ eft-sentry version: v${version}`);

import _SentryVue from "./vue";
export const SentryVue = _SentryVue;
export default {
    SentryVue
}