/**
 * Scale math shared between generator and configurator.
 */

export const RATIOS = {
  phi: { value: 1.618033988749895, sqrt: 1.2720196495140689, label: 'Golden Ratio (φ)' },
  sqrt2: { value: 1.4142135623730951, sqrt: 1.189207115002721, label: '√2' },
  minor_third: { value: 1.2, sqrt: 1.0954451150103321, label: 'Minor Third (6:5)' },
  major_third: { value: 1.25, sqrt: 1.118033988749895, label: 'Major Third (5:4)' },
  perfect_fourth: { value: 1.3333333333333333, sqrt: 1.1547005383792517, label: 'Perfect Fourth (4:3)' },
  perfect_fifth: { value: 1.5, sqrt: 1.224744871391589, label: 'Perfect Fifth (3:2)' },
} as const

export type RatioName = keyof typeof RATIOS

export function computeStep(base: number, ratio: number, n: number): number {
  return base * Math.pow(ratio, n)
}

export function computeScale(base: number, ratio: number, min: number = -4, max: number = 9) {
  const steps: { index: number; value: number; label: string }[] = []
  for (let n = min; n <= max; n++) {
    steps.push({
      index: n,
      value: computeStep(base, ratio, n),
      label: n < 0 ? `s-n${Math.abs(n)}` : `s-${n}`,
    })
  }
  return steps
}
