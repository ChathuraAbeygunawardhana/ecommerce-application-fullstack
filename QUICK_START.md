# Quick Start Guide

## Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:3000`

## Using the Application

### Sign In
1. Navigate to `/sign-in`
2. Enter credentials
3. Click "Sign In"

### Search Watches (Home Page)
1. Enter search term (e.g., "Rolex", "Submariner")
2. View results in grid
3. Click any watch to view details

### Browse by Manufacturer
1. Click "Browse" in header
2. Select "Browse by Make" tab
3. Search or click a manufacturer
4. Browse paginated results
5. Click any watch to view details

### Browse by Model
1. Click "Browse" in header
2. Select "Browse by Model" tab
3. Select a manufacturer
4. Select a model
5. Browse paginated results
6. Click any watch to view details

### View Watch Details
1. Click any watch card
2. View comprehensive specifications
3. Browse images
4. Click "Back" to return

## API Endpoints Used

All endpoints are automatically called by the hooks:

```typescript
// Get all manufacturers
const { data } = useWatchMakes();

// Get models for a manufacturer
const { data } = useModelsByMake(makeId);

// Get watches by manufacturer (paginated)
const { data } = useWatchesByMake(makeId, page, limit);

// Get watches by model (paginated)
const { data } = useWatchesByModel(modelId, page, limit);

// Get watch details
const { data } = useWatchDetails(watchId);
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Home (search)
│   │   ├── browse/
│   │   │   └── page.tsx       # Browse page
│   │   └── watch/[id]/
│   │       └── page.tsx       # Watch detail
│   ├── components/
│   │   ├── atoms/             # Basic components
│   │   ├── molecules/         # Composite components
│   │   ├── organisms/         # Complex components
│   │   └── templates/         # Page layouts
│   └── lib/
│       ├── api/               # API client & config
│       ├── hooks/             # React Query hooks
│       ├── services/          # API services
│       └── types/             # TypeScript types
```

## Key Files

### API Integration
- `lib/api/client.ts` - HTTP client
- `lib/api/config.ts` - API endpoints
- `lib/services/watchService.ts` - Service methods
- `lib/hooks/useWatches.ts` - React Query hooks
- `lib/types/watch.types.ts` - TypeScript types

### Pages
- `app/page.tsx` - Home/search page
- `app/browse/page.tsx` - Browse page
- `app/watch/[id]/page.tsx` - Watch detail page

### Components
- `organisms/BrowseWatches.tsx` - Browse container
- `organisms/BrowseByMake.tsx` - Browse by make
- `organisms/BrowseByModel.tsx` - Browse by model
- `organisms/WatchDetailView.tsx` - Watch details
- `molecules/MakeSelector.tsx` - Manufacturer selector
- `molecules/ModelSelector.tsx` - Model selector
- `molecules/WatchListGrid.tsx` - Watch grid
- `molecules/Pagination.tsx` - Pagination

## Common Tasks

### Add a New Filter
1. Update the service method to accept filter params
2. Update the hook to pass filter params
3. Add filter UI to the component
4. Update state management

### Customize Styling
All components use Tailwind CSS classes. Modify classes directly in components.

### Add a New Page
1. Create page in `app/` directory
2. Add route to navigation in `Header.tsx`
3. Implement page component
4. Add to layout if needed

### Modify API Calls
1. Update service method in `watchService.ts`
2. Update hook in `useWatches.ts`
3. Update types in `watch.types.ts` if needed

## Troubleshooting

### API Errors
- Check API key in `lib/api/config.ts`
- Verify network requests in browser DevTools
- Check console for error messages

### TypeScript Errors
- Run `npm run build` to check for errors
- Ensure all types are imported correctly
- Check `watch.types.ts` for type definitions

### Styling Issues
- Check Tailwind classes are correct
- Verify dark mode classes (dark:)
- Check responsive breakpoints (md:, lg:)

### Data Not Loading
- Check React Query DevTools
- Verify API responses in Network tab
- Check hook enabled conditions
- Verify cache settings

## Development Tips

### Hot Reload
Changes to components auto-reload. If issues occur, restart dev server.

### Dark Mode Testing
Toggle dark mode using the switch in header.

### Responsive Testing
Use browser DevTools device emulation.

### API Testing
Use browser Network tab to inspect API calls and responses.

## Building for Production

```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_RAPIDAPI_KEY=your_api_key_here
```

## Documentation

- `FRONTEND_IMPLEMENTATION_SUMMARY.md` - Complete implementation overview
- `BROWSE_FEATURE.md` - Browse feature documentation
- `WATCH_API_INTEGRATION.md` - API integration details
- `WATCH_API_QUICK_START.md` - API usage examples
- `VISUAL_GUIDE.md` - Visual structure guide

## Support

For issues or questions:
1. Check documentation files
2. Review component code
3. Check TypeScript types
4. Inspect API responses
5. Review React Query cache

## Next Steps

1. Test all features
2. Customize styling if needed
3. Add additional features
4. Deploy to production
