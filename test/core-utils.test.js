import test from 'node:test'
import assert from 'node:assert/strict'
import { findRegexMatches, splitHighlightedText } from '../src/utils/regexMatches.js'
import { validateCanvasDimensions, validateResourceFile } from '../src/utils/imageResourceValidation.js'
import { secureRandomInt, shuffleSecure } from '../src/utils/secureRandom.js'

test('regex matching supports global and non-global flags', () => {
  assert.deepEqual(findRegexMatches('a', 'g', 'banana'), [
    { match: 'a', index: 1 },
    { match: 'a', index: 3 },
    { match: 'a', index: 5 },
  ])
  assert.deepEqual(findRegexMatches('a', 'i', 'Banana'), [{ match: 'a', index: 1 }])
})

test('highlight output remains text, not HTML', () => {
  assert.deepEqual(splitHighlightedText('<img onerror=x>', [{ match: 'img', index: 1 }]), [
    { text: '<', highlighted: false, key: 'text-0' },
    { text: 'img', highlighted: true, key: 'match-0' },
    { text: ' onerror=x>', highlighted: false, key: 'text-last' },
  ])
})

test('secure random values stay in range and shuffle preserves values', () => {
  for (let index = 0; index < 100; index++) assert.ok(secureRandomInt(7) >= 0 && secureRandomInt(7) < 7)
  assert.deepEqual(shuffleSecure(['a', 'b', 'c']).sort(), ['a', 'b', 'c'])
  assert.throws(() => secureRandomInt(0), RangeError)
})

test('image resource validation enforces boundaries', () => {
  assert.doesNotThrow(() => validateResourceFile({ name: 'ok.png', size: 10, type: 'image/png' }, { image: true }))
  assert.throws(() => validateResourceFile({ name: 'bad.txt', size: 10, type: 'text/plain' }, { image: true }))
  assert.doesNotThrow(() => validateCanvasDimensions(8192, 8192))
  assert.throws(() => validateCanvasDimensions(8193, 1))
})
