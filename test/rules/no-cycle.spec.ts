import { RuleTester as TSESLintRuleTester } from '@typescript-eslint/rule-tester'

import { parsers, test as _test, testFilePath } from '../utils'
import type { ValidTestCase } from '../utils'

import rule from 'eslint-plugin-import-x/rules/no-cycle'

const ruleTester = new TSESLintRuleTester()

const error = (message: string) => ({ message })

const test = <T extends ValidTestCase>(def: T) =>
  _test({
    ...def,
    filename: testFilePath('./cycles/depth-zero.js'),
  })

ruleTester.run('no-cycle', rule, {
  valid: [
    // this rule doesn't care if the cycle length is 0
    test({ code: 'import foo from "./foo.js"' }),

    test({ code: 'import _ from "lodash"' }),
    test({ code: 'import foo from "@scope/foo"' }),
    test({ code: 'var _ = require("lodash")' }),
    test({ code: 'var find = require("lodash.find")' }),
    test({ code: 'var foo = require("./foo")' }),
    test({ code: 'var foo = require("../foo")' }),
    test({ code: 'var foo = require("foo")' }),
    test({ code: 'var foo = require("./")' }),
    test({ code: 'var foo = require("@scope/foo")' }),
    test({ code: 'var bar = require("./bar/index")' }),
    test({ code: 'var bar = require("./bar")' }),
    test({
      code: 'import { foo } from "cycles/external/depth-one"',
      options: [{ ignoreExternal: true }],
      settings: {
        'import-x/resolver': 'webpack',
        'import-x/external-module-folders': ['cycles/external'],
      },
    }),
    test({
      code: 'import { foo } from "./external-depth-two"',
      options: [{ ignoreExternal: true }],
      settings: {
        'import-x/resolver': 'webpack',
        'import-x/external-module-folders': ['cycles/external'],
      },
    }),

    test({
      code: `import { foo } from "./es6/depth-two"`,
      options: [{ maxDepth: 1 }],
    }),
    test({
      code: `import { foo, bar } from "./es6/depth-two"`,
      options: [{ maxDepth: 1 }],
    }),
    test({
      code: `import("./es6/depth-two").then(function({ foo }) {})`,
      options: [{ maxDepth: 1 }],
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: `import type { FooType } from "./es6/depth-one"`,
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: `import type { FooType, BarType } from "./es6/depth-one"`,
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: `function bar(){ return import("./es6/depth-one"); } // #2265 1`,
      options: [{ allowUnsafeDynamicCyclicDependency: true }],
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: `import { foo } from "./es6/depth-one-dynamic"; // #2265 2`,
      options: [{ allowUnsafeDynamicCyclicDependency: true }],
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: `function bar(){ return import("./es6/depth-one"); } // #2265 3`,
      options: [{ allowUnsafeDynamicCyclicDependency: true }],
    }),
    test({
      code: `import { foo } from "./es6/depth-one-dynamic"; // #2265 4`,
      options: [{ allowUnsafeDynamicCyclicDependency: true }],
    }),

    test({
      code: 'import { bar } from "./flow-types"',
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: 'import { bar } from "./flow-types-only-importing-type"',
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: 'import { bar } from "./flow-types-only-importing-multiple-types"',
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: 'import { bar } from "./flow-typeof"',
      languageOptions: { parser: require(parsers.BABEL) },
    }),
  ],

  invalid: [
    test({
      code: 'import { bar } from "./flow-types-some-type-imports"',
      languageOptions: { parser: require(parsers.BABEL) },
      errors: [error(`Dependency cycle detected.`)],
    }),
    test({
      code: 'import { foo } from "cycles/external/depth-one"',
      errors: [error(`Dependency cycle detected.`)],
      settings: {
        'import-x/resolver': 'webpack',
        'import-x/external-module-folders': ['cycles/external'],
      },
    }),
    test({
      code: 'import { foo } from "./external-depth-two"',
      errors: [error(`Dependency cycle via cycles/external/depth-one:1`)],
      settings: {
        'import-x/resolver': 'webpack',
        'import-x/external-module-folders': ['cycles/external'],
      },
    }),

    // Ensure behavior does not change for those tests, with or without
    ...[{}, { allowUnsafeDynamicCyclicDependency: true }].flatMap(opts => [
      test({
        code: `import { foo } from "./es6/depth-one"`,
        options: [{ ...opts }],
        errors: [error(`Dependency cycle detected.`)],
      }),
      test({
        code: `import { foo } from "./es6/depth-one"`,
        options: [{ ...opts, maxDepth: 1 }],
        errors: [error(`Dependency cycle detected.`)],
      }),
      test({
        code: `const { foo } = require("./es6/depth-one")`,
        errors: [error(`Dependency cycle detected.`)],
        options: [{ ...opts, commonjs: true }],
      }),
      test({
        code: `require(["./es6/depth-one"], d1 => {})`,
        errors: [error(`Dependency cycle detected.`)],
        options: [{ ...opts, amd: true }],
      }),
      test({
        code: `define(["./es6/depth-one"], d1 => {})`,
        errors: [error(`Dependency cycle detected.`)],
        options: [{ ...opts, amd: true }],
      }),
      test({
        code: `import { foo } from "./es6/depth-one-reexport"`,
        options: [{ ...opts }],
        errors: [error(`Dependency cycle detected.`)],
      }),
      test({
        code: `import { foo } from "./es6/depth-two"`,
        options: [{ ...opts }],
        errors: [error(`Dependency cycle via ./depth-one:1`)],
      }),
      test({
        code: `import { foo } from "./es6/depth-two"`,
        options: [{ ...opts, maxDepth: 2 }],
        errors: [error(`Dependency cycle via ./depth-one:1`)],
      }),
      test({
        code: `const { foo } = require("./es6/depth-two")`,
        errors: [error(`Dependency cycle via ./depth-one:1`)],
        options: [{ ...opts, commonjs: true }],
      }),
      test({
        code: `import { two } from "./es6/depth-three-star"`,
        options: [{ ...opts }],
        errors: [error(`Dependency cycle via ./depth-two:1=>./depth-one:1`)],
      }),
      test({
        code: `import one, { two, three } from "./es6/depth-three-star"`,
        options: [{ ...opts }],
        errors: [error(`Dependency cycle via ./depth-two:1=>./depth-one:1`)],
      }),
      test({
        code: `import { bar } from "./es6/depth-three-indirect"`,
        options: [{ ...opts }],
        errors: [error(`Dependency cycle via ./depth-two:1=>./depth-one:1`)],
      }),
      test({
        code: `import { bar } from "./es6/depth-three-indirect"`,
        options: [{ ...opts }],
        errors: [error(`Dependency cycle via ./depth-two:1=>./depth-one:1`)],
        languageOptions: { parser: require(parsers.BABEL) },
      }),
      test({
        code: `import { foo } from "./es6/depth-two"`,
        options: [{ ...opts, maxDepth: Number.POSITIVE_INFINITY }],
        errors: [error(`Dependency cycle via ./depth-one:1`)],
      }),
      test({
        code: `import { foo } from "./es6/depth-two"`,
        options: [{ ...opts, maxDepth: '∞' }],
        errors: [error(`Dependency cycle via ./depth-one:1`)],
      }),
    ]),

    test({
      code: `import("./es6/depth-three-star")`,
      errors: [error(`Dependency cycle via ./depth-two:1=>./depth-one:1`)],
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: `import("./es6/depth-three-indirect")`,
      errors: [error(`Dependency cycle via ./depth-two:1=>./depth-one:1`)],
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: `import("./es6/depth-two")`,
      options: [{ maxDepth: Number.POSITIVE_INFINITY }],
      errors: [error(`Dependency cycle via ./depth-one:1`)],
    }),
    test({
      code: `import("./es6/depth-two")`,
      options: [{ maxDepth: '∞' }],
      errors: [error(`Dependency cycle via ./depth-one:1`)],
    }),
    test({
      code: `function bar(){ return import("./es6/depth-one"); } // #2265 5`,
      errors: [error(`Dependency cycle detected.`)],
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      // Dynamic import is not properly caracterized with eslint < 4
      code: `import { foo } from "./es6/depth-one-dynamic"; // #2265 6`,
      errors: [error(`Dependency cycle detected.`)],
      languageOptions: { parser: require(parsers.BABEL) },
    }),
    test({
      code: `function bar(){ return import("./es6/depth-one"); } // #2265 7`,
      errors: [error(`Dependency cycle detected.`)],
    }),
    test({
      code: `import { foo } from "./es6/depth-one-dynamic"; // #2265 8`,
      errors: [error(`Dependency cycle detected.`)],
    }),

    test({
      code: 'import { bar } from "./flow-types-depth-one"',
      languageOptions: { parser: require(parsers.BABEL) },
      errors: [
        error(
          `Dependency cycle via ./flow-types-depth-two:4=>./es6/depth-one:1`,
        ),
      ],
    }),
    test({
      code: 'import { foo } from "./intermediate-ignore"',
      errors: [
        {
          message: 'Dependency cycle via ./ignore:1',
          line: 1,
        },
      ],
    }),
    test({
      code: 'import { foo } from "./ignore"',
      errors: [
        {
          message: 'Dependency cycle detected.',
          line: 1,
        },
      ],
    }),
  ],
})
