/**
 *
 * @author fuyg
 * @date  2020-08-21
 */

import gemoji from './libs/gemoji/index.json'
import * as fs from 'fs'

const counter: { [key: string]: number } = {}
const lineBreak = '\r\n'

function createEmojiSnippet(
  emoji: string,
  name: string,
  description: string,
  isTag = false,
): string[] {
  if (!counter[name]) {
    counter[name] = 0
  } else {
    counter[name] += 1
  }
  const theCounter = counter[name]
  const theName = theCounter > 0 ? `${name}${theCounter}` : name
  const lines = [
    '',
    isTag ? '# tag ' : '# name',
    `snippet emj${theName} "emoji ${emoji}: ${description}"`,
    `${emoji}`,
    `endsnippet`,
  ]
  return lines
}

function createEmojiSnippetAll(): string {
  const snippets: Array<string[]> = []
  gemoji.forEach((item) => {
    const { names, tags, emoji, description } = item
    names.forEach((name) => {
      const snippet = createEmojiSnippet(emoji, name, description)
      snippets.push(snippet)
    })
    tags.forEach((tag) => {
      const snippet = createEmojiSnippet(emoji, tag, description, true)
      snippets.push(snippet)
    })
  })

  console.log(`create ${snippets.length} snippets`)

  const lines = snippets.map((item) => {
    return item.join(lineBreak)
  })
  lines.unshift('# This file is generated, do not modified')
  const content = lines.join(lineBreak)
  return content
}

let snippets = createEmojiSnippetAll()
fs.writeFileSync('./UltiSnips/all.snippets', snippets)
process.exit()
