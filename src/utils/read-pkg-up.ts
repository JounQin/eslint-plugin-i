import fs from 'node:fs'

import type { PackageJson } from 'type-fest'

import { pkgUp } from './pkg-up'

function stripBOM(str: string) {
  return str.replace(/^\uFEFF/, '')
}

// eslint-disable-next-line eslint-plugin/require-meta-docs-description, eslint-plugin/require-meta-type, eslint-plugin/prefer-message-ids, eslint-plugin/prefer-object-rule, eslint-plugin/require-meta-schema
export function readPkgUp(opts?: { cwd?: string }) {
  const fp = pkgUp(opts)

  if (!fp) {
    return {}
  }

  try {
    return {
      pkg: JSON.parse(
        stripBOM(fs.readFileSync(fp, { encoding: 'utf8' })),
      ) as PackageJson & {
        name: string
      },
      path: fp,
    }
  } catch {
    return {}
  }
}
