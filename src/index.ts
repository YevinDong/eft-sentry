import { version } from "../package.json"
console.log(`✅ eft-web3 version: v${version}`);

import _SentryVue from "./vue";
export const SentryVue = _SentryVue;
export default {
    SentryVue
}