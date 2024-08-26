# eslint-plugin-import-x

## 4.1.0

### Minor Changes

- [#122](https://github.com/un-ts/eslint-plugin-import-x/pull/122) [`cd52e86`](https://github.com/un-ts/eslint-plugin-import-x/commit/cd52e86f44754b4dd0c1aae1e9fd5e952e90938f) Thanks [@michaelfaith](https://github.com/michaelfaith)! - Add ESLint flat configuration presets. You can access them with:

  ```ts
  import eslintPluginImportX from "eslint-plugin-import-x";

  eslintPluginImportX.flatConfigs.recommended;
  eslintPluginImportX.flatConfigs.react;
  eslintPluginImportX.flatConfigs.typescript;
  eslintPluginImportX.flatConfigs.electron;
  ```

- [#132](https://github.com/un-ts/eslint-plugin-import-x/pull/132) [`9948c78`](https://github.com/un-ts/eslint-plugin-import-x/commit/9948c7894758dd461f6d75b89c6425fee304789a) Thanks [@SukkaW](https://github.com/SukkaW)! - Added `no-rename-default` that forbid importing a default export by a different name. Originally created by @whitneyit, ported by @SukkaW

## 4.0.0

### Major Changes

- [#112](https://github.com/un-ts/eslint-plugin-import-x/pull/112) [`4ba14da`](https://github.com/un-ts/eslint-plugin-import-x/commit/4ba14daa29100566d468872205c8e5415edb1b69) Thanks [@SukkaW](https://github.com/SukkaW)! - Use typescript-eslint v8. The minimum supported ESLint version is now >= 8.57.0 and the minimum required Node.js version is now 18.18.0.

## 3.1.0

### Minor Changes

- [#116](https://github.com/un-ts/eslint-plugin-import-x/pull/116) [`38aa4cb`](https://github.com/un-ts/eslint-plugin-import-x/commit/38aa4cb8433f24e5772fe1d224265acaedf67343) Thanks [@silverwind](https://github.com/silverwind)! - Add `ignoreUnusedTypeExports` option to `no-unused-modules`

### Patch Changes

- [#118](https://github.com/un-ts/eslint-plugin-import-x/pull/118) [`0307ff2`](https://github.com/un-ts/eslint-plugin-import-x/commit/0307ff2438f9255f95ee4f574f92c1c3b77fda60) Thanks [@SukkaW](https://github.com/SukkaW)! - Reverts #111. The introduction of SCC causes extra overhead that overcomes the early return it introduced.

  A new `no-cycle-next` rule is being implemented using the graph. It won't be backward compatible with the current rule `no-cycle`. The current `no-cycle` rule will become `no-cycle-legacy` in the next major version.

## 3.0.1

### Patch Changes

- [#109](https://github.com/un-ts/eslint-plugin-import-x/pull/109) [`fe3121a`](https://github.com/un-ts/eslint-plugin-import-x/commit/fe3121a2d74db1c2178d1ab189ef59b80c5b90c4) Thanks [@SukkaW](https://github.com/SukkaW)! - Make `eslint-plugin-import-x` overall faster by refactoring the `ExportMap` util

- [#111](https://github.com/un-ts/eslint-plugin-import-x/pull/111) [`5cce946`](https://github.com/un-ts/eslint-plugin-import-x/commit/5cce9461c2863c31af126afb7c59d67deb13a6e7) Thanks [@SukkaW](https://github.com/SukkaW)! - Drastically improve `no-cycle`'s performance by skipping unnecessary BFSes using [Tarjan's SCC](https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm).

- [#109](https://github.com/un-ts/eslint-plugin-import-x/pull/109) [`fe3121a`](https://github.com/un-ts/eslint-plugin-import-x/commit/fe3121a2d74db1c2178d1ab189ef59b80c5b90c4) Thanks [@SukkaW](https://github.com/SukkaW)! - Make `no-cycle` rule faster

## 3.0.0

### Major Changes

- [#106](https://github.com/un-ts/eslint-plugin-import-x/pull/106) [`19f10aa`](https://github.com/un-ts/eslint-plugin-import-x/commit/19f10aac038db3764d2e0af464d7db9821355ea4) Thanks [@SukkaW](https://github.com/SukkaW)! - `eslint-plugin-import-x` is a fork of `eslint-plugin-import` that aims to provide a more performant and more lightweight version of the original plugin.

  Due to the nature of the fork, all `eslint-plugin-import`'s git tags and releases have been copied over to `eslint-plugin-import-x`. This causes version conflicts when publishing new versions of `eslint-plugin-import-x`.

  To prevent this, we have decided to publish a new major version of `eslint-plugin-import-x` that will not conflict with the original `eslint-plugin-import`'s versions.

  See also https://github.com/un-ts/eslint-plugin-import-x/issues/76

### Patch Changes

- [#104](https://github.com/un-ts/eslint-plugin-import-x/pull/104) [`2d45869`](https://github.com/un-ts/eslint-plugin-import-x/commit/2d458695949a3e02792c558dca3caeae7f760fc7) Thanks [@SukkaW](https://github.com/SukkaW)! - Make `no-duplicates` way faster

## 0.5.3

### Patch Changes

- [#101](https://github.com/un-ts/eslint-plugin-import-x/pull/101) [`c0cea7b`](https://github.com/un-ts/eslint-plugin-import-x/commit/c0cea7bd361c02197a9ddfc6cfcf787248df4eda) Thanks [@SukkaW](https://github.com/SukkaW)! - Allow incorrect file path in extraneous deps check

- [#100](https://github.com/un-ts/eslint-plugin-import-x/pull/100) [`293fcf4`](https://github.com/un-ts/eslint-plugin-import-x/commit/293fcf43f30b11b51a6ad320abed23d2139659ba) Thanks [@SukkaW](https://github.com/SukkaW)! - feat: webpack comment regex support `webpackFetchPriority`

- [#85](https://github.com/un-ts/eslint-plugin-import-x/pull/85) [`ded3e80`](https://github.com/un-ts/eslint-plugin-import-x/commit/ded3e80fbf6eb2b4d0211a33c46b63496ddaca07) Thanks [@kosmotema](https://github.com/kosmotema)! - add languageOptions to ChildContext

- [#100](https://github.com/un-ts/eslint-plugin-import-x/pull/100) [`293fcf4`](https://github.com/un-ts/eslint-plugin-import-x/commit/293fcf43f30b11b51a6ad320abed23d2139659ba) Thanks [@SukkaW](https://github.com/SukkaW)! - Allow empty chunk name when webpackMode: 'eager' is set; add suggestions to remove name in eager mode

## 0.5.2

### Patch Changes

- [#93](https://github.com/un-ts/eslint-plugin-import-x/pull/93) [`64bf1a6`](https://github.com/un-ts/eslint-plugin-import-x/commit/64bf1a6be90c54a34115e83894de8b4e57ce6a33) Thanks [@SukkaW](https://github.com/SukkaW)! - fix: enable isolation parsing w/ typescript-eslint v8

## 0.5.1

### Patch Changes

- [#82](https://github.com/un-ts/eslint-plugin-import-x/pull/82) [`e29ba7f`](https://github.com/un-ts/eslint-plugin-import-x/commit/e29ba7fbfadb877b386160d9ecab290ef15fb899) Thanks [@unzico](https://github.com/unzico)! - fix: cannot find module 'tslib'

## 0.5.0

### Minor Changes

- [#66](https://github.com/un-ts/eslint-plugin-import-x/pull/66) [`49418a0`](https://github.com/un-ts/eslint-plugin-import-x/commit/49418a0352e77a88e00c0f4cdb98f87b8d3ab5b1) Thanks [@JounQin](https://github.com/JounQin)! - chore(dep)!: drop eslint <8.56 support

- [#66](https://github.com/un-ts/eslint-plugin-import-x/pull/66) [`49418a0`](https://github.com/un-ts/eslint-plugin-import-x/commit/49418a0352e77a88e00c0f4cdb98f87b8d3ab5b1) Thanks [@JounQin](https://github.com/JounQin)! - feat!: upgrade @typescript-eslint/utils to v7

## 0.4.4

### Patch Changes

- [#67](https://github.com/un-ts/eslint-plugin-import-x/pull/67) [`7a6145c`](https://github.com/un-ts/eslint-plugin-import-x/commit/7a6145c1d6d7fdf8b9610756e6c0bc4aa65ad36d) Thanks [@JounQin](https://github.com/JounQin)! - fix: only add `dependencies` when no `exported` found

## 0.4.3

### Patch Changes

- [#64](https://github.com/un-ts/eslint-plugin-import-x/pull/64) [`b858aee`](https://github.com/un-ts/eslint-plugin-import-x/commit/b858aee6b664be076c2c543543f36e6d9b653497) Thanks [@JounQin](https://github.com/JounQin)! - fix(export-map): incorrect internal `namespaces` info

## 0.4.2

### Patch Changes

- [#62](https://github.com/un-ts/eslint-plugin-import-x/pull/62) [`1dbb323`](https://github.com/un-ts/eslint-plugin-import-x/commit/1dbb323945ffb14332f59c3d17034c11d5ec90fd) Thanks [@JounQin](https://github.com/JounQin)! - feat: use eslint-compat-utils to support eslint v9 (not flat config yet)

## 0.4.1

### Patch Changes

- [#56](https://github.com/un-ts/eslint-plugin-import-x/pull/56) [`843cf49`](https://github.com/un-ts/eslint-plugin-import-x/commit/843cf494e0c58279d310b052c591c6952a024172) Thanks [@JounQin](https://github.com/JounQin)! - fix: known compatibility issues

## 0.4.0

### Minor Changes

- [#54](https://github.com/un-ts/eslint-plugin-import-x/pull/54) [`54d0c95`](https://github.com/un-ts/eslint-plugin-import-x/commit/54d0c95a6543be85094a9d21d07d327dc42e4ab0) Thanks [@JounQin](https://github.com/JounQin)! - chore!: bump node requirement (>=16), enable more lint rules

## 0.3.1

### Patch Changes

- [#51](https://github.com/un-ts/eslint-plugin-import-x/pull/51) [`f4ca4b5`](https://github.com/un-ts/eslint-plugin-import-x/commit/f4ca4b503389ef6aa35bee50452042eee13cf66f) Thanks [@JounQin](https://github.com/JounQin)! - refactor: migrate all remaining rules

- [#48](https://github.com/un-ts/eslint-plugin-import-x/pull/48) [`3d7a551`](https://github.com/un-ts/eslint-plugin-import-x/commit/3d7a551de617188079bf99c9478158adace02fac) Thanks [@JounQin](https://github.com/JounQin)! - refactor: migrate more rules

- [#50](https://github.com/un-ts/eslint-plugin-import-x/pull/50) [`de896f4`](https://github.com/un-ts/eslint-plugin-import-x/commit/de896f46b1e3d3bcc51015d2e0269e6ae80dc87d) Thanks [@JounQin](https://github.com/JounQin)! - refactor: migrate several rules

## 0.3.0

### Minor Changes

- [#42](https://github.com/un-ts/eslint-plugin-import-x/pull/42) [`6ee88e8`](https://github.com/un-ts/eslint-plugin-import-x/commit/6ee88e8b648e6d5b434a5d56d8c04ad41aa3d491) Thanks [@JounQin](https://github.com/JounQin)! - feat!: start TypeScript migration

### Patch Changes

- [#44](https://github.com/un-ts/eslint-plugin-import-x/pull/44) [`bbf46c3`](https://github.com/un-ts/eslint-plugin-import-x/commit/bbf46c302f4f2632e1d4b76c52101c8ed8c469c2) Thanks [@JounQin](https://github.com/JounQin)! - feat: migrate named rule and related usage

- [#45](https://github.com/un-ts/eslint-plugin-import-x/pull/45) [`dc3d48b`](https://github.com/un-ts/eslint-plugin-import-x/commit/dc3d48bb1893d5094c68ed4189029fabe8fe8ef3) Thanks [@JounQin](https://github.com/JounQin)! - refactor: migrate core utils

## 0.2.0

### Minor Changes

- [#38](https://github.com/un-ts/eslint-plugin-import-x/pull/38) [`3a5dab4`](https://github.com/un-ts/eslint-plugin-import-x/commit/3a5dab4b8f79e013016ab51d13b1f220d47fc06b) Thanks [@JounQin](https://github.com/JounQin)! - chore!: bump all upgradable (dev)Dependencies

- [#36](https://github.com/un-ts/eslint-plugin-import-x/pull/36) [`49e3cd2`](https://github.com/un-ts/eslint-plugin-import-x/commit/49e3cd2b1a1448be4db0e645493b5363f9761026) Thanks [@JounQin](https://github.com/JounQin)! - feat!: replace tsconfig-paths with get-tsconfig

### Patch Changes

- [#39](https://github.com/un-ts/eslint-plugin-import-x/pull/39) [`d0d36de`](https://github.com/un-ts/eslint-plugin-import-x/commit/d0d36de6ff4e7a118472eed41c94cef862d1f372) Thanks [@JounQin](https://github.com/JounQin)! - docs: update repository url

## 0.1.1

### Patch Changes

- [#34](https://github.com/un-ts/eslint-plugin-import-x/pull/34) [`a615826`](https://github.com/un-ts/eslint-plugin-import-x/commit/a6158264ce3cba829fe2de51c42a5d5ea042440d) Thanks [@JounQin](https://github.com/JounQin)! - chore: cleanup npm package content

## 0.1.0

### Minor Changes

- [#32](https://github.com/un-ts/eslint-plugin-import-x/pull/32) [`46ee54d`](https://github.com/un-ts/eslint-plugin-import-x/commit/46ee54d04d0eefa3ca0cb15325f547a047172daf) Thanks [@JounQin](https://github.com/JounQin)! - feat!: cleanup deps, remove unnecessary ponyfills
