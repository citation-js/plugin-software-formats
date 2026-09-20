import type { CSL } from '@citation-js/core'

interface Config {
  setApiToken (token: string): void
}

interface Package {
  name: string
  description: string
  homepage: string
  author: { name: string }
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@npm/url': (input: string) => string
        '@npm/api': (input: string) => Package
        '@npm/object': (input: Package) => Array<CSL>
      }
    }
  }
}
