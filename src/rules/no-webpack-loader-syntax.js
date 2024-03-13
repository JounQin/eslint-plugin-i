import { moduleVisitor } from '../utils/module-visitor'
import { docsUrl } from '../docs-url'

function reportIfNonStandard(context, node, name) {
  if (name && name.indexOf('!') !== -1) {
    context.report(
      node,
      `Unexpected '!' in '${name}'. Do not use import syntax to configure webpack loaders.`,
    )
  }
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      category: 'Static analysis',
      description: 'Forbid webpack loader syntax in imports.',
      url: docsUrl('no-webpack-loader-syntax'),
    },
    schema: [],
  },

  create(context) {
    return moduleVisitor(
      (source, node) => {
        reportIfNonStandard(context, node, source.value)
      },
      { commonjs: true },
    )
  },
}
