/**
 * Component registry — all component classes with variants, usage, and scale formulas.
 */

export interface ComponentDef {
  name: string
  baseClass: string
  description: string
  scaleFormula: string
  variants: { class: string; description: string }[]
  sizes: string[]
  example: string
  examples: Record<string, string>
}

export const components: ComponentDef[] = [
  {
    name: 'Button',
    baseClass: '.btn',
    description: 'Primary action trigger. Carbon-styled with all dimensions from scale variables.',
    scaleFormula: 'padding: --v-pad calc(--h-pad × ratio) | min-height: --s-0 × 3 | font-size: --s-n1',
    variants: [
      { class: '.btn-secondary', description: 'Secondary action — gray background' },
      { class: '.btn-tertiary', description: 'Outline style — transparent with border' },
      { class: '.btn-ghost', description: 'Ghost — transparent, no border' },
      { class: '.btn-danger', description: 'Destructive action — red background' },
    ],
    sizes: ['.btn-sm', '.btn-lg'],
    example: '<button class="btn">Primary action</button>',
    examples: {
      primary: '<button class="btn">Primary</button>',
      secondary: '<button class="btn btn-secondary">Secondary</button>',
      tertiary: '<button class="btn btn-tertiary">Tertiary</button>',
      ghost: '<button class="btn btn-ghost">Ghost</button>',
      danger: '<button class="btn btn-danger">Danger</button>',
      small: '<button class="btn btn-sm">Small</button>',
      large: '<button class="btn btn-lg">Large</button>',
      icon: '<button class="btn btn-icon">→</button>',
    },
  },
  {
    name: 'Input',
    baseClass: '.input',
    description: 'Text input field with Carbon bottom-border style. Uses field tokens for background.',
    scaleFormula: 'height: --s-0 × 2.5 | padding: 0 --s-0 | font-size: --s-n1 | border-bottom: 1px',
    variants: [],
    sizes: ['.input-sm', '.input-lg'],
    example: '<input class="input" placeholder="Enter value..." />',
    examples: {
      default: '<label class="label">Email</label>\n<input class="input" placeholder="you@example.com" />',
      small: '<input class="input input-sm" placeholder="Small" />',
      large: '<input class="input input-lg" placeholder="Large" />',
    },
  },
  {
    name: 'Card',
    baseClass: '.card',
    description: 'Container with layer-01 background. Hoverable. Contains title, body, footer.',
    scaleFormula: 'padding: --s-0 | gap: --s-0 | bg: --layer-01 | hover: --layer-02',
    variants: [],
    sizes: [],
    example: '<div class="card">\n  <div class="card-title">Title</div>\n  <div class="card-body">Content</div>\n  <div class="card-footer">Footer</div>\n</div>',
    examples: {
      basic: '<div class="card">\n  <div class="card-title">Card title</div>\n  <div class="card-body">Card body text goes here.</div>\n</div>',
      withFooter: '<div class="card">\n  <div class="card-title">Title</div>\n  <div class="card-body">Description text.</div>\n  <div class="card-footer">\n    <button class="btn btn-sm">Action</button>\n  </div>\n</div>',
    },
  },
  {
    name: 'Tag',
    baseClass: '.tag',
    description: 'Inline label/badge. Pill-shaped with color variants matching Carbon tag tokens.',
    scaleFormula: 'padding: --s-n4 --s-n2 | font-size: --s-n2 | min-height: --s-0 × 1.5',
    variants: [
      { class: '.tag-blue', description: 'Blue background' },
      { class: '.tag-green', description: 'Green background' },
      { class: '.tag-red', description: 'Red background' },
      { class: '.tag-purple', description: 'Purple background' },
      { class: '.tag-teal', description: 'Teal background' },
    ],
    sizes: [],
    example: '<span class="tag">Default</span>',
    examples: {
      default: '<span class="tag">Default</span>',
      blue: '<span class="tag tag-blue">Blue</span>',
      green: '<span class="tag tag-green">Green</span>',
      red: '<span class="tag tag-red">Red</span>',
      purple: '<span class="tag tag-purple">Purple</span>',
      teal: '<span class="tag tag-teal">Teal</span>',
    },
  },
  {
    name: 'Notification',
    baseClass: '.notification',
    description: 'Inline notification with left border accent. Maps to Carbon notification pattern.',
    scaleFormula: 'padding: --s-n1 --s-0 | border-left: 3px | font-size: --s-n1',
    variants: [
      { class: '.notification-success', description: 'Green border, success background' },
      { class: '.notification-warning', description: 'Yellow border, warning background' },
      { class: '.notification-error', description: 'Red border, error background' },
    ],
    sizes: [],
    example: '<div class="notification">\n  <div class="notification-title">Info</div>\n  Message text here.\n</div>',
    examples: {
      info: '<div class="notification">\n  <div class="notification-title">Information</div>\n  This is an informational notification.\n</div>',
      success: '<div class="notification notification-success">\n  <div class="notification-title">Success</div>\n  Operation completed.\n</div>',
      warning: '<div class="notification notification-warning">\n  <div class="notification-title">Warning</div>\n  Check configuration.\n</div>',
      error: '<div class="notification notification-error">\n  <div class="notification-title">Error</div>\n  Something went wrong.\n</div>',
    },
  },
  {
    name: 'Avatar',
    baseClass: '.avatar',
    description: 'Circular user avatar with initial letter. Three sizes via scale steps.',
    scaleFormula: 'size: --s-3 | font-size: --s-0 | bg: --interactive',
    variants: [],
    sizes: ['.avatar-sm', '.avatar-lg'],
    example: '<div class="avatar">A</div>',
    examples: {
      small: '<div class="avatar avatar-sm">S</div>',
      default: '<div class="avatar">M</div>',
      large: '<div class="avatar avatar-lg">L</div>',
    },
  },
  {
    name: 'Typography',
    baseClass: '.h1 – .h6',
    description: 'Heading scale from --s-5 (h1) down to --s-0 (h6). Carbon-weight: light for large, semibold for small.',
    scaleFormula: 'h1: --s-5 wt300 | h2: --s-4 wt300 | h3: --s-3 wt400 | h4: --s-2 wt400 | h5: --s-1 wt600 | h6: --s-0 wt600',
    variants: [],
    sizes: [],
    example: '<h1 class="h1">Heading 1</h1>',
    examples: {
      all: '<h1 class="h1">Heading 1</h1>\n<h2 class="h2">Heading 2</h2>\n<h3 class="h3">Heading 3</h3>\n<h4 class="h4">Heading 4</h4>\n<h5 class="h5">Heading 5</h5>\n<h6 class="h6">Heading 6</h6>',
    },
  },
  {
    name: 'Tabs',
    baseClass: '.tabs',
    description: 'Tab navigation with bottom border indicator. Active tab highlighted with --interactive.',
    scaleFormula: 'tab padding: --s-n2 --s-0 | font-size: --s-n1 | bg: --layer-01',
    variants: [],
    sizes: [],
    example: '<div class="tabs">\n  <button class="tab tab-active">Tab 1</button>\n  <button class="tab">Tab 2</button>\n</div>',
    examples: {
      default: '<div class="tabs">\n  <button class="tab tab-active">Overview</button>\n  <button class="tab">Components</button>\n  <button class="tab">API</button>\n</div>',
    },
  },
  {
    name: 'Breadcrumb',
    baseClass: '.breadcrumb',
    description: 'Navigation breadcrumb trail with separator and current item highlight.',
    scaleFormula: 'gap: --s-n2 | font-size: --s-n1',
    variants: [],
    sizes: [],
    example: '<nav class="breadcrumb">\n  <a href="#">Home</a>\n  <span class="breadcrumb-sep">/</span>\n  <span class="breadcrumb-current">Page</span>\n</nav>',
    examples: {
      default: '<nav class="breadcrumb">\n  <a href="#">Home</a>\n  <span class="breadcrumb-sep">/</span>\n  <a href="#">Docs</a>\n  <span class="breadcrumb-sep">/</span>\n  <span class="breadcrumb-current">Button</span>\n</nav>',
    },
  },
  {
    name: 'Toggle',
    baseClass: '.toggle',
    description: 'Switch toggle button. Active state slides knob and turns green.',
    scaleFormula: 'width: --s-0 × 3 | height: --s-0 × 1.5 | active: --support-success',
    variants: [
      { class: '.toggle-active', description: 'Active/on state' },
    ],
    sizes: [],
    example: '<button class="toggle"></button>',
    examples: {
      off: '<button class="toggle"></button>',
      on: '<button class="toggle toggle-active"></button>',
    },
  },
  {
    name: 'Stack',
    baseClass: '.stack',
    description: 'Vertical flex container with scale-based gap.',
    scaleFormula: 'gap: --s-0 (default) | --s-n1 (sm) | --s-1 (lg) | --s-2 (xl)',
    variants: [
      { class: '.stack-sm', description: 'Tighter spacing' },
      { class: '.stack-lg', description: 'Wider spacing' },
      { class: '.stack-xl', description: 'Extra wide spacing' },
    ],
    sizes: [],
    example: '<div class="stack">\n  <div>Item 1</div>\n  <div>Item 2</div>\n</div>',
    examples: {
      default: '<div class="stack">\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</div>',
    },
  },
  {
    name: 'Divider',
    baseClass: '.divider',
    description: 'Horizontal rule using border-subtle token.',
    scaleFormula: 'margin: --s-0 0 | border-top: 1px --border-subtle',
    variants: [],
    sizes: [],
    example: '<hr class="divider" />',
    examples: { default: '<hr class="divider" />' },
  },
]

export function getComponent(name: string): ComponentDef | undefined {
  return components.find(c => c.name.toLowerCase() === name.toLowerCase())
}
