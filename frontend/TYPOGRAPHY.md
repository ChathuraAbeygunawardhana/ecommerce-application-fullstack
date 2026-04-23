# Typography Guide

## Font Stack

The application uses **Inter** as the single, consistent font throughout for a clean, modern, and professional aesthetic.

### Inter
- **Usage**: All text (headings, body, buttons, labels, navigation)
- **Characteristics**: Clean, modern, highly readable, professional
- **Weights**: 300-900 (primarily 400, 500, 600, 700, 800)
- **Why Inter?**: 
  - Exceptional readability at all sizes
  - Modern, elegant appearance
  - Wide range of weights for hierarchy
  - Optimized for screens
  - Industry-standard for modern web applications

## Typography Scale

### Headings
- **h1**: `text-3xl md:text-4xl font-bold` (30px/36px → 36px/40px)
- **h2**: `text-2xl md:text-3xl font-bold` (24px/32px → 30px/36px)
- **h3**: `text-xl md:text-2xl font-bold` (20px/28px → 24px/32px)
- **h4**: `text-lg md:text-xl font-semibold` (18px/28px → 20px/28px)

### Body Text
- **Large**: `text-lg` (18px/28px)
- **Base**: `text-base` (16px/24px)
- **Small**: `text-sm` (14px/20px)
- **Extra Small**: `text-xs` (12px/16px)

## Font Weights

- **Light**: `font-light` (300) - Rarely used
- **Regular**: `font-normal` (400) - Body text
- **Medium**: `font-medium` (500) - Subtle emphasis
- **Semibold**: `font-semibold` (600) - Strong emphasis, subheadings
- **Bold**: `font-bold` (700) - Headings, buttons, labels
- **Extra Bold**: `font-extrabold` (800) - Hero text, major headings

## Usage Examples

### Page Titles
```tsx
<h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
  Browse Watch Collection
</h1>
```

### Section Headers
```tsx
<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
  Rolex Collection
</h2>
```

### Card Titles
```tsx
<h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">
  Submariner Date
</h3>
```

### Subtitles/Descriptions
```tsx
<p className="text-zinc-600 dark:text-zinc-400">
  Explore watches by manufacturer or model
</p>
```

### Body Text
```tsx
<p className="text-base text-zinc-600 dark:text-zinc-400">
  Explore our extensive collection of luxury watches.
</p>
```

### Labels
```tsx
<span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
  Reference
</span>
```

### Buttons
```tsx
<button className="font-semibold">
  Browse Collection
</button>
```

## Design Rationale

### Why Single Font?
- **Consistency**: Unified visual language throughout the app
- **Readability**: Inter is optimized for both headings and body text
- **Modern**: Clean, professional aesthetic
- **Performance**: Single font family loads faster
- **Flexibility**: Wide weight range provides excellent hierarchy

### Typography Hierarchy
Hierarchy is achieved through:
1. **Size**: Larger text for more important content
2. **Weight**: Bolder weights for emphasis
3. **Color**: Darker colors for primary content, lighter for secondary
4. **Spacing**: More spacing around important elements

## Accessibility

- Minimum font size: 12px (text-xs)
- Body text: 16px (text-base) for optimal readability
- High contrast ratios maintained in both light and dark modes
- Clear hierarchy through size and weight
- Line heights optimized for reading comfort

## Best Practices

### Do's
✅ Use consistent font weights across similar elements
✅ Use appropriate font sizes for hierarchy
✅ Ensure sufficient contrast in both light and dark modes
✅ Use bold (700) for headings
✅ Use semibold (600) for subheadings
✅ Use medium (500) or regular (400) for body text

### Don'ts
❌ Don't use too many font weights (stick to 3-4 per page)
❌ Don't use font sizes smaller than 12px
❌ Don't ignore responsive font sizing
❌ Don't use light weights on dark backgrounds (readability)
❌ Don't mix font families

## Responsive Typography

All headings should scale appropriately:
```tsx
// Mobile → Desktop
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  Title
</h1>
```

## Dark Mode Considerations

- Inter maintains excellent readability in dark mode
- Use appropriate color contrasts:
  - Primary text: `text-zinc-900 dark:text-white`
  - Secondary text: `text-zinc-600 dark:text-zinc-400`
  - Tertiary text: `text-zinc-500 dark:text-zinc-500`

## Performance

Font is loaded via Next.js font optimization:
- Automatic font subsetting
- Self-hosted for privacy and performance
- Display swap for faster initial render
- Preloaded for critical text
- Single font family reduces load time
