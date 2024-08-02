import { RuleTester as TSESLintRuleTester } from '@typescript-eslint/rule-tester'

import { test, parsers } from '../utils'

import rule from 'eslint-plugin-import-x/rules/max-dependencies'

const ruleTester = new TSESLintRuleTester()

ruleTester.run('max-dependencies', rule, {
  valid: [
    test({ code: 'import "./foo.js"' }),

    test({
      code: 'import "./foo.js"; import "./bar.js";',
      options: [
        {
          max: 2,
        },
      ],
    }),

    test({
      code: 'import "./foo.js"; import "./bar.js"; const a = require("./foo.js"); const b = require("./bar.js");',
      options: [
        {
          max: 2,
        },
      ],
    }),

    test({ code: 'import {x, y, z} from "./foo"' }),
  ],
  invalid: [
    test({
      code: "import { x } from './foo'; import { y } from './foo'; import {z} from './bar';",
      options: [
        {
          max: 1,
        },
      ],
      errors: ['Maximum number of dependencies (1) exceeded.'],
    }),

    test({
      code: "import { x } from './foo'; import { y } from './bar'; import { z } from './baz';",
      options: [
        {
          max: 2,
        },
      ],
      errors: ['Maximum number of dependencies (2) exceeded.'],
    }),

    test({
      code: "import { x } from './foo'; require(\"./bar\"); import { z } from './baz';",
      options: [
        {
          max: 2,
        },
      ],
      errors: ['Maximum number of dependencies (2) exceeded.'],
    }),

    test({
      code: 'import { x } from \'./foo\'; import { z } from \'./foo\'; require("./bar"); const path = require("path");',
      options: [
        {
          max: 2,
        },
      ],
      errors: ['Maximum number of dependencies (2) exceeded.'],
    }),

    test({
      code: "import type { x } from './foo'; import type { y } from './bar'",
      languageOptions: { parser: require(parsers.BABEL) },
      options: [
        {
          max: 1,
        },
      ],
      errors: ['Maximum number of dependencies (1) exceeded.'],
    }),

    test({
      code: "import type { x } from './foo'; import type { y } from './bar'; import type { z } from './baz'",
      languageOptions: { parser: require(parsers.BABEL) },
      options: [
        {
          max: 2,
          ignoreTypeImports: false,
        },
      ],
      errors: ['Maximum number of dependencies (2) exceeded.'],
    }),
  ],
})

describe('TypeScript', () => {
  ruleTester.run('max-dependencies', rule, {
    valid: [
      test({
        code: "import type { x } from './foo'; import { y } from './bar';",

        options: [
          {
            max: 1,
            ignoreTypeImports: true,
          },
        ],
      }),
    ],
    invalid: [
      test({
        code: "import type { x } from './foo'; import type { y } from './bar'",

        options: [
          {
            max: 1,
          },
        ],
        errors: ['Maximum number of dependencies (1) exceeded.'],
      }),

      test({
        code: "import type { x } from './foo'; import type { y } from './bar'; import type { z } from './baz'",

        options: [
          {
            max: 2,
            ignoreTypeImports: false,
          },
        ],
        errors: ['Maximum number of dependencies (2) exceeded.'],
      }),
    ],
  })
})
