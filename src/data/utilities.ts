/**
 * Utility class registry — all utility classes grouped by category.
 */

const spacingNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const spacingSteps = ['0', 'n3', 'n2', 'n1', '0', '1', '2', '3', '4', '5']

function genSpacing(prefix: string) {
  return spacingNumbers.map((n, i) => ({
    class: `.${prefix}-${n}`,
    value: n === '0' ? '0' : `var(--s-${spacingSteps[i]})`,
    step: spacingSteps[i],
  }))
}

export function getAllUtilities() {
  return {
    spacing: {
      padding: genSpacing('p'),
      paddingX: genSpacing('px'),
      paddingY: genSpacing('py'),
      paddingTop: genSpacing('pt'),
      paddingRight: genSpacing('pr'),
      paddingBottom: genSpacing('pb'),
      paddingLeft: genSpacing('pl'),
      margin: [...genSpacing('m'), { class: '.m-auto', value: 'auto', step: null }],
      marginX: [...genSpacing('mx'), { class: '.mx-auto', value: 'auto', step: null }],
      marginY: [...genSpacing('my'), { class: '.my-auto', value: 'auto', step: null }],
      gap: genSpacing('gap'),
    },
    typography: {
      fontSize: [
        { class: '.text-xs', step: 'n3' }, { class: '.text-sm', step: 'n2' },
        { class: '.text-base', step: '0' }, { class: '.text-lg', step: '1' },
        { class: '.text-xl', step: '2' }, { class: '.text-2xl', step: '3' },
        { class: '.text-3xl', step: '4' }, { class: '.text-4xl', step: '5' },
        { class: '.text-5xl', step: '6' },
      ],
      fontWeight: [
        { class: '.font-light', value: '300' }, { class: '.font-normal', value: '400' },
        { class: '.font-medium', value: '500' }, { class: '.font-semibold', value: '600' },
        { class: '.font-bold', value: '700' },
      ],
      textAlign: ['.text-left', '.text-center', '.text-right'],
      lineHeight: ['.leading-tight', '.leading-normal', '.leading-relaxed'],
      letterSpacing: ['.tracking-tight', '.tracking-normal', '.tracking-wide'],
    },
    borderRadius: [
      '.rounded-none', '.rounded-sm', '.rounded', '.rounded-md',
      '.rounded-lg', '.rounded-xl', '.rounded-2xl', '.rounded-full',
    ],
    sizing: {
      width: [...spacingNumbers.map(n => `.w-${n}`), '.w-full', '.w-screen'],
      height: [...spacingNumbers.map(n => `.h-${n}`), '.h-full', '.h-screen'],
      constraints: ['.min-w-0', '.min-h-0', '.max-w-prose', '.max-w-container'],
    },
    layout: {
      display: ['.flex', '.inline-flex', '.grid', '.inline-grid', '.block', '.inline-block', '.inline', '.hidden'],
      flexDirection: ['.flex-row', '.flex-col'],
      flexWrap: ['.flex-wrap', '.flex-nowrap'],
      flex: ['.flex-1', '.flex-auto', '.flex-none', '.grow', '.shrink-0'],
      alignItems: ['.items-start', '.items-center', '.items-end', '.items-stretch', '.items-baseline'],
      justifyContent: ['.justify-start', '.justify-center', '.justify-end', '.justify-between', '.justify-around', '.justify-evenly'],
      grid: ['.grid-cols-1', '.grid-cols-2', '.grid-cols-3', '.grid-cols-4', '.col-span-1', '.col-span-2', '.col-span-3', '.col-span-full'],
    },
    positioning: ['.relative', '.absolute', '.fixed', '.sticky', '.inset-0', '.z-0', '.z-10', '.z-20', '.z-50'],
    misc: [
      '.cursor-pointer', '.select-none', '.transition',
      '.border', '.border-0', '.border-t', '.border-b', '.border-l', '.border-r',
      '.opacity-0', '.opacity-50', '.opacity-100',
      '.truncate', '.whitespace-nowrap', '.break-words', '.overflow-hidden', '.overflow-auto',
    ],
  }
}
