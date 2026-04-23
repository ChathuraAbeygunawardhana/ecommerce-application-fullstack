# Watch Database API Integration

This document describes the integration of the Watch Database API into the application.

## Overview

The Watch Database API provides comprehensive information about luxury watches, including makes, models, detailed specifications, and images. All endpoints are integrated following the existing codebase architecture.

## API Configuration

Base URL: `https://watch-database1.p.rapidapi.com`

Required headers for all requests:
- `Content-Type: application/json`
- `x-rapidapi-host: watch-database1.p.rapidapi.com`
- `x-rapidapi-key: 970b4fa26fmsh397f674876f86dap1a656cjsna4e0c2863761`

Configuration is located in `src/lib/api/config.ts`.

## Implemented Endpoints

### 1. GET /make - Get All Watch Makes

Retrieves a list of all watch manufacturers.

**Service Method:**
```typescript
watchService.getMakes(): Promise<MakesResponse>
```

**Hook:**
```typescript
const { data, isLoading, error } = useWatchMakes();
```

**Response Type:**
```typescript
interface MakesResponse {
  count: number;
  make: Array<{
    makeId: number;
    makeName: string;
  }>;
}
```

### 2. GET /model/{makeId} - Get Models by Make

Retrieves all models for a specific watch manufacturer.

**Service Method:**
```typescript
watchService.getModelsByMake(makeId: number): Promise<ModelsResponse>
```

**Hook:**
```typescript
const { data, isLoading } = useModelsByMake(makeId, enabled);
```

**Response Type:**
```typescript
interface ModelsResponse {
  count: number;
  models: Array<{
    modelId: number;
    modelName: string;
    makeId: number;
    makeName: string;
  }>;
}
```

### 3. GET /watches/make/{makeId}/page/{page}/limit/{limit} - Get Watches by Make

Retrieves paginated watches for a specific manufacturer.

**Service Method:**
```typescript
watchService.getWatchesByMake(
  makeId: number,
  page?: number,
  limit?: number
): Promise<WatchesListResponse>
```

**Hook:**
```typescript
const { data, isLoading } = useWatchesByMake(makeId, page, limit, enabled);
```

**Response Type:**
```typescript
interface WatchesListResponse {
  count: number;
  page: number;
  allPages: number;
  limit: number;
  watches: WatchListItem[];
}
```

### 4. GET /watches/model/{modelId}/page/{page}/limit/{limit} - Get Watches by Model

Retrieves paginated watches for a specific model. Uses the same response structure as endpoint 3.

**Service Method:**
```typescript
watchService.getWatchesByModel(
  modelId: number,
  page?: number,
  limit?: number
): Promise<WatchesListResponse>
```

**Hook:**
```typescript
const { data, isLoading } = useWatchesByModel(modelId, page, limit, enabled);
```

### 5. GET /watch/{watchId} - Get Full Watch Details

Retrieves comprehensive details for a specific watch, including specifications, images, and caliber information.

**Service Method:**
```typescript
watchService.getWatchDetails(watchId: number): Promise<WatchDetailsResponse>
```

**Hook:**
```typescript
const { data, isLoading } = useWatchDetails(watchId, enabled);
```

**Response Type:**
```typescript
interface WatchDetailsResponse {
  watch: WatchInfo;
  watchFunctions: WatchFunction[];
  caseDetails: CaseDetail[];
  dialDetails: DialDetail[];
  caliberDetails: CaliberDetail[];
  caliberDate: CaliberDate[];
  caliberChronograph: CaliberChronograph[];
  caliberHands: CaliberHands[];
  caliberAstronomicals: CaliberAstronomical[];
  caliberAdditionals: CaliberAdditional[];
  watchImages: WatchImage[];
  caliberImages: CaliberImage[];
}
```

## File Structure

```
frontend/src/
├── lib/
│   ├── api/
│   │   ├── client.ts          # Updated with GET method for RapidApiClient
│   │   └── config.ts          # Added new endpoint configurations
│   ├── services/
│   │   └── watchService.ts    # Added 5 new service methods
│   ├── hooks/
│   │   └── useWatches.ts      # Added 5 new React Query hooks
│   └── types/
│       └── watch.types.ts     # NEW: Complete TypeScript types
└── components/
    └── examples/
        └── WatchDatabaseExample.tsx  # NEW: Example usage component
```

## Usage Examples

### Basic Usage

```typescript
import { useWatchMakes, useModelsByMake, useWatchDetails } from '@/lib/hooks/useWatches';

function MyComponent() {
  // Get all makes
  const { data: makes } = useWatchMakes();
  
  // Get models for a specific make
  const { data: models } = useModelsByMake(137); // Rolex
  
  // Get watch details
  const { data: watchDetails } = useWatchDetails(823851);
  
  return (
    // Your component JSX
  );
}
```

### Pagination Example

```typescript
function WatchList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useWatchesByMake(137, page, 20);
  
  return (
    <div>
      {data?.watches.map(watch => (
        <div key={watch.watchId}>{watch.modelName}</div>
      ))}
      
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page} of {data?.allPages}</span>
      <button onClick={() => setPage(p => p + 1)} disabled={page >= (data?.allPages || 1)}>
        Next
      </button>
    </div>
  );
}
```

### Conditional Loading

```typescript
function WatchSelector() {
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  
  // Only fetch models when a make is selected
  const { data: models } = useModelsByMake(selectedMakeId, !!selectedMakeId);
  
  return (
    // Your component JSX
  );
}
```

## Error Handling

All service methods include try-catch blocks and throw descriptive errors:

```typescript
try {
  const makes = await watchService.getMakes();
} catch (error) {
  console.error('Failed to fetch makes:', error.message);
}
```

React Query hooks automatically handle errors:

```typescript
const { data, error, isError } = useWatchMakes();

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

## Type Safety

All API responses are fully typed with TypeScript interfaces. Nullable fields are properly typed as `string | null` to ensure type safety throughout the application.

## Caching Strategy

React Query hooks include appropriate caching strategies:
- Makes: 1 hour stale time (rarely changes)
- Models: 30 minutes stale time
- Watch lists: `keepPreviousData: true` for smooth pagination
- Watch details: Default caching

## Demo Component

A complete example component is available at `src/components/examples/WatchDatabaseExample.tsx` that demonstrates all 5 endpoints with a functional UI.

## Testing the Integration

1. Import the example component in a page
2. Navigate to the page in your browser
3. Click through makes, models, and watches to test all endpoints
4. Check browser console for any errors
5. Verify API responses match expected types

## Notes

- All endpoints use the same RapidAPI credentials configured in `config.ts`
- The API client automatically adds required headers to all requests
- Pagination is handled consistently across endpoints 3 and 4
- All nullable fields are handled gracefully in the type definitions
- The existing search endpoint remains unchanged and functional
