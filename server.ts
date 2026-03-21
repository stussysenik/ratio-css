/**
 * ratio.css documentation server
 *
 * ElysiaJS + Swagger + Static files
 * Run: bun run dev
 */

import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import { getAllTokens } from './src/data/tokens.js'
import { components, getComponent } from './src/data/components.js'
import { getAllUtilities } from './src/data/utilities.js'
import { computeScale } from './src/scale.js'

const app = new Elysia()

  // ── Swagger / OpenAPI ─────────────────────────────────────────────────────
  .use(swagger({
    documentation: {
      info: {
        title: 'ratio.css API',
        version: '0.2.0',
        description: 'Geometric ratio-based CSS framework API. Query tokens, components, utilities, and compute custom scales.\n\n`step(n) = base × ratio^n`\n\nDefault: base=1rem, ratio=φ (1.618)',
      },
      tags: [
        { name: 'Tokens', description: 'CSS custom property tokens — scale steps, colors, derived values' },
        { name: 'Components', description: 'Pre-built component classes with variants and usage examples' },
        { name: 'Utilities', description: 'Utility classes grouped by category' },
        { name: 'Scale', description: 'Compute geometric scales with custom base and ratio' },
      ],
    },
  }))

  // ── Static files ──────────────────────────────────────────────────────────
  .use(staticPlugin({
    assets: 'public',
    prefix: '/',
  }))

  // ── API Routes ────────────────────────────────────────────────────────────

  // GET /api/tokens
  .get('/api/tokens', () => getAllTokens(), {
    detail: {
      tags: ['Tokens'],
      summary: 'List all CSS tokens',
      description: 'Returns all CSS custom property tokens grouped by category: scale (geometric steps), derived (v-pad, h-pad, radius), and color (Carbon Gray 100 theme).',
    },
  })

  // GET /api/tokens/:category
  .get('/api/tokens/:category', ({ params }) => {
    const all = getAllTokens()
    const cat = params.category as keyof typeof all
    if (!(cat in all)) return { error: `Unknown category: ${cat}. Valid: scale, derived, color` }
    return all[cat]
  }, {
    params: t.Object({ category: t.String() }),
    detail: {
      tags: ['Tokens'],
      summary: 'Get tokens by category',
      description: 'Filter tokens by category: `scale`, `derived`, or `color`.',
    },
  })

  // GET /api/components
  .get('/api/components', () => components, {
    detail: {
      tags: ['Components'],
      summary: 'List all components',
      description: 'Returns all component definitions with base class, variants, sizes, scale formulas, and HTML usage examples.',
    },
  })

  // GET /api/components/:name
  .get('/api/components/:name', ({ params }) => {
    const comp = getComponent(params.name)
    if (!comp) return { error: `Component not found: ${params.name}` }
    return comp
  }, {
    params: t.Object({ name: t.String() }),
    detail: {
      tags: ['Components'],
      summary: 'Get component by name',
      description: 'Returns a single component definition by name (case-insensitive). Example: `/api/components/button`',
    },
  })

  // GET /api/utilities
  .get('/api/utilities', () => getAllUtilities(), {
    detail: {
      tags: ['Utilities'],
      summary: 'List all utility classes',
      description: 'Returns all utility classes grouped by category: spacing, typography, borderRadius, sizing, layout, positioning, misc.',
    },
  })

  // POST /api/scale
  .post('/api/scale', ({ body }) => {
    const { base, ratio } = body
    const steps = computeScale(base, ratio)
    const sqrtRatio = Math.sqrt(ratio)
    return {
      config: { base, ratio, sqrtRatio },
      steps: steps.map(s => ({
        ...s,
        px: +(s.value * 16).toFixed(2),
      })),
      derived: {
        verticalPadding: +(sqrtRatio / (ratio * ratio)).toFixed(4),
        horizontalPadding: +(base / ratio).toFixed(4),
        borderRadius: +(base * sqrtRatio).toFixed(4),
      },
      css: `:root {\n  --base: ${base}rem;\n  --ratio: ${ratio};\n  --sqrt-ratio: ${sqrtRatio.toFixed(6)};\n}`,
    }
  }, {
    body: t.Object({
      base: t.Number({ default: 1, minimum: 0.1, maximum: 10, description: 'Base unit in rem' }),
      ratio: t.Number({ default: 1.618, minimum: 1.01, maximum: 3, description: 'Scale ratio (e.g., 1.618 for golden ratio)' }),
    }),
    detail: {
      tags: ['Scale'],
      summary: 'Compute a custom scale',
      description: 'Given a base unit and ratio, computes the full geometric scale (steps -4 through +9), derived values, and the CSS custom property snippet.',
    },
  })

  // GET /api/scale/presets
  .get('/api/scale/presets', () => ({
    phi: { ratio: 1.618033988749895, name: 'Golden Ratio (φ)', origin: '(1+√5)/2' },
    sqrt2: { ratio: 1.4142135623730951, name: '√2', origin: 'ISO paper sizes' },
    minor_third: { ratio: 1.2, name: 'Minor Third', origin: 'Musical 6:5' },
    major_third: { ratio: 1.25, name: 'Major Third', origin: 'Musical 5:4' },
    perfect_fourth: { ratio: 1.333, name: 'Perfect Fourth', origin: 'Musical 4:3' },
    perfect_fifth: { ratio: 1.5, name: 'Perfect Fifth', origin: 'Musical 3:2' },
  }), {
    detail: {
      tags: ['Scale'],
      summary: 'List ratio presets',
      description: 'Returns well-known mathematical and musical ratios with their names and origins.',
    },
  })

  // ── Serve static files (fallback since @elysiajs/static may not work) ───
  .get('/ratio.css', () => Bun.file('public/ratio.css'))
  .get('/ratio.min.css', () => Bun.file('public/ratio.min.css'))
  .get('/docs', () => Bun.file('public/docs/index.html'))
  .get('/docs/', () => Bun.file('public/docs/index.html'))
  .get('/storybook', () => Bun.file('storybook.html'))
  .get('/configurator', () => Bun.file('configurator.html'))

  // ── Start ─────────────────────────────────────────────────────────────────
  .listen(3000)

console.log(`
╔══════════════════════════════════════════════╗
║  ratio.css docs server                       ║
║                                              ║
║  http://localhost:3000/swagger  → API docs    ║
║  http://localhost:3000/docs     → Docs        ║
║  http://localhost:3000/storybook → Storybook  ║
╚══════════════════════════════════════════════╝
`)
