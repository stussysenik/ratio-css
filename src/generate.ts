/**
 * Generates ratio.css — the complete utility-first CSS framework.
 *
 * All values derive from --base and --ratio CSS custom properties.
 * Change one variable, rescale everything.
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { RATIOS } from './scale.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..')

// ─── Scale step names ───────────────────────────────────────────────────────

const STEPS = [
  { name: 'n4', index: -4 },
  { name: 'n3', index: -3 },
  { name: 'n2', index: -2 },
  { name: 'n1', index: -1 },
  { name: '0', index: 0 },
  { name: '1', index: 1 },
  { name: '2', index: 2 },
  { name: '3', index: 3 },
  { name: '4', index: 4 },
  { name: '5', index: 5 },
  { name: '6', index: 6 },
  { name: '7', index: 7 },
  { name: '8', index: 8 },
  { name: '9', index: 9 },
]

// Utility class number → scale step mapping
const UTIL_MAP: [string, string][] = [
  ['0', '0'],
  ['1', 'n3'],
  ['2', 'n2'],
  ['3', 'n1'],
  ['4', '0'],
  ['5', '1'],
  ['6', '2'],
  ['7', '3'],
  ['8', '4'],
  ['9', '5'],
]

// Type scale mapping
const TYPE_MAP: [string, string][] = [
  ['xs', 'n3'],
  ['sm', 'n2'],
  ['base', '0'],
  ['lg', '1'],
  ['xl', '2'],
  ['2xl', '3'],
  ['3xl', '4'],
  ['4xl', '5'],
  ['5xl', '6'],
]

// ─── CSS Generation ─────────────────────────────────────────────────────────

function generateCss(): string {
  const sections: string[] = []

  // ── Header
  sections.push(`/*! ratio.css v0.1.0 | Geometric ratio-based CSS utilities | MIT License */`)
  sections.push(`/* Two variables. Every dimension. Pure math. */`)
  sections.push(`/* step(n) = base × ratio^n */\n`)

  // ── Custom Properties
  sections.push(generateCustomProperties())

  // ── Reset (minimal)
  sections.push(generateReset())

  // ── Utility Classes
  sections.push(generateSpacingUtilities())
  sections.push(generateTypographyUtilities())
  sections.push(generateBorderRadiusUtilities())
  sections.push(generateSizingUtilities())
  sections.push(generateLayoutUtilities())
  sections.push(generateDisplayUtilities())

  // ── Components
  sections.push(generateComponents())

  return sections.join('\n\n')
}

// ─── Custom Properties ──────────────────────────────────────────────────────

function generateCustomProperties(): string {
  const phi = RATIOS.phi
  const lines: string[] = ['/* ── Scale + Color Custom Properties ── */']
  lines.push(':root {')
  lines.push('  /* Geometric scale inputs */')
  lines.push('  --base: 1rem;')
  lines.push(`  --ratio: ${phi.value};`)
  lines.push(`  --sqrt-ratio: ${phi.sqrt};`)
  lines.push('')

  // Generate calc() expressions for each step
  for (const step of STEPS) {
    if (step.index === 0) {
      lines.push('  --s-0: var(--base);')
    } else if (step.index > 0) {
      const muls = Array(step.index).fill('var(--ratio)').join(' * ')
      lines.push(`  --s-${step.name}: calc(var(--base) * ${muls});`)
    } else {
      const divs = Array(Math.abs(step.index)).fill('var(--ratio)').join(' / ')
      lines.push(`  --s-${step.name}: calc(var(--base) / ${divs});`)
    }
  }

  lines.push('')
  lines.push('  /* Named derived values */')
  lines.push('  --v-pad: var(--s-n1);')
  lines.push('  --h-pad: var(--s-n1);')
  lines.push('  --radius: 0;')
  lines.push('')
  lines.push('  /* IBM Carbon Gray 100 — color tokens */')
  lines.push('  --background: #161616;')
  lines.push('  --layer-01: #262626;')
  lines.push('  --layer-02: #393939;')
  lines.push('  --layer-03: #525252;')
  lines.push('  --text-primary: #f4f4f4;')
  lines.push('  --text-secondary: #c6c6c6;')
  lines.push('  --text-placeholder: #6f6f6f;')
  lines.push('  --text-on-color: #ffffff;')
  lines.push('  --text-inverse: #161616;')
  lines.push('  --border-subtle: #393939;')
  lines.push('  --border-strong: #6f6f6f;')
  lines.push('  --interactive: #4589ff;')
  lines.push('  --focus: #4589ff;')
  lines.push('  --button-primary: #0f62fe;')
  lines.push('  --button-primary-hover: #0353e9;')
  lines.push('  --button-secondary: #393939;')
  lines.push('  --button-secondary-hover: #474747;')
  lines.push('  --button-tertiary: transparent;')
  lines.push('  --button-danger: #da1e28;')
  lines.push('  --button-danger-hover: #b81922;')
  lines.push('  --support-error: #ff8389;')
  lines.push('  --support-success: #42be65;')
  lines.push('  --support-warning: #f1c21b;')
  lines.push('  --support-info: #4589ff;')
  lines.push('  --field: #262626;')
  lines.push('  --field-hover: #333333;')
  lines.push('  --tag-background-blue: #0043ce;')
  lines.push('  --tag-background-green: #0e6027;')
  lines.push('  --tag-background-warm-gray: #474747;')
  lines.push('  --tag-background-red: #a2191f;')
  lines.push('  --tag-background-purple: #6929c4;')
  lines.push('  --tag-background-teal: #005d5d;')
  lines.push('  --notification-info-bg: #002d9c;')
  lines.push('  --notification-success-bg: #044317;')
  lines.push('  --notification-warning-bg: #3a3000;')
  lines.push('}')

  return lines.join('\n')
}

// ─── Reset ──────────────────────────────────────────────────────────────────

function generateReset(): string {
  return `/* ── Reset + Base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; }
body {
  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: calc(1em * var(--ratio));
  background: var(--background);
  color: var(--text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
code, pre, .mono {
  font-family: 'IBM Plex Mono', 'SFMono-Regular', Consolas, monospace;
}`
}

// ─── Spacing Utilities ──────────────────────────────────────────────────────

function generateSpacingUtilities(): string {
  const lines: string[] = ['/* ── Spacing ── */']

  const props = [
    { prefix: 'p', css: 'padding' },
    { prefix: 'px', css: ['padding-left', 'padding-right'] },
    { prefix: 'py', css: ['padding-top', 'padding-bottom'] },
    { prefix: 'pt', css: 'padding-top' },
    { prefix: 'pr', css: 'padding-right' },
    { prefix: 'pb', css: 'padding-bottom' },
    { prefix: 'pl', css: 'padding-left' },
    { prefix: 'm', css: 'margin' },
    { prefix: 'mx', css: ['margin-left', 'margin-right'] },
    { prefix: 'my', css: ['margin-top', 'margin-bottom'] },
    { prefix: 'mt', css: 'margin-top' },
    { prefix: 'mr', css: 'margin-right' },
    { prefix: 'mb', css: 'margin-bottom' },
    { prefix: 'ml', css: 'margin-left' },
    { prefix: 'gap', css: 'gap' },
  ]

  for (const prop of props) {
    // Zero
    if (Array.isArray(prop.css)) {
      lines.push(`.${prop.prefix}-0 { ${prop.css.map(c => `${c}: 0`).join('; ')}; }`)
    } else {
      lines.push(`.${prop.prefix}-0 { ${prop.css}: 0; }`)
    }

    // Scale steps
    for (const [num, step] of UTIL_MAP) {
      if (num === '0') continue
      const val = `var(--s-${step})`
      if (Array.isArray(prop.css)) {
        lines.push(`.${prop.prefix}-${num} { ${prop.css.map(c => `${c}: ${val}`).join('; ')}; }`)
      } else {
        lines.push(`.${prop.prefix}-${num} { ${prop.css}: ${val}; }`)
      }
    }

    // Auto (margin only)
    if (prop.prefix.startsWith('m')) {
      if (Array.isArray(prop.css)) {
        lines.push(`.${prop.prefix}-auto { ${prop.css.map(c => `${c}: auto`).join('; ')}; }`)
      } else {
        lines.push(`.${prop.prefix}-auto { ${prop.css}: auto; }`)
      }
    }
  }

  return lines.join('\n')
}

