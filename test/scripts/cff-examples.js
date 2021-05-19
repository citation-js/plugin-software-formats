const { util } = require('@citation-js/core')

async function main () {
  const file = await util.fetchFileAsync('https://raw.githubusercontent.com/citation-file-format/citation-file-format/1.1.0/examples.md')

  const examples = []
  let name = null
  let example = ''
  let inCode = false

  for (const line of file.split('\n')) {
    if (inCode && line === '```') {
      examples.push({ name, example })
      example = ''
      inCode = false
    } else if (inCode) {
      example += line + '\n'
    } else if (line.startsWith('##')) {
      name = line.replace(/^#+\s*/, '')
    } else if (line === '```yaml') {
      inCode = true
    }
  }

  for (const { name, example } of examples) {
    console.log(`{
  name: '${name}',
  example: \`${example.slice(0, -1)}\`
},`)
  }
}

main().catch(console.error)
