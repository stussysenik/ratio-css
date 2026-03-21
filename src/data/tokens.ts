/**
 * Token registry — all CSS custom properties with metadata.
 */

export interface Token {
  name: string
  value: string
  formula?: string
  category: string
  description: string
}

export const scaleTokens: Token[] = [
  { name: '--base', value: '1rem', category: 'config', description: 'Base unit for the geometric scale' },
  { name: '--ratio', value: '1.618', category: 'config', description: 'Scale ratio (default: golden ratio φ)' },
  { name: '--sqrt-ratio', value: '1.272', category: 'config', description: 'Pre-computed √ratio for CSS calc()' },
  { name: '--s-n4', value: '0.146rem', formula: 'base / ratio⁴', category: 'scale', description: 'Scale step -4 (smallest)' },
  { name: '--s-n3', value: '0.236rem', formula: 'base / ratio³', category: 'scale', description: 'Scale step -3' },
  { name: '--s-n2', value: '0.382rem', formula: 'base / ratio²', category: 'scale', description: 'Scale step -2' },
  { name: '--s-n1', value: '0.618rem', formula: 'base / ratio', category: 'scale', description: 'Scale step -1' },
  { name: '--s-0', value: '1.000rem', formula: 'base', category: 'scale', description: 'Scale step 0 (base)' },
  { name: '--s-1', value: '1.618rem', formula: 'base × ratio', category: 'scale', description: 'Scale step 1' },
  { name: '--s-2', value: '2.618rem', formula: 'base × ratio²', category: 'scale', description: 'Scale step 2' },
  { name: '--s-3', value: '4.236rem', formula: 'base × ratio³', category: 'scale', description: 'Scale step 3' },
  { name: '--s-4', value: '6.854rem', formula: 'base × ratio⁴', category: 'scale', description: 'Scale step 4' },
  { name: '--s-5', value: '11.090rem', formula: 'base × ratio⁵', category: 'scale', description: 'Scale step 5' },
  { name: '--s-6', value: '17.944rem', formula: 'base × ratio⁶', category: 'scale', description: 'Scale step 6' },
  { name: '--s-7', value: '29.034rem', formula: 'base × ratio⁷', category: 'scale', description: 'Scale step 7' },
  { name: '--s-8', value: '46.979rem', formula: 'base × ratio⁸', category: 'scale', description: 'Scale step 8' },
  { name: '--s-9', value: '76.013rem', formula: 'base × ratio⁹', category: 'scale', description: 'Scale step 9 (largest)' },
  { name: '--v-pad', value: 'var(--s-n1)', formula: 'base / ratio', category: 'derived', description: 'Default vertical padding' },
  { name: '--h-pad', value: 'var(--s-n1)', formula: 'base / ratio', category: 'derived', description: 'Default horizontal padding' },
  { name: '--radius', value: '0', category: 'derived', description: 'Default border-radius (Carbon: 0)' },
]

export const colorTokens: Token[] = [
  { name: '--background', value: '#161616', category: 'background', description: 'Page background' },
  { name: '--layer-01', value: '#262626', category: 'background', description: 'First layer surface' },
  { name: '--layer-02', value: '#393939', category: 'background', description: 'Second layer surface' },
  { name: '--layer-03', value: '#525252', category: 'background', description: 'Third layer surface' },
  { name: '--text-primary', value: '#f4f4f4', category: 'text', description: 'Primary text color' },
  { name: '--text-secondary', value: '#c6c6c6', category: 'text', description: 'Secondary/muted text' },
  { name: '--text-placeholder', value: '#6f6f6f', category: 'text', description: 'Placeholder text' },
  { name: '--text-on-color', value: '#ffffff', category: 'text', description: 'Text on colored backgrounds' },
  { name: '--text-inverse', value: '#161616', category: 'text', description: 'Inverse (light-on-dark) text' },
  { name: '--border-subtle', value: '#393939', category: 'border', description: 'Subtle borders and dividers' },
  { name: '--border-strong', value: '#6f6f6f', category: 'border', description: 'Strong/prominent borders' },
  { name: '--interactive', value: '#4589ff', category: 'interactive', description: 'Interactive elements (links, icons)' },
  { name: '--focus', value: '#4589ff', category: 'interactive', description: 'Focus ring color' },
  { name: '--button-primary', value: '#0f62fe', category: 'button', description: 'Primary button background' },
  { name: '--button-primary-hover', value: '#0353e9', category: 'button', description: 'Primary button hover' },
  { name: '--button-secondary', value: '#393939', category: 'button', description: 'Secondary button background' },
  { name: '--button-secondary-hover', value: '#474747', category: 'button', description: 'Secondary button hover' },
  { name: '--button-danger', value: '#da1e28', category: 'button', description: 'Danger button background' },
  { name: '--button-danger-hover', value: '#b81922', category: 'button', description: 'Danger button hover' },
  { name: '--support-error', value: '#ff8389', category: 'support', description: 'Error state color' },
  { name: '--support-success', value: '#42be65', category: 'support', description: 'Success state color' },
  { name: '--support-warning', value: '#f1c21b', category: 'support', description: 'Warning state color' },
  { name: '--support-info', value: '#4589ff', category: 'support', description: 'Info state color' },
  { name: '--field', value: '#262626', category: 'form', description: 'Form field background' },
  { name: '--field-hover', value: '#333333', category: 'form', description: 'Form field hover background' },
  { name: '--tag-background-blue', value: '#0043ce', category: 'tag', description: 'Blue tag background' },
  { name: '--tag-background-green', value: '#0e6027', category: 'tag', description: 'Green tag background' },
  { name: '--tag-background-red', value: '#a2191f', category: 'tag', description: 'Red tag background' },
  { name: '--tag-background-purple', value: '#6929c4', category: 'tag', description: 'Purple tag background' },
  { name: '--tag-background-teal', value: '#005d5d', category: 'tag', description: 'Teal tag background' },
  { name: '--tag-background-warm-gray', value: '#474747', category: 'tag', description: 'Gray tag background' },
]

export function getAllTokens() {
  return {
    scale: scaleTokens.filter(t => t.category === 'scale' || t.category === 'config'),
    derived: scaleTokens.filter(t => t.category === 'derived'),
    color: colorTokens,
  }
}
