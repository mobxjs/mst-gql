# CHANGELOG

## 0.17.0

- Passing the `--header` flag multiple times is now supported
- Download remote schemas using a POST request instead of [Apollo](npmjs.com/package/apollo)
- Add a centralized logger with colour support, toggleable via `--disableLogColors` flag or equivalent config option
- Add a debug mode, toggleable by the `--debug` flag or `DEBUG` environment variable
- Add a `--help` flag and improve the existing help dialog
- Improve CLI experience when user provides no schema
- Re-add support for GraphQL 14 and 15
- Upgrade to React 18
- Switch CI from CircleCI to GitHub Actions

## 0.16.0

- Upgrade graphql package [#367](https://github.com/mobxjs/mst-gql/pull/367) - [beepsoft](https://github.com/beepsoft)
- Add --dynamicArgs option to generate operation arguments dynamically [#363](https://github.com/mobxjs/mst-gql/pull/363) - [beepsoft](https://github.com/beepsoft)
- Field param generation fix [#361](https://github.com/mobxjs/mst-gql/pull/361) - [beepsoft](https://github.com/beepsoft)
- Add failing scaffolding example/test for the problem mentioned in #349 [#360](https://github.com/mobxjs/mst-gql/pull/360) - [beepsoft](https://github.com/beepsoft)

## 0.15.0

- Fix handling of union of root types. [#348](https://github.com/mobxjs/mst-gql/pull/348) - [smokku](https://github.com/smokku)
- Introduced support for AbortController in GraphQL HTTP requests [#355](https://github.com/mobxjs/mst-gql/pull/355) - [wtuminski](https://github.com/wtuminski)
- Added support for field parameters [#349](https://github.com/mobxjs/mst-gql/pull/349) - [smokku](https://github.com/smokku)
- Package version upgrades, fixed TS errors, other bugs [#337](https://github.com/mobxjs/mst-gql/pull/337) - [jkolyer](https://github.com/jkolyer)

## 0.14.1

- Fix 'id' getter MSTGQLRef. [#319](https://github.com/mobxjs/mst-gql/pull/319) - [weglov](https://github.com/weglov)

## 0.14.0

- Fix interface generation/references. [#288](https://github.com/mobxjs/mst-gql/pull/288) - [special-character](https://github.com/special-character)
- Fix ts-node-dev option in example. [#293](https://github.com/mobxjs/mst-gql/pull/293) - [yasinuslu](https://github.com/yasinuslu)
- Add MobX 6 Support. [#294](https://github.com/mobxjs/mst-gql/pull/294) - [BradenM](https://github.com/BradenM)
- Fix for comma between lines importing union types in RootStore.Base.ts. [#300](https://github.com/mobxjs/mst-gql/pull/300) - [emckay](https://github.com/emckay)
- Expose Clients for later initiation. [#303](https://github.com/mobxjs/mst-gql/pull/303) - [BradenM](https://github.com/BradenM)
- Bump node-notifier from 8.0.0 to 8.0.1. [#307](https://github.com/mobxjs/mst-gql/pull/307) - [dependabot](https://github.com/apps/dependabot)
- Fix broken snapshot. [#315](https://github.com/mobxjs/mst-gql/pull/315) - [emckay](https://github.com/emckay)

## 0.13.0

- Fixes `onError` functionality when using subscriptions. [#262](https://github.com/mobxjs/mst-gql/pull/262) - [zpalin](https://github.com/zpalin)
- Fix scaffolding on npm install. [#265](https://github.com/mobxjs/mst-gql/pull/265) - [jvcmanke](https://github.com/jvcmanke)
- Add `clearData` option to query. [#275](https://github.com/mobxjs/mst-gql/pull/275) - [mattiasewers](https://github.com/mattiasewers)
- Fix `Scaffolding references unknown classes` error. [#277](https://github.com/mobxjs/mst-gql/pull/277) - [beepsoft](https://github.com/beepsoft)

## 0.12.5

- Fix running scaffold when installing with npm. [#265](https://github.com/mobxjs/mst-gql/pull/265) - [jvcmanke](https://github.com/jvcmanke)

## 0.12.3

- Add ability to handle errors yourself when using subscriptions. [#261](https://github.com/mobxjs/mst-gql/pull/261) - [zpalin](https://github.com/zpalin)

## 0.12.1

- Support using union types in actions in RootStore.base [#257](https://github.com/mobxjs/mst-gql/pull/257)

## 0.12.0

- Suppot for non-object return values. These currently are not stored in the store automatically. [#246](https://github.com/mobxjs/mst-gql/pull/246)
- Add `Type` suffix to MST enum types to avoid clash with typescript value [#238](https://github.com/mobxjs/mst-gql/pull/238) - [beepsoft](https://github.com/beepsoft)

## 0.11.1

- Reset query error after successful query [#231](https://github.com/mobxjs/mst-gql/pull/231) - [reekris](https://github.com/reekris)
- Add typescript enums for actions [#233](https://github.com/mobxjs/mst-gql/pull/233) - [special-character](https://github.com/special-character)

## 0.11.0

- Adds support for --header flag to CLI. [#209](https://github.com/mobxjs/mst-gql/pull/209) - [mwarger](https://github.com/mwarger)
- Update `localStorageMixin` to prevent stale local data. [#225](https://github.com/mobxjs/mst-gql/pull/225) - [special-character](https://github.com/special-character)

## 0.9.0 / 0.10.0

- Enum's no longer get Model added to their name. This is a small breaking change from 0.8.0.

#### **⚠️ Note**

mst-gql now generates model names matching JS conventions by default. If you are upgrading from a pre-0.8.0 release this may result in different names being geneated when you scaffold. If you don't wish to update your names or want to wait, use the new `--dontRenameModels` option to keep your current model names.

## 0.8.0

- Allow LIST to be optional in TS. [174](https://github.com/mobxjs/mst-gql/pull/174) - [Aryk](https://github.com/Aryk)
- Generate model names that match JS conventions by default, add escape hatch option to opt-out - [155](https://github.com/mobxjs/mst-gql/pull/155) - [beepsoft](https://github.com/beepsoft)
- Better error handling around reserved model names. [192](https://github.com/mobxjs/mst-gql/pull/192) - [Matth10](https://github.com/Matth10)
- Remove example project `yarn.lock` files to reduce the "github auto PR" noise.

#### **⚠️ Note**

mst-gql now generates model names matching JS conventions by default. If you are upgrading from a pre-0.8.0 release this may result in different names being geneated when you scaffold. If you don't wish to update your names or want to wait, use the new `--dontRenameModels` option to keep your current model names.

## 0.7.1

- update how optional types are generated. [150](https://github.com/mobxjs/mst-gql/pull/150)

## 0.7.0

- 🎉 add new code to fix circular ref issues in typescript code. [#140](https://github.com/mobxjs/mst-gql/pull/140) - [godness84](https://github.com/godness84)

## 0.6.0

- add a new `ModelBase` file that all models extend that can be edited. [#106](https://github.com/mobxjs/mst-gql/pull/106) - [zenflow](https://github.com/zenflow)
- CLI alert on unexpected files in `models` folder. [#113](https://github.com/mobxjs/mst-gql/pull/113) - [RXminuS](https://github.com/RXminuS)
- Use undefined to mean not loaded, use null to mean gql null [#102](https://github.com/mobxjs/mst-gql/pull/102) - [zenflow](https://github.com/zenflow)

## 0.5.0

- Update example 5. [#93](https://github.com/mobxjs/mst-gql/pull/93) thanks [zenflow](https://github.com/zenflow)!
- Stop generating input types when format is `js`. [#96](https://github.com/mobxjs/mst-gql/pull/96)
- Drop the `raw` option for queries [#103](https://github.com/mobxjs/mst-gql/pull/103) - [zenflow](https://github.com/zenflow)
- Deduplicate identical concurrent query requests [#100](https://github.com/mobxjs/mst-gql/pull/100) - [zenflow](https://github.com/zenflow)

## 0.4.1

- stop removing related fields with args. [#86](https://github.com/mobxjs/mst-gql/pull/86) by [beepsoft](https://github.com/beepsoft)
- further updates on type for `data` from `userQuery` [#89](https://github.com/mobxjs/mst-gql/pull/89) by [mattiasewers](https://github.com/mattiasewers)

## 0.4.0

- update example 1, 2, 3, and 5 so they run [#69](https://github.com/mobxjs/mst-gql/pull/64) by [mweststrate](https://github.com/mweststrate) / [chrisdrackett](https://github.com/chrisdrackett)
- Fixed generated types for all queries and helpers [#69](https://github.com/mobxjs/mst-gql/pull/64) by [mweststrate](https://github.com/mweststrate)
- Fixed generation of input types [#69](https://github.com/mobxjs/mst-gql/pull/64) by [mweststrate](https://github.com/mweststrate)
- Fixed generation for recursive types [#69](https://github.com/mobxjs/mst-gql/pull/64) by [mweststrate](https://github.com/mweststrate)

**Note**

This release has changed how the user editable model files are generated when using typescript.

See https://github.com/mobxjs/mst-gql/pull/76/commits/6d98650f82934fdd47a6cf998119560ca306823c for an example of migrating these files to the new version.

## 0.3.5

- fix types on `data` returned from `userQuery` to match the shape of data. Thanks [mattiasewers](https://github.com/mattiasewers) for [#77](https://github.com/mobxjs/mst-gql/pull/77) and [#81](https://github.com/mobxjs/mst-gql/pull/81)

## 0.3.4

- fix `promise.finally` issue that caused an error when used in react-native, see [#79](https://github.com/mobxjs/mst-gql/pull/79) by [chrisdrackett](https://github.com/chrisdrackett)

## 0.3.3

- update `localStorageMixin` to support being used with react native, see [#64](https://github.com/mobxjs/mst-gql/pull/64) by [chrisdrackett](https://github.com/chrisdrackett)

## 0.3.0

- switch from `maybe` to `maybeNull` to better match graphql standards, see [#52](https://github.com/mobxjs/mst-gql/pull/52) by [pvpshoot](https://github.com/pvpshoot)
- add better support for enums in typescript [#56](https://github.com/mobxjs/mst-gql/pull/56), [#58](https://github.com/mobxjs/mst-gql/pull/58) by [chrisdrackett](https://github.com/chrisdrackett)
- support for outputting into folders vs. flat [#60](https://github.com/mobxjs/mst-gql/pull/60) by [Zyc0017](https://github.com/Zyc0017)
- added support for using a config file [#14](https://github.com/mobxjs/mst-gql/pull/14) by [JoviDeCroock](https://github.com/JoviDeCroock)

## 0.2.0

- support input types, see [#36](https://github.com/mobxjs/mst-gql/pull/36) by [elie222](https://github.com/elie222)
- support interface and union field types, see [#23](https://github.com/mobxjs/mst-gql/pull/23) by [dpnolte](https://github.com/dpnolte)
