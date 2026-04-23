# Visual Guide - Watch Database Frontend

## Page Structure

### 1. Home Page (/)
```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo] Watch Catalogue  [Search] [Browse]  [User]   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Discover Premium Timepieces                                 │
│  Explore our extensive collection of luxury watches          │
│                                                               │
│  [Search Input: "Search by make or model..."]                │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                    │
│  │Watch │  │Watch │  │Watch │  │Watch │                    │
│  │Card  │  │Card  │  │Card  │  │Card  │                    │
│  └──────┘  └──────┘  └──────┘  └──────┘                    │
│                                                               │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                    │
│  │Watch │  │Watch │  │Watch │  │Watch │                    │
│  │Card  │  │Card  │  │Card  │  │Card  │                    │
│  └──────┘  └──────┘  └──────┘  └──────┘                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 2. Browse Page (/browse)
```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo] Watch Catalogue  [Search] [Browse]  [User]   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Browse Watch Collection                                     │
│  Explore watches by manufacturer or model                    │
│                                                               │
│  [Browse by Make] [Browse by Model]                          │
│  ─────────────                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Select a Watch Manufacturer                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Search manufacturers...]                            │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ [Rolex] [Omega] [Patek] [Audemars] [Cartier]       │    │
│  │ [TAG] [Breitling] [IWC] [Panerai] [Zenith]         │    │
│  │ [Longines] [Tudor] [Seiko] [Citizen] [Casio]       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  Rolex Collection                              3,805 watches │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                    │
│  │Watch │  │Watch │  │Watch │  │Watch │                    │
│  │ Img  │  │ Img  │  │ Img  │  │ Img  │                    │
│  │Model │  │Model │  │Model │  │Model │                    │
│  └──────┘  └──────┘  └──────┘  └──────┘                    │
│                                                               │
│  [Previous] [1] [2] [3] ... [191] [Next]                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 3. Browse by Model Flow (/browse)
```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo] Watch Catalogue  [Search] [Browse]  [User]   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Browse Watch Collection                                     │
│  Explore watches by manufacturer or model                    │
│                                                               │
│  [Browse by Make] [Browse by Model]                          │
│                   ─────────────                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Select a Watch Manufacturer                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Search manufacturers...]                            │    │
│  │ [Rolex] [Omega] [Patek] [Audemars] [Cartier]       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  2. Select a Model from Rolex                                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Search models...]                                   │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │ [Submariner Date]                                    │    │
│  │ [GMT-Master II]                                      │    │
│  │ [Daytona]                                            │    │
│  │ [Datejust 41]                                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  Submariner Date                                 245 watches │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                    │
│  │Watch │  │Watch │  │Watch │  │Watch │                    │
│  └──────┘  └──────┘  └──────┘  └──────┘                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 4. Watch Detail Page (/watch/[id])
```
┌─────────────────────────────────────────────────────────────┐
│ Header: [Logo] Watch Catalogue  [Search] [Browse]  [User]   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  [← Back]                                                    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ [Rolex]                              2017            │    │
│  │                                                       │    │
│  │ Submariner Date                                      │    │
│  │ Submariner Family                                    │    │
│  │                                                       │    │
│  │ Reference: 116610LN    Limited: No                   │    │
│  │ Movement: Rolex 3135   Price: €8,500                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Images                                               │    │
│  │ ┌────┐ ┌────┐ ┌────┐                                │    │
│  │ │Img1│ │Img2│ │Img3│                                │    │
│  │ └────┘ └────┘ └────┘                                │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Functions                                            │    │
│  │ [Hours, Minutes, Seconds] [Date] [Rotating Bezel]   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │ Case                 │  │ Dial                 │         │
│  │ Material: Steel      │  │ Color: Black         │         │
│  │ Shape: Round         │  │ Material: Lacquer    │         │
│  │ Diameter: 40mm       │  │ Indexes: Luminous    │         │
│  │ Water Resist: 300m   │  │ Hands: Mercedes      │         │
│  └──────────────────────┘  └──────────────────────┘         │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Caliber                                              │    │
│  │ Make: Rolex          Reference: 3135                │    │
│  │ Movement: Automatic  Jewels: 31                     │    │
│  │ Power Reserve: 48h   Frequency: 28,800 vph          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── MainLayout
│   ├── Header (with navigation)
│   │   ├── Logo
│   │   ├── Navigation Links
│   │   ├── Toggle (dark mode)
│   │   ├── UserInfo
│   │   └── Button (sign out)
│   └── Main Content
│       ├── Home Page (/)
│       │   ├── SearchSection
│       │   └── WatchGrid
│       │       └── WatchCard (multiple)
│       │
│       ├── Browse Page (/browse)
│       │   └── BrowseWatches
│       │       ├── Tab: BrowseByMake
│       │       │   ├── MakeSelector
│       │       │   ├── WatchListGrid
│       │       │   └── Pagination
│       │       └── Tab: BrowseByModel
│       │           ├── MakeSelector
│       │           ├── ModelSelector
│       │           ├── WatchListGrid
│       │           └── Pagination
│       │
│       └── Watch Detail Page (/watch/[id])
│           └── WatchDetailView
│               ├── Watch Info
│               ├── Image Gallery
│               ├── Functions
│               ├── Case Details
│               ├── Dial Details
│               ├── Caliber Details
│               └── Caliber Images
```

## Color Scheme

### Light Mode
- Background: `zinc-50` (#fafafa)
- Cards: `white` (#ffffff)
- Text: `zinc-900` (#18181b)
- Borders: `zinc-200` (#e4e4e7)
- Accent: `zinc-900` (#18181b)

### Dark Mode
- Background: `zinc-950` (#09090b)
- Cards: `zinc-900` (#18181b)
- Text: `white` (#ffffff)
- Borders: `zinc-800` (#27272a)
- Accent: `white` (#ffffff)

## Interactive States

### Buttons
- Default: Border with background
- Hover: Darker background, shadow
- Active: Selected state with accent color
- Disabled: 50% opacity

### Cards
- Default: Border, subtle shadow
- Hover: Lift effect (-translate-y-1), larger shadow
- Click: Navigate to detail page

### Navigation
- Active: Background highlight
- Inactive: Muted text color
- Hover: Text color change

## Responsive Breakpoints

- Mobile: < 768px (1 column)
- Tablet: 768px - 1024px (2-3 columns)
- Desktop: > 1024px (4 columns)

## Loading States

- Spinner for page loads
- Skeleton screens for content
- "Loading..." text for inline updates

## Error States

- Red background alert box
- Error message text
- Retry or back button

## Empty States

- Icon + message
- Helpful text
- Action button (if applicable)
