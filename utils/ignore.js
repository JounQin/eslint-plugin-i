'use strict'

exports.__esModule = true

const { extname } = require('path')

const log = require('debug')('eslint-plugin-i:utils:ignore')

// one-shot memoized
let cachedSet
let lastSettings
function validExtensions(context) {
  if (cachedSet && context.settings === lastSettings) {
    return cachedSet
  }

  lastSettings = context.settings
  cachedSet = makeValidExtensionSet(context.settings)
  return cachedSet
}

function makeValidExtensionSet(settings) {
  // start with explicit JS-parsed extensions
  const exts = new Set(settings['i/extensions'] || ['.js'])

  // all alternate parser extensions are also valid
  if ('i/parsers' in settings) {
    for (const parser in settings['i/parsers']) {
      const parserSettings = settings['i/parsers'][parser]
      if (!Array.isArray(parserSettings)) {
        throw new TypeError('"settings" for ' + parser + ' must be an array')
      }
      parserSettings.forEach(ext => exts.add(ext))
    }
  }

  return exts
}
exports.getFileExtensions = makeValidExtensionSet

exports.default = function ignore(path, context) {
  // check extension whitelist first (cheap)
  if (!hasValidExtension(path, context)) {
    return true
  }

  if (!('i/ignore' in context.settings)) {
    return false
  }
  const ignoreStrings = context.settings['i/ignore']

  for (let i = 0; i < ignoreStrings.length; i++) {
    const regex = new RegExp(ignoreStrings[i])
    if (regex.test(path)) {
      log(`ignoring ${path}, matched pattern /${ignoreStrings[i]}/`)
      return true
    }
  }

  return false
}

function hasValidExtension(path, context) {
  return validExtensions(context).has(extname(path))
}
exports.hasValidExtension = hasValidExtension
