# One Piece TCG Site — Design System

> Source of truth for all visual decisions. Update this before adding new components.

## Colors

### Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#0a0a12` | Page background |
| `--bg-surface` | `#0f0f1a` | Cards, sidebars, panels |
| `--bg-elevated` | `#13131f` | Modals, dropdowns |
| `--bg-hover` | `#1e1e2e` | Hover states |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#ffffff` | Headings, primary text |
| `--text-secondary` | `#a1a1aa` | Body, descriptions |
| `--text-muted` | `#71717a` | Metadata, labels |

### Accent
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#e63946` | One Piece red — CTAs, highlights, active states |

### Card Colors (by color attribute)
| Color | Border | Background tint |
|-------|--------|-----------------|
| Red | `#e63946` | `rgba(230,57,70,0.08)` |
| Blue | `#1d4ed8` | `rgba(29,78,216,0.08)` |
| Green | `#15803d` | `rgba(21,128,61,0.08)` |
| Black | `#27272a` | `rgba(39,39,42,0.3)` |
| Yellow | `#ca8a04` | `rgba(202,138,4,0.08)` |

## Typography

- **Font:** Inter (Google Fonts, next/font)
- **Fallback:** system-ui, sans-serif
- **Headings:** `font-bold`, `text-white`
- **Body:** `text-zinc-400`, `leading-relaxed`

### Scale
| Size | Class | Use |
|------|-------|-----|
| 12px | `text-xs` | Labels, metadata |
| 14px | `text-sm` | Body, descriptions |
| 16px | `text-base` | Default |
| 18px | `text-lg` | Card names |
| 20px | `text-xl` | Section headings |
| 36px | `text-3xl` | Hero headings |
| 60px | `text-5xl` | Landing hero |

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Page padding | `px-6` mobile → `max-w-7xl mx-auto` desktop |
| Section gap | `py-16` |
| Card grid gap | `gap-4` |
| Component padding | `p-4` or `p-6` |
| Border radius | `rounded-lg` (cards), `rounded-xl` (panels) |

## Components

### CardCard
- `rounded-lg`, `overflow-hidden`
- Left border: `4px solid <card-color>`
- Background: `--bg-surface`
- Hover: `scale-[1.02]`, `shadow-lg`, `transition-all duration-200`
- Image: aspect-ratio 3/4, `object-cover`
- Rarity badge: colored pill (top-right)
- Stats row: cost (top-left), power (bottom-left), counter (bottom-right)

### Rarity Badge Colors
| Rarity | Color |
|--------|-------|
| Leader | `bg-purple-600` |
| SEC | `bg-amber-500` |
| SP | `bg-pink-500` |
| SR | `bg-orange-500` |
| R | `bg-red-500/20 text-red-400` |
| UC | `bg-zinc-700 text-zinc-300` |
| C | `bg-zinc-800 text-zinc-400` |

### FilterSidebar
- Background: `--bg-surface`
- Border: `1px solid rgba(255,255,255,0.05)`
- Collapsible groups with chevron rotation on open
- Active filter: `--accent` left border on item

### NavBar
- Background: `rgba(10,10,18,0.9)` + `backdrop-blur`
- Border bottom: `1px solid rgba(255,255,255,0.05)`
- Logo: bold, `--accent` on hover
- Links: `text-zinc-400` → `text-white` on hover

### SetCard
- `rounded-xl`, `overflow-hidden`
- Image: full-bleed set logo/symbol
- Overlay gradient: bottom-up black → transparent
- Card count badge: top-right corner

## Loading States

- Spinner: `w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin`
- Card skeleton: `bg-zinc-800 animate-pulse rounded-lg`
- Page skeleton: full-width bars with `bg-zinc-800 animate-pulse`

## Dark Theme Globals (app/globals.css)

```css
:root {
  --bg-base: #0a0a12;
  --bg-surface: #0f0f1a;
  --accent: #e63946;
}
```

## Animation Standards

- Hover transitions: `200ms ease-out`
- Page transitions: `300ms ease-out`
- Loading spinners: `animate-spin` (Tailwind)
- Skeletons: `animate-pulse` (Tailwind)
- Card hover lift: `hover:scale-[1.02] hover:shadow-xl`

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | `< 640px` | 1 column |
| Tablet | `640px – 1024px` | 2-3 columns |
| Desktop | `> 1024px` | 4-6 columns (card grid) |
| Wide | `> 1280px` | max-w-7xl container |

## Image Strategy

- Card images: `https://images.pokemontcg.io/<set>/<number>.png`
- Set logos: `https://images.pokemontcg.io/<set>/symbol.png`
- Fallback: `/placeholder-card.png` (local)
- Lazy loading: `loading="lazy"` on all `<img>` tags below the fold

## Common Pitfalls

- Don't hardcode colors — use CSS variables or Tailwind arbitrary values consistently
- Card border color comes from card.color, not card.type
- Rarity badge is always top-right, color-coded
- Filter sidebar active state = `--accent` left border on the filter item
- Don't mix `bg-zinc-900` and `#0f0f1a` — pick one surface token and stick to it