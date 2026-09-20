import '@citation-js/core'

declare module '@citation-js/core' {
  namespace plugins {
    namespace input {
      interface Formats {
        '@else/yaml': (input: string) => object
      }
    }

    namespace output {
      interface Formats {
        yaml: () => string
      }
    }
  }
}
