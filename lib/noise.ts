/** Hashes a string to a 32-bit integer seed. */
export function hashSeed(seed: string): number {
  let hash = 2166136261
  for (let index = 0; index < seed.length; index++) {
    hash ^= seed.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function latticeValue(seed: number, x: number, y: number): number {
  let hash = seed ^ Math.imul(x, 374761393) ^ Math.imul(y, 668265263)
  hash = Math.imul(hash ^ (hash >>> 13), 1274126177)
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967296
}

function quinticFade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function valueNoise(seed: number, x: number, y: number): number {
  const x0 = Math.floor(x)
  const y0 = Math.floor(y)
  const tx = quinticFade(x - x0)
  const ty = quinticFade(y - y0)
  const top =
    latticeValue(seed, x0, y0) * (1 - tx) + latticeValue(seed, x0 + 1, y0) * tx
  const bottom =
    latticeValue(seed, x0, y0 + 1) * (1 - tx) +
    latticeValue(seed, x0 + 1, y0 + 1) * tx
  return top * (1 - ty) + bottom * ty
}

/** Upper bound of {@link fractalNoise}; its lower bound is 0. */
export const FRACTAL_NOISE_MAX = 0.6 + 0.6 * 0.35 + 0.6 * 0.35 * 0.35

/** Smooth, deterministic 2D value noise with three octaves. */
export function fractalNoise(seed: number, x: number, y: number): number {
  let total = 0
  let amplitude = 0.6
  let frequency = 1
  for (let octave = 0; octave < 3; octave++) {
    total +=
      amplitude * valueNoise(seed + octave * 7919, x * frequency, y * frequency)
    amplitude *= 0.35
    frequency *= 2.1
  }
  return total
}
