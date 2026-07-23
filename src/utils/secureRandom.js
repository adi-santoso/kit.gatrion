export function secureRandomInt(max) {
  if (!Number.isSafeInteger(max) || max <= 0 || max > 0x100000000) {
    throw new RangeError('max must be an integer between 1 and 4294967296')
  }

  const limit = Math.floor(0x100000000 / max) * max
  const values = new Uint32Array(1)
  do {
    crypto.getRandomValues(values)
  } while (values[0] >= limit)
  return values[0] % max
}

export function shuffleSecure(values) {
  for (let index = values.length - 1; index > 0; index--) {
    const swapIndex = secureRandomInt(index + 1)
    ;[values[index], values[swapIndex]] = [values[swapIndex], values[index]]
  }
  return values
}