// ─── Typography ─────────────────────────────────────────────────────────────

function generateTypographyUtilities(): string {
  const lines: string[] = ['/* ── Typography ── */']

  for (const [name, step] of TYPE_MAP) {
    lines.push(`.text-${name} { font-size: var(--s-${step}); }`)
  }

  lines.push('')
  lines.push('.font-light { font-weight: 300; }')
  lines.push('.font-normal { font-weight: 400; }')
  lines.push('.font-medium { font-weight: 500; }')
  lines.push('.font-semibold { font-weight: 600; }')
  lines.push('.font-bold { font-weight: 700; }')
  lines.push('')
  lines.push('.text-left { text-align: left; }')
  lines.push('.text-center { text-align: center; }')
  lines.push('.text-right { text-align: right; }')
  lines.push('')
  lines.push('.leading-tight { line-height: 1.25; }')
  lines.push('.leading-normal { line-height: calc(1em * var(--ratio)); }')
  lines.push('.leading-relaxed { line-height: calc(1em * var(--ratio) * 1.15); }')
  lines.push('.tracking-tight { letter-spacing: -0.025em; }')
  lines.push('.tracking-normal { letter-spacing: 0; }')
  lines.push('.tracking-wide { letter-spacing: 0.05em; }')

  return lines.join('\n')
}

