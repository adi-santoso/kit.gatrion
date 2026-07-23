export const MAX_REGEX_LENGTH = 500
export const MAX_TEST_STRING_LENGTH = 100_000
export const MAX_REGEX_MATCHES = 10_000

export function findRegexMatches(pattern, flags, input) {
  if (!pattern) return []
  if (pattern.length > MAX_REGEX_LENGTH) throw new Error(`Pattern cannot exceed ${MAX_REGEX_LENGTH} characters.`)
  if (input.length > MAX_TEST_STRING_LENGTH) throw new Error(`Test string cannot exceed ${MAX_TEST_STRING_LENGTH.toLocaleString()} characters.`)

  const regex = new RegExp(pattern, flags)
  const matches = []

  if (!regex.global) {
    const match = regex.exec(input)
    return match ? [{ match: match[0], index: match.index }] : []
  }

  for (const match of input.matchAll(regex)) {
    matches.push({ match: match[0], index: match.index })
    if (matches.length >= MAX_REGEX_MATCHES) break
  }
  return matches
}

export function splitHighlightedText(input, matches) {
  const parts = []
  let lastIndex = 0

  matches.forEach(({ match, index }, matchIndex) => {
    if (index > lastIndex) parts.push({ text: input.slice(lastIndex, index), highlighted: false, key: `text-${matchIndex}` })
    parts.push({ text: match, highlighted: true, key: `match-${matchIndex}` })
    lastIndex = index + match.length
  })
  if (lastIndex < input.length) parts.push({ text: input.slice(lastIndex), highlighted: false, key: 'text-last' })
  return parts
}
