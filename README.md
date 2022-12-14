# eft-sentry

&nbsp;

# Install

```bash
npm install eft-sentry  --save

# or

yarn add eft-sentry
```

&nbsp;

## Use

| Export Module |      Quick Link      |
| :-----------: | :------------------: |
|      Vue      |     [Jump](#vue)     |
|    Vanilla    |   [Jump](#vanilla)   |
|     React     |    [Jump](#react)    |
| React Native  | [Jump](#reactnative) |
|   Souce Map   |  [Jump](#soucemap)   |

&nbsp;

# Vue

```javascript
// 默认情况是Vue3
import { SentryVue } from 'eft-sentry'
import { createApp} from 'vue'
import router from "./router";
const app = createApp(...);
// 直接实例化可以获得更好的类型支持
new SentryVue({
    app,
    router,
    env: process.env,
    config: {
        dsn: "xxxx",
        Blacklist: [],
    }
})
// 为vue的plugin添加了接口，所以可以使用app.use的方式;
app.use(SentryVue, {
    router,
    env: process.env,
    config: {
        dsn: "xxxx",
        Blacklist: [],
    }
})

// 在vue2中使用需要在option中加入isVue2: true
new SentryVue({
    ...
    env: process.env,
    isVue2: true,
    ...
})
```

## SentryVue static

> SentryVue 中的静态方法和变量

### **`SentryVue.install`**

Vue plugin install 用于app.use

### **`SentryVue.send && SentryVue.msg`**

用于主动发送错误信息,

TODO 没发现两者区别需要再研究

```typescript
SentryVue.send(error,{ extra, tags, level, hint ....})
SentryVue.msg(error,{ extra, tags, level, hint ....})
```

&nbsp;

&nbsp;

## SentryVue options

```javascript
new SentryVue(options);
SentryVue.install(app: Vue, option: Omit<SENTRY_PROPS, "app">);
```

### **`options.app`**

options.app : Vue | Vue[];

在Vue3中可传入多个Vue实例，但是在Vue2中只能传入一个Vue实例

### **`options.router`**

Vue router

### **`options.isDev`**

如果是本地环境，会跳过sentry的初始化,比如 用yarn dev 这种本地命令启动的环境

### **`options.env`**(0.1.1之后废弃， 不同版本的打包工具会有不同的环境变量，直接删除掉)

用到的两个属性`npm_lifecycle_event`和`NODE_ENV`

`npm_lifecycle_event`如果是`dev`会跳过sentry的初始化

`NODE_ENV`作为副选来判断sentey的收集的环境, 初始化首选`options.config.environment`

如果两个都没有，会默认为生产环境

### **`options.config`**

```TypeScript
interface config = {
    dsn: string; // sentry dsn;
    environment?: string; // sentry environment  默认为 production;
    Blacklist: Array<string | RegExp>; // 域名黑明名单, 用于过滤不需要收集的域名;
    tracesSampleRate: number; // 取值 0-1 之间的数值 表示采样率 1为100% 0为0%(不会发送) 默认为1;
}
```

### **`options.isVue2`**

是否是Vue2

&nbsp;

# Vanilla

> TODO ...

&nbsp;

# ReactNative

> TODO ...

&nbsp;

# React

> TODO ...

# soucemap

```bash
# install 
npm install @sentry/cli -g
```

在项目根目录创建 `.sentryclirc`文件

```rc
[defaults]
url=https://sentry.io/
org=eft-sc
project=PROJECT_NAME
[auth]
token=PROJECT_AUTH_TOKEN
```

```bash
# 清除版本号的sourcemap
sentry-cli releases files <版本号> delete --all
# 上传
sentry-cli releases [-o 组织名] [-p 项目名] files <版本号> upload-sourcemaps <打包后的js目录> --url-prefix <线上js访问地址>
```
