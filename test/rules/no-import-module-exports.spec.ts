import path from 'node:path'

import { TSESLint } from '@typescript-eslint/utils'

import { test } from '../utils'

import rule from 'eslint-plugin-import-x/rules/no-import-module-exports'

const ruleTester = new TSESLint.RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
})

const error = {
  messageId: 'notAllowed',
  type: 'ImportDeclaration',
} as const

ruleTester.run('no-import-module-exports', rule, {
  valid: [
    test({
      code: `
        const thing = require('thing')
        module.exports = thing
      `,
    }),
    test({
      code: `
        import thing from 'otherthing'
        console.log(thing.module.exports)
      `,
    }),
    test({
      code: `
        import thing from 'other-thing'
        export default thing
      `,
    }),
    test({
      code: `
        const thing = require('thing')
        exports.foo = bar
      `,
    }),
    test({
      code: `
        import { module } from 'qunit'
        module.skip('A test', function () {})
      `,
    }),
    test({
      code: `
        import foo from 'path';
        module.exports = foo;
      `,
      // When the file matches the entry point defined in package.json
      // See test/fixtures/package.json
      filename: path.resolve('test/fixtures/index.js'),
    }),
    test({
      code: `
        import foo from 'path';
        module.exports = foo;
      `,
      filename: path.join(
        process.cwd(),
        'test/fixtures/some/other/entry-point.js',
      ),
      options: [{ exceptions: ['**/*/other/entry-point.js'] }],
    }),
    test({
      code: `
        import * as process from 'process';
        console.log(process.env);
      `,
      filename: path.join(
        process.cwd(),
        'test/fixtures/missing-entrypoint/cli.js',
      ),
    }),
    test({
      code: `
        import fs from 'fs/promises';

        const subscriptions = new Map();

        export default async (client) => {
            /**
             * loads all modules and their subscriptions
             */
            const modules = await fs.readdir('./src/modules');

            await Promise.all(
                modules.map(async (moduleName) => {
                    // Loads the module
                    const module = await import(\`./modules/\${moduleName}/module.js\`);
                    // skips the module, in case it is disabled.
                    if (module.enabled) {
                        // Loads each of it's subscriptions into their according list.
                        module.subscriptions.forEach((fun, event) => {
                            if (!subscriptions.has(event)) {
                                subscriptions.set(event, []);
                            }
                            subscriptions.get(event).push(fun);
                        });
                    }
                })
            );

            /**
             * Setting up all events.
             * binds all events inside the subscriptions map to call all functions provided
             */
            subscriptions.forEach((funs, event) => {
                client.on(event, (...args) => {
                    funs.forEach(async (fun) => {
                        try {
                            await fun(client, ...args);
                        } catch (e) {
                            client.emit('error', e);
                        }
                    });
                });
            });
        };
      `,
      parserOptions: {
        ecmaVersion: 2020,
      },
    }),
  ],
  invalid: [
    test({
      code: `
        import { stuff } from 'starwars'
        module.exports = thing
      `,
      errors: [error],
    }),
    test({
      code: `
        import thing from 'starwars'
        const baz = module.exports = thing
        console.log(baz)
      `,
      errors: [error],
    }),
    test({
      code: `
        import * as allThings from 'starwars'
        exports.bar = thing
      `,
      errors: [error],
    }),
    test({
      code: `
        import thing from 'other-thing'
        exports.foo = bar
      `,
      errors: [error],
    }),
    test({
      code: `
        import foo from 'path';
        module.exports = foo;
      `,
      filename: path.resolve('test/fixtures/some/other/entry-point.js'),
      options: [{ exceptions: ['**/*/other/file.js'] }],
      errors: [error],
    }),
  ],
})
