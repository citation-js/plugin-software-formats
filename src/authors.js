import { parse as parseName } from '@citation-js/name'

export function parse (file) {
  const authors = []

  for (const line of file.trim().split(/\r?\n/g)) {
    if (line.startsWith('#')) continue

    const [, name, _email, _url] = line.match(/^.+(?: <(.+)>)?(?: \((.+)\))?/)

    authors.push({
      ...parseName(name),
      _email,
      _url
    })
  }
}