// ─── Border Radius ──────────────────────────────────────────────────────────

function generateBorderRadiusUtilities(): string {
  return `/* ── Border Radius ── */
.rounded-none { border-radius: 0; }
.rounded-sm { border-radius: var(--s-n3); }
.rounded { border-radius: var(--radius); }
.rounded-md { border-radius: var(--s-0); }
.rounded-lg { border-radius: var(--s-1); }
.rounded-xl { border-radius: var(--s-2); }
.rounded-2xl { border-radius: var(--s-3); }
.rounded-full { border-radius: 9999px; }`
}

// ─── Sizing ─────────────────────────────────────────────────────────────────

function generateSizingUtilities(): string {
  const lines: string[] = ['/* ── Sizing ── */']

  for (const [num, step] of UTIL_MAP) {
    if (num === '0') {
      lines.push(`.w-0 { width: 0; }`)
      lines.push(`.h-0 { height: 0; }`)
      continue
    }
    lines.push(`.w-${num} { width: var(--s-${step}); }`)
    lines.push(`.h-${num} { height: var(--s-${step}); }`)
  }

  lines.push('')
  lines.push('.w-full { width: 100%; }')
  lines.push('.h-full { height: 100%; }')
  lines.push('.w-screen { width: 100vw; }')
  lines.push('.h-screen { height: 100vh; }')
  lines.push('.min-w-0 { min-width: 0; }')
  lines.push('.min-h-0 { min-height: 0; }')
  lines.push('.max-w-prose { max-width: 65ch; }')
  lines.push(`.max-w-container { max-width: calc(var(--s-0) * 64); }`)

  return lines.join('\n')
}

// ─── Layout ─────────────────────────────────────────────────────────────────

function generateLayoutUtilities(): string {
  return `/* ── Layout ── */
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }
.inline-grid { display: inline-grid; }

.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-none { flex: none; }
.grow { flex-grow: 1; }
.shrink-0 { flex-shrink: 0; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }
.items-stretch { align-items: stretch; }
.items-baseline { align-items: baseline; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

.self-start { align-self: flex-start; }
.self-center { align-self: center; }
.self-end { align-self: flex-end; }
.self-stretch { align-self: stretch; }

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.col-span-1 { grid-column: span 1 / span 1; }
.col-span-2 { grid-column: span 2 / span 2; }
.col-span-3 { grid-column: span 3 / span 3; }
.col-span-full { grid-column: 1 / -1; }`
}

// ─── Display ────────────────────────────────────────────────────────────────

function generateDisplayUtilities(): string {
  return `/* ── Display ── */
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.hidden { display: none; }

.overflow-hidden { overflow: hidden; }
.overflow-auto { overflow: auto; }
.overflow-scroll { overflow: scroll; }

.relative { position: relative; }
.absolute { position: absolute; }
.fixed { position: fixed; }
.sticky { position: sticky; top: 0; }
.inset-0 { inset: 0; }

.z-0 { z-index: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-50 { z-index: 50; }

.cursor-pointer { cursor: pointer; }
.select-none { user-select: none; }
.transition { transition: all 150ms ease; }

.border { border: 1px solid currentColor; }
.border-0 { border: 0; }
.border-t { border-top: 1px solid currentColor; }
.border-b { border-bottom: 1px solid currentColor; }
.border-l { border-left: 1px solid currentColor; }
.border-r { border-right: 1px solid currentColor; }

.opacity-0 { opacity: 0; }
.opacity-50 { opacity: 0.5; }
.opacity-100 { opacity: 1; }

.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.whitespace-nowrap { white-space: nowrap; }
.break-words { overflow-wrap: break-word; }`
}

