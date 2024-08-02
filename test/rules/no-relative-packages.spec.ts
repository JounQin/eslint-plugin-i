import path from 'node:path'

import { RuleTester as TSESLintRuleTester } from '@typescript-eslint/rule-tester'

import { test, testFilePath } from '../utils'

import rule from 'eslint-plugin-import-x/rules/no-relative-packages'

const ruleTester = new TSESLintRuleTester()

ruleTester.run('no-relative-packages', rule, {
  valid: [
    test({
      code: 'import foo from "./index.js"',
      filename: testFilePath('./package/index.js'),
    }),
    test({
      code: 'import bar from "../bar"',
      filename: testFilePath('./package/index.js'),
    }),
    test({
      code: 'import {foo} from "a"',
      filename: testFilePath('./package-named/index.js'),
    }),
    test({
      code: 'const bar = require("../bar.js")',
      filename: testFilePath('./package/index.js'),
    }),
    test({
      code: 'const bar = require("../not/a/file/path.js")',
      filename: testFilePath('./package/index.js'),
    }),
    test({
      code: 'import "package"',
      filename: testFilePath('./package/index.js'),
    }),
    test({
      code: 'require("../bar.js")',
      filename: testFilePath('./package/index.js'),
    }),
  ],

  invalid: [
    test({
      code: 'import foo from "./package-named"',
      filename: testFilePath('./bar.js'),
      errors: [
        {
          message:
            'Relative import from another package is not allowed. Use `package-named` instead of `./package-named`',
          line: 1,
          column: 17,
        },
      ],
      output: 'import foo from "package-named"',
    }),
    test({
      code: 'import foo from "../package-named"',
      filename: testFilePath('./package/index.js'),
      errors: [
        {
          message:
            'Relative import from another package is not allowed. Use `package-named` instead of `../package-named`',
          line: 1,
          column: 17,
        },
      ],
      output: 'import foo from "package-named"',
    }),
    test({
      code: 'import foo from "../package-scoped"',
      filename: testFilePath('./package/index.js'),
      errors: [
        {
          message: `Relative import from another package is not allowed. Use \`${path.normalize('@scope/package-named')}\` instead of \`../package-scoped\``,
          line: 1,
          column: 17,
        },
      ],
      output: `import foo from "@scope/package-named"`,
    }),
    test({
      code: 'import bar from "../bar"',
      filename: testFilePath('./package-named/index.js'),
      errors: [
        {
          message: `Relative import from another package is not allowed. Use \`${path.normalize('eslint-plugin-import-x/test/fixtures/bar')}\` instead of \`../bar\``,
          line: 1,
          column: 17,
        },
      ],
      output: `import bar from "eslint-plugin-import-x/test/fixtures/bar"`,
    }),
  ],
})
