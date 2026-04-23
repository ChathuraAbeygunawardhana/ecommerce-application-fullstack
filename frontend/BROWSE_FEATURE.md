# Watch Browse Feature

## Overview

A comprehensive watch browsing interface that allows users to explore the watch database by manufacturer or model, with detailed watch information pages.

## Features

### 1. Browse by Manufacturer
- View all watch manufacturers (166 brands)
- Search/filter manufacturers
- Select a manufacturer to view their watches
- Paginated watch listings (20 per page)
- Click any watch to view full details

### 2. Browse by Model
- Two-step selection process:
  1. Select a manufacturer
  2. Select a specific model from that manufacturer
- View all watches for a specific model
- Paginated results
- Click any watch to view full details

### 3. Watch Detail Page
- Comprehensive watch information including:
  - Basic info (make, model, family, year, reference)
  - Multiple high-quality images
  - Functions and complications
  - Case specifications (material, shape, diameter, etc.)
  - Dial details (color, material, indexes, hands)
  - Caliber/movement specifications
  - Caliber images

## Pages

### `/browse`
Main browsing interface with tabs for "Browse by Make" and "Browse by Model"

### `/watch/[id]`
Dynamic route for individual watch details

## Components

### Organisms (Complex Components)
- `BrowseWatches` - Main container with tab navigation
- `BrowseByMake` - Browse watches by manufacturer
- `BrowseByModel` - Browse watches by model (two-step)
- `WatchDetailView` - Detailed watch information display

### Molecules (Composite Components)
- `MakeSelector` - Grid of manufacturer buttons with search
- `ModelSelector` - List of models with search
- `WatchListGrid` - Grid display of watch cards
- `Pagination` - Page navigation component

## Usage

### Navigate to Browse Page

From the home page, click the "Browse by Manufacturer or Model" button, or navigate directly to `/browse`.

### Browse by Make Flow

1. Select a manufacturer from the grid
2. View all watches from that manufacturer
3. Use pagination to browse through results
4. Click any watch to view details

### Browse by Model Flow

1. Select a manufacturer from the grid
2. Select a specific model from the list
3. View all watches for that model
4. Use pagination to browse through results
5. Click any watch to view details

### Watch Detail Page

- View comprehensive specifications
- Browse multiple images
- See all technical details
- Click "Back" to return to browse page

## Design System

All components follow the existing design system:
- Zinc color palette (light/dark mode)
- Rounded corners (rounded-2xl for cards)
- Consistent spacing and typography
- Smooth transitions and hover effects
- Responsive grid layouts

## State Management

- React Query for data fetching and caching
- Local state for UI interactions (selected make/model, pagination)
- Automatic cache invalidation and refetching

## Performance

- Smart caching (1hr for makes, 30min for models)
- Pagination to limit data transfer
- `keepPreviousData` for smooth page transitions
- Lazy loading of watch details
- Optimized image loading

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where appropriate
- Focus states on interactive elements
- Responsive design for all screen sizes

## API Integration

Uses all 5 Watch Database API endpoints:
1. GET /make - List manufacturers
2. GET /model/{makeId} - List models by make
3. GET /watches/make/{makeId}/page/{page}/limit/{limit} - Watches by make
4. GET /watches/model/{modelId}/page/{page}/limit/{limit} - Watches by model
5. GET /watch/{watchId} - Watch details

## Future Enhancements

Potential improvements:
- Add filters (year, price range, complications)
- Implement favorites/wishlist
- Add comparison feature
- Enable social sharing
- Add watch history tracking
- Implement advanced search
- Add sorting options (price, year, name)
