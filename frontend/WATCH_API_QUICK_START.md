# Watch Database API - Quick Start Guide

## Installation

No additional packages needed. The integration uses existing dependencies.

## Quick Usage

### 1. Get All Watch Brands

```typescript
import { useWatchMakes } from '@/lib/hooks/useWatches';

function BrandSelector() {
  const { data, isLoading } = useWatchMakes();
  
  return (
    <select>
      {data?.make.map(make => (
        <option key={make.makeId} value={make.makeId}>
          {make.makeName}
        </option>
      ))}
    </select>
  );
}
```

### 2. Get Models for a Brand

```typescript
import { useModelsByMake } from '@/lib/hooks/useWatches';

function ModelSelector({ makeId }: { makeId: number }) {
  const { data } = useModelsByMake(makeId);
  
  return (
    <div>
      {data?.models.map(model => (
        <div key={model.modelId}>{model.modelName}</div>
      ))}
    </div>
  );
}
```

### 3. Get Watches with Pagination

```typescript
import { useWatchesByMake } from '@/lib/hooks/useWatches';
import { useState } from 'react';

function WatchList({ makeId }: { makeId: number }) {
  const [page, setPage] = useState(1);
  const { data } = useWatchesByMake(makeId, page, 20);
  
  return (
    <div>
      {data?.watches.map(watch => (
        <div key={watch.watchId}>
          <img src={watch.url} alt={watch.modelName} />
          <h3>{watch.modelName}</h3>
          <p>{watch.reference}</p>
        </div>
      ))}
      
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page} of {data?.allPages}</span>
      <button onClick={() => setPage(p => p + 1)}>
        Next
      </button>
    </div>
  );
}
```

### 4. Get Watch Details

```typescript
import { useWatchDetails } from '@/lib/hooks/useWatches';

function WatchDetail({ watchId }: { watchId: number }) {
  const { data, isLoading } = useWatchDetails(watchId);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{data?.watch.makeName} {data?.watch.modelName}</h1>
      <p>Reference: {data?.watch.reference}</p>
      <p>Year: {data?.watch.yearProducedName}</p>
      
      {/* Case Details */}
      {data?.caseDetails[0] && (
        <div>
          <h2>Case</h2>
          <p>Material: {data.caseDetails[0].caseMaterialName}</p>
          <p>Diameter: {data.caseDetails[0].caseDiameterName}</p>
        </div>
      )}
      
      {/* Images */}
      <div>
        {data?.watchImages.map(img => (
          <img key={img.watchImageId} src={img.url} alt={img.watchImageName} />
        ))}
      </div>
    </div>
  );
}
```

## Direct Service Calls

If you need to call the API outside of React components:

```typescript
import { watchService } from '@/lib/services/watchService';

// Get makes
const makes = await watchService.getMakes();

// Get models
const models = await watchService.getModelsByMake(137);

// Get watches
const watches = await watchService.getWatchesByMake(137, 1, 20);

// Get watch details
const details = await watchService.getWatchDetails(823851);
```

## Common Patterns

### Conditional Loading

```typescript
const [makeId, setMakeId] = useState<number | null>(null);

// Only fetch when makeId is set
const { data } = useModelsByMake(makeId, !!makeId);
```

### Error Handling

```typescript
const { data, error, isError } = useWatchMakes();

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

### Loading States

```typescript
const { data, isLoading, isFetching } = useWatchesByMake(makeId, page, 20);

if (isLoading) return <div>Loading...</div>;
if (isFetching) return <div>Updating...</div>;
```

## Type Imports

```typescript
import type {
  Make,
  Model,
  WatchListItem,
  WatchDetailsResponse,
  MakesResponse,
  ModelsResponse,
  WatchesListResponse
} from '@/lib/types/watch.types';
```

## Demo Component

See `src/components/examples/WatchDatabaseExample.tsx` for a complete working example with all endpoints.

## API Limits

- Default pagination: 20 items per page
- Adjust with the `limit` parameter (e.g., `useWatchesByMake(makeId, page, 50)`)
- Maximum limit depends on API provider

## Troubleshooting

1. Check API key in `src/lib/api/config.ts`
2. Verify network requests in browser DevTools
3. Check React Query DevTools for cache state
4. Ensure QueryProvider wraps your app (already configured)
