import { RuleTester } from 'eslint'

import rule from 'eslint-plugin-i/rules/no-amd'

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2023, sourceType: 'module' },
})

ruleTester.run('no-amd', rule, {
  valid: [
    {
      code: 'import "x";',
      parserOptions: { ecmaVersion: 2023, sourceType: 'module' },
    },
    {
      code: 'import x from "x"',
      parserOptions: { ecmaVersion: 2023, sourceType: 'module' },
    },
    'var x = require("x")',

    'require("x")',
    // 2-args, not an array
    'require("x", "y")',
    // random other function
    'setTimeout(foo, 100)',
    // non-identifier callee
    '(a || b)(1, 2, 3)',

    // nested scope is fine
    'function x() { define(["a"], function (a) {}) }',
    'function x() { require(["a"], function (a) {}) }',

    // unmatched arg types/number
    'define(0, 1, 2)',
    'define("a")',
  ],
  invalid: [
    {
      code: 'define([], function() {})',
      errors: [{ message: 'Expected imports instead of AMD define().' }],
    },
    {
      code: 'define(["a"], function(a) { console.log(a); })',
      errors: [{ message: 'Expected imports instead of AMD define().' }],
    },
    {
      code: 'require([], function() {})',
      errors: [{ message: 'Expected imports instead of AMD require().' }],
    },
    {
      code: 'require(["a"], function(a) { console.log(a); })',
      errors: [{ message: 'Expected imports instead of AMD require().' }],
    },
  ],
})
