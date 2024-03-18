/**
 * tests that require fully booting up ESLint
 */
import path from 'path'

import { ESLint } from 'eslint'
import eslintPkg from 'eslint/package.json'
import semver from 'semver'

import importPlugin from 'eslint-plugin-import-x'

describe('CLI regression tests', () => {
  describe('issue #210', () => {
    it("doesn't throw an error on gratuitous, erroneous self-reference", () => {
      const eslint = new ESLint({
        useEslintrc: false,
        overrideConfigFile: './test/fixtures/issue210.config.js',
        rulePaths: ['./src/rules'],
        overrideConfig: {
          rules: {
            named: 2,
          },
        },
        plugins: {
          // @ts-expect-error - incompatible types
          'eslint-plugin-import-x': importPlugin,
        },
      })
      return eslint.lintFiles(['./test/fixtures/issue210.js'])
    })
  })

  describe('issue #1645', () => {
    it('throws an error on invalid JSON', async () => {
      const invalidJSON = './test/fixtures/just-json-files/invalid.json'
      const eslint = new ESLint({
        useEslintrc: false,
        overrideConfigFile: './test/fixtures/just-json-files/.eslintrc.json',
        rulePaths: ['./src/rules'],
        ignore: false,
        plugins: {
          // @ts-expect-error - incompatible types
          'eslint-plugin-import-x': importPlugin,
        },
      })
      const results = await eslint.lintFiles([invalidJSON])
      expect(results).toEqual([
        {
          filePath: path.resolve(invalidJSON),
          messages: [
            {
              column: 2,
              endColumn: 3,
              endLine: 1,
              line: 1,
              message: 'Expected a JSON object, array or literal.',
              nodeType: results[0].messages[0].nodeType, // we don't care about this one
              ruleId: 'json/*',
              severity: 2,
              source: results[0].messages[0].source, // NewLine-characters might differ depending on git-settings
            },
          ],
          errorCount: 1,
          ...(semver.satisfies(eslintPkg.version, '>= 7.32 || ^8.0.0') && {
            fatalErrorCount: 0,
          }),
          warningCount: 0,
          fixableErrorCount: 0,
          fixableWarningCount: 0,
          source: results[0].source, // NewLine-characters might differ depending on git-settings
          ...(semver.satisfies(eslintPkg.version, '>= 8.8') && {
            suppressedMessages: [],
          }),
          usedDeprecatedRules: results[0].usedDeprecatedRules, // we don't care about this one
        },
      ])
    })
  })
})
