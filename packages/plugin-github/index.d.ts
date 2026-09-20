import type { CSL } from '@citation-js/core'

interface Config {
  setApiToken (token: string): void
}

interface Repository {
  name: string
  full_name: string
  description: string
  html_url: string
  pushed_at: string
  contributors_url: string
}

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@github/url': (input: string) => string
        '@github/api': (input: string) => Repository
        '@github/object': (input: Repository) => Array<CSL>
      }
    }

    namespace config {
      export function get (ref: '@github'): Config
    }
  }
}
