"use client";

import { useRouter } from "next/navigation";
import { useWatchDetails } from "@/lib/hooks/useWatches";
import { Spinner } from "@/components/atoms/Spinner";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";

interface WatchDetailViewProps {
  watchId: number;
}

export const WatchDetailView: React.FC<WatchDetailViewProps> = ({ watchId }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useWatchDetails(watchId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    const isRateLimited = error.message.includes('429');
    
    return (
      <div className="text-center py-20 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
          <svg
            className="w-8 h-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            {isRateLimited ? 'Too Many Requests' : 'Error Loading Watch Details'}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            {isRateLimited 
              ? 'The API rate limit has been reached. Please wait a moment and try again.'
              : error.message}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Button onClick={() => router.back()} variant="secondary">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go Back
          </Button>
          <Button onClick={() => refetch()} variant="primary">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
          <svg
            className="w-8 h-8 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Watch Not Found</h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          The watch you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.back()} variant="secondary">
          Go Back
        </Button>
      </div>
    );
  }

  const { watch, watchImages, watchFunctions, caseDetails, dialDetails, caliberDetails, caliberImages } = data;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button onClick={() => router.back()} variant="secondary" className="px-6 flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Button>

      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
        <div className="flex items-start justify-between mb-4">
          <Badge>{watch.makeName}</Badge>
          {watch.yearProducedName && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {watch.yearProducedName}
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          {watch.modelName}
        </h1>
        {watch.familyName && (
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-4">
            {watch.familyName} Family
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Reference</div>
            <div className="font-semibold text-zinc-900 dark:text-white">{watch.reference}</div>
          </div>
          <div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Limited</div>
            <div className="font-semibold text-zinc-900 dark:text-white">{watch.limitedName}</div>
          </div>
          <div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">Movement</div>
            <div className="font-semibold text-zinc-900 dark:text-white">{watch.movementName}</div>
          </div>
          {watch.priceInEuro && (
            <div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Price</div>
              <div className="font-semibold text-zinc-900 dark:text-white">€{watch.priceInEuro}</div>
            </div>
          )}
        </div>
      </div>

      {/* Images */}
      {watchImages.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchImages.map((img: any) => (
              <div key={img.watchImageId} className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden">
                <img
                  src={img.url}
                  alt={img.watchImageName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Functions */}
      {watchFunctions.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Functions</h2>
          <div className="flex flex-wrap gap-2">
            {watchFunctions.map((func: any, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-full text-sm font-medium"
              >
                {func.functionName}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Case Details */}
        {caseDetails.length > 0 && caseDetails[0] && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Case</h2>
            <div className="space-y-3">
              {caseDetails[0].caseMaterialName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Material</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{caseDetails[0].caseMaterialName}</span>
                </div>
              )}
              {caseDetails[0].caseShapeName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Shape</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{caseDetails[0].caseShapeName}</span>
                </div>
              )}
              {caseDetails[0].caseDiameterName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Diameter</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{caseDetails[0].caseDiameterName}</span>
                </div>
              )}
              {caseDetails[0].caseHeightName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Height</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{caseDetails[0].caseHeightName}</span>
                </div>
              )}
              {caseDetails[0].caseLugWidthName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Lug Width</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{caseDetails[0].caseLugWidthName}</span>
                </div>
              )}
              {caseDetails[0].caseGlassName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Glass</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{caseDetails[0].caseGlassName}</span>
                </div>
              )}
              {caseDetails[0].caseBackName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Back</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{caseDetails[0].caseBackName}</span>
                </div>
              )}
              {caseDetails[0].caseWRName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Water Resistance</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{caseDetails[0].caseWRName}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dial Details */}
        {dialDetails.length > 0 && dialDetails[0] && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Dial</h2>
            <div className="space-y-3">
              {dialDetails[0].dialColorName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Color</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{dialDetails[0].dialColorName}</span>
                </div>
              )}
              {dialDetails[0].dialMaterialName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Material</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{dialDetails[0].dialMaterialName}</span>
                </div>
              )}
              {dialDetails[0].dialIndexesName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Indexes</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{dialDetails[0].dialIndexesName}</span>
                </div>
              )}
              {dialDetails[0].dialHandsName && (
                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Hands</span>
                  <span className="font-medium text-zinc-900 dark:text-white">{dialDetails[0].dialHandsName}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Caliber Details */}
      {caliberDetails.length > 0 && caliberDetails[0] && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Caliber</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {caliberDetails[0].caliberMakeName && (
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Make</span>
                <span className="font-medium text-zinc-900 dark:text-white">{caliberDetails[0].caliberMakeName}</span>
              </div>
            )}
            {caliberDetails[0].caliberReferenceName && (
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Reference</span>
                <span className="font-medium text-zinc-900 dark:text-white">{caliberDetails[0].caliberReferenceName}</span>
              </div>
            )}
            {caliberDetails[0].caliberMovementName && (
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Movement</span>
                <span className="font-medium text-zinc-900 dark:text-white">{caliberDetails[0].caliberMovementName}</span>
              </div>
            )}
            {caliberDetails[0].caliberDisplayName && (
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Display</span>
                <span className="font-medium text-zinc-900 dark:text-white">{caliberDetails[0].caliberDisplayName}</span>
              </div>
            )}
            {caliberDetails[0].caliberDiameterName && (
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Diameter</span>
                <span className="font-medium text-zinc-900 dark:text-white">{caliberDetails[0].caliberDiameterName} mm</span>
              </div>
            )}
            {caliberDetails[0].caliberJewelsName && (
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Jewels</span>
                <span className="font-medium text-zinc-900 dark:text-white">{caliberDetails[0].caliberJewelsName}</span>
              </div>
            )}
            {caliberDetails[0].caliberReserveName && (
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Power Reserve</span>
                <span className="font-medium text-zinc-900 dark:text-white">{caliberDetails[0].caliberReserveName}h</span>
              </div>
            )}
            {caliberDetails[0].caliberFrequencyName && (
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Frequency</span>
                <span className="font-medium text-zinc-900 dark:text-white">{caliberDetails[0].caliberFrequencyName} vph</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Caliber Images */}
      {caliberImages.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Caliber Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {caliberImages.map((img: any) => (
              <div key={img.id} className="aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden">
                <img
                  src={img.url}
                  alt={img.caliberImageName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