// ─── Components ─────────────────────────────────────────────────────────────

function generateComponents(): string {
  return `/* ══════════════════════════════════════════════════════════════════════════
   Components — IBM Carbon × Geometric Scale
   All dimensions from scale variables. All colors from Carbon tokens.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── Button ── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-n2);
  padding: var(--v-pad) calc(var(--h-pad) * var(--ratio));
  min-height: calc(var(--s-0) * 3);
  font-size: var(--s-n1);
  font-weight: 400;
  font-family: inherit;
  letter-spacing: 0.16px;
  line-height: 1;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
  text-decoration: none;
  background: var(--button-primary);
  color: var(--text-on-color);
}
.btn:hover { background: var(--button-primary-hover); }
.btn:focus { outline: 2px solid var(--focus); outline-offset: -2px; }
.btn:active { background: var(--button-primary-hover); }
.btn-secondary { background: var(--button-secondary); color: var(--text-on-color); }
.btn-secondary:hover { background: var(--button-secondary-hover); }
.btn-danger { background: var(--button-danger); color: var(--text-on-color); }
.btn-danger:hover { background: var(--button-danger-hover); }
.btn-tertiary {
  background: transparent;
  color: var(--interactive);
  border: 1px solid var(--interactive);
}
.btn-tertiary:hover { background: var(--interactive); color: var(--text-on-color); }
.btn-ghost {
  background: transparent;
  color: var(--interactive);
  border: none;
  padding: var(--v-pad) var(--s-n1);
}
.btn-ghost:hover { background: var(--layer-01); }
.btn-sm { min-height: calc(var(--s-0) * 2); font-size: var(--s-n2); padding: var(--s-n3) var(--s-n1); }
.btn-lg { min-height: calc(var(--s-0) * 3.5); font-size: var(--s-0); padding: var(--s-0) var(--s-1); }
.btn-icon { padding: var(--v-pad); min-height: auto; }

/* ── Input ── */
.input {
  display: block;
  width: 100%;
  padding: 0 var(--s-0);
  height: calc(var(--s-0) * 2.5);
  font-size: var(--s-n1);
  font-family: inherit;
  color: var(--text-primary);
  background: var(--field);
  border: none;
  border-bottom: 1px solid var(--border-strong);
  border-radius: var(--radius);
  outline: none;
  transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.input::placeholder { color: var(--text-placeholder); }
.input:focus { outline: 2px solid var(--focus); outline-offset: -2px; }
.input:hover { background: var(--field-hover); }
.input-sm { height: calc(var(--s-0) * 2); font-size: var(--s-n2); }
.input-lg { height: calc(var(--s-0) * 3); font-size: var(--s-0); }

.label {
  display: block;
  font-size: var(--s-n2);
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: var(--s-n3);
  letter-spacing: 0.32px;
}

/* ── Card ── */
.card {
  padding: var(--s-0);
  border-radius: var(--radius);
  background: var(--layer-01);
  display: flex;
  flex-direction: column;
  gap: var(--s-0);
}
.card:hover { background: var(--layer-02); }
.card-title { font-size: var(--s-0); font-weight: 600; color: var(--text-primary); }
.card-body { font-size: var(--s-n1); line-height: calc(1em * var(--ratio)); color: var(--text-secondary); }
.card-footer { padding-top: var(--s-n1); border-top: 1px solid var(--border-subtle); }

/* ── Tag (Badge) ── */
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--s-n4) var(--s-n2);
  font-size: var(--s-n2);
  font-weight: 400;
  border-radius: 9999px;
  line-height: 1;
  min-height: calc(var(--s-0) * 1.5);
  background: var(--tag-background-warm-gray);
  color: var(--text-primary);
}
.tag-blue { background: var(--tag-background-blue); }
.tag-green { background: var(--tag-background-green); }
.tag-red { background: var(--tag-background-red); }
.tag-purple { background: var(--tag-background-purple); }
.tag-teal { background: var(--tag-background-teal); }

/* ── Notification (Alert) ── */
.notification {
  display: flex;
  gap: var(--s-n1);
  padding: var(--s-n1) var(--s-0);
  font-size: var(--s-n1);
  border-radius: var(--radius);
  border-left: 3px solid var(--support-info);
  background: var(--notification-info-bg);
  color: var(--text-primary);
}
.notification-title { font-weight: 600; margin-bottom: var(--s-n4); }
.notification-success { border-left-color: var(--support-success); background: var(--notification-success-bg); }
.notification-warning { border-left-color: var(--support-warning); background: var(--notification-warning-bg); }
.notification-error { border-left-color: var(--support-error); background: var(--button-danger); }

/* ── Avatar ── */
.avatar {
  width: var(--s-3);
  height: var(--s-3);
  border-radius: 9999px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--s-0);
  flex-shrink: 0;
  background: var(--interactive);
  color: var(--text-on-color);
}
.avatar-sm { width: var(--s-2); height: var(--s-2); font-size: var(--s-n1); }
.avatar-lg { width: var(--s-4); height: var(--s-4); font-size: var(--s-1); }

/* ── Headings ── */
.h1 { font-size: var(--s-5); font-weight: 300; line-height: 1.15; letter-spacing: 0; color: var(--text-primary); }
.h2 { font-size: var(--s-4); font-weight: 300; line-height: 1.2; letter-spacing: 0; color: var(--text-primary); }
.h3 { font-size: var(--s-3); font-weight: 400; line-height: 1.25; color: var(--text-primary); }
.h4 { font-size: var(--s-2); font-weight: 400; line-height: 1.3; color: var(--text-primary); }
.h5 { font-size: var(--s-1); font-weight: 600; line-height: 1.4; color: var(--text-primary); }
.h6 { font-size: var(--s-0); font-weight: 600; line-height: calc(1em * var(--ratio)); color: var(--text-primary); }

/* ── Stack ── */
.stack { display: flex; flex-direction: column; gap: var(--s-0); }
.stack-sm { gap: var(--s-n1); }
.stack-lg { gap: var(--s-1); }
.stack-xl { gap: var(--s-2); }

/* ── Container ── */
.container {
  width: 100%;
  max-width: calc(var(--s-0) * 64);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--s-1);
  padding-right: var(--s-1);
}

/* ── Tabs ── */
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-subtle);
}
.tab {
  padding: var(--s-n2) var(--s-0);
  font-size: var(--s-n1);
  font-weight: 400;
  letter-spacing: 0.16px;
  cursor: pointer;
  border: none;
  background: var(--layer-01);
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
}
.tab:hover { background: var(--layer-02); color: var(--text-primary); }
.tab-active {
  color: var(--text-primary);
  border-bottom-color: var(--interactive);
  font-weight: 600;
}

/* ── Breadcrumb ── */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--s-n2);
  font-size: var(--s-n1);
  list-style: none;
  padding: 0;
  color: var(--text-secondary);
}
.breadcrumb a {
  color: var(--interactive);
  text-decoration: none;
}
.breadcrumb a:hover { text-decoration: underline; }
.breadcrumb-sep { color: var(--text-placeholder); }
.breadcrumb-current { color: var(--text-primary); }

/* ── Toggle ── */
.toggle {
  position: relative;
  width: calc(var(--s-0) * 3);
  height: calc(var(--s-0) * 1.5);
  background: var(--layer-03);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 70ms;
}
.toggle::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(var(--s-0) * 1.5 - 6px);
  height: calc(var(--s-0) * 1.5 - 6px);
  background: var(--text-on-color);
  border-radius: 9999px;
  transition: transform 70ms;
}
.toggle-active { background: var(--support-success); }
.toggle-active::after { transform: translateX(calc(var(--s-0) * 1.5)); }

/* ── Divider ── */
.divider {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: var(--s-0) 0;
}`
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const css = generateCss()

  writeFileSync(join(outDir, 'ratio.css'), css)
  console.log(`✅ Generated ratio.css (${(css.length / 1024).toFixed(1)} KB)`)

  // Minified version
  const minified = css
    .replace(/\/\*[\s\S]*?\*\//g, '')      // remove comments
    .replace(/\s*\n\s*/g, '')               // remove newlines
    .replace(/\s*{\s*/g, '{')               // compact braces
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*:\s*/g, ':')
    .replace(/;}/g, '}')                    // remove trailing semicolons

  writeFileSync(join(outDir, 'ratio.min.css'), minified)
  console.log(`✅ Generated ratio.min.css (${(minified.length / 1024).toFixed(1)} KB)`)
}

main()
