"use client";

import { useRouter } from "next/navigation";
import { useWatchDetails } from "@/lib/hooks/useWatches";
import { Spinner } from "../atoms/Spinner";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";

interface WatchDetailViewProps {
  watchId: number;
}

export const WatchDetailView: React.FC<WatchDetailViewProps> = ({ watchId }) => {
  const router = useRouter();
  const { data, isLoading, error } = useWatchDetails(watchId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-red-600 dark:text-red-400">
          Error loading watch details: {error.message}
        </p>
        <Button onClick={() => router.back()} variant="secondary">
          Go Back
        </Button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-zinc-500 dark:text-zinc-400">Watch not found</p>
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
      <Button onClick={() => router.back()} variant="secondary" className="px-6">
        ← Back
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
