'use client';

import { useState } from 'react';
import {
  useWatchMakes,
  useModelsByMake,
  useWatchesByMake,
  useWatchesByModel,
  useWatchDetails,
} from '@/lib/hooks/useWatches';

/**
 * Example component demonstrating all Watch Database API endpoints
 * 
 * This component shows how to:
 * 1. Fetch and display all watch makes
 * 2. Fetch models for a selected make
 * 3. Fetch paginated watches by make
 * 4. Fetch paginated watches by model
 * 5. Fetch detailed information for a specific watch
 */
export default function WatchDatabaseExample() {
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [selectedWatchId, setSelectedWatchId] = useState<number | null>(null);
  const [makePage, setMakePage] = useState(1);
  const [modelPage, setModelPage] = useState(1);

  // 1. Fetch all makes
  const { data: makesData, isLoading: makesLoading, error: makesError } = useWatchMakes();

  // 2. Fetch models for selected make
  const { data: modelsData, isLoading: modelsLoading } = useModelsByMake(
    selectedMakeId,
    !!selectedMakeId
  );

  // 3. Fetch watches by make (paginated)
  const { data: watchesByMakeData, isLoading: watchesByMakeLoading } = useWatchesByMake(
    selectedMakeId,
    makePage,
    20,
    !!selectedMakeId
  );

  // 4. Fetch watches by model (paginated)
  const { data: watchesByModelData, isLoading: watchesByModelLoading } = useWatchesByModel(
    selectedModelId,
    modelPage,
    20,
    !!selectedModelId
  );

  // 5. Fetch watch details
  const { data: watchDetailsData, isLoading: watchDetailsLoading } = useWatchDetails(
    selectedWatchId,
    !!selectedWatchId
  );

  if (makesError) {
    return <div className="p-4 text-red-600">Error loading makes: {makesError.message}</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Watch Database API Integration</h1>

      {/* Section 1: Watch Makes */}
      <section className="border rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">1. Watch Makes ({makesData?.count || 0})</h2>
        {makesLoading ? (
          <p>Loading makes...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
            {makesData?.make.map((make: { makeId: number; makeName: string }) => (
              <button
                key={make.makeId}
                onClick={() => {
                  setSelectedMakeId(make.makeId);
                  setSelectedModelId(null);
                  setSelectedWatchId(null);
                  setMakePage(1);
                }}
                className={`p-2 text-sm border rounded hover:bg-gray-100 ${
                  selectedMakeId === make.makeId ? 'bg-blue-100 border-blue-500' : ''
                }`}
              >
                {make.makeName}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: Models by Make */}
      {selectedMakeId && (
        <section className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">
            2. Models for Make ID {selectedMakeId} ({modelsData?.count || 0})
          </h2>
          {modelsLoading ? (
            <p>Loading models...</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {modelsData?.models.slice(0, 50).map((model: { modelId: number; modelName: string }) => (
                <button
                  key={model.modelId}
                  onClick={() => {
                    setSelectedModelId(model.modelId);
                    setSelectedWatchId(null);
                    setModelPage(1);
                  }}
                  className={`block w-full text-left p-2 text-sm border rounded hover:bg-gray-100 ${
                    selectedModelId === model.modelId ? 'bg-blue-100 border-blue-500' : ''
                  }`}
                >
                  {model.modelName} (ID: {model.modelId})
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Section 3: Watches by Make */}
      {selectedMakeId && !selectedModelId && (
        <section className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">
            3. Watches by Make (Page {watchesByMakeData?.page} of {watchesByMakeData?.allPages})
          </h2>
          {watchesByMakeLoading ? (
            <p>Loading watches...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {watchesByMakeData?.watches.map((watch: any) => (
                  <div
                    key={watch.watchId}
                    onClick={() => setSelectedWatchId(watch.watchId)}
                    className="border rounded p-3 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    {watch.url && (
                      <img
                        src={watch.url}
                        alt={watch.modelName}
                        className="w-full h-48 object-cover rounded mb-2"
                      />
                    )}
                    <h3 className="font-semibold">{watch.modelName}</h3>
                    <p className="text-sm text-gray-600">{watch.familyName}</p>
                    <p className="text-xs text-gray-500">Ref: {watch.reference}</p>
                    <p className="text-xs text-gray-500">{watch.yearProducedName}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setMakePage((p) => Math.max(1, p - 1))}
                  disabled={makePage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {makePage} of {watchesByMakeData?.allPages}
                </span>
                <button
                  onClick={() => setMakePage((p) => p + 1)}
                  disabled={makePage >= (watchesByMakeData?.allPages || 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* Section 4: Watches by Model */}
      {selectedModelId && (
        <section className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">
            4. Watches by Model (Page {watchesByModelData?.page} of {watchesByModelData?.allPages})
          </h2>
          {watchesByModelLoading ? (
            <p>Loading watches...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {watchesByModelData?.watches.map((watch: any) => (
                  <div
                    key={watch.watchId}
                    onClick={() => setSelectedWatchId(watch.watchId)}
                    className="border rounded p-3 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    {watch.url && (
                      <img
                        src={watch.url}
                        alt={watch.modelName}
                        className="w-full h-48 object-cover rounded mb-2"
                      />
                    )}
                    <h3 className="font-semibold">{watch.modelName}</h3>
                    <p className="text-sm text-gray-600">{watch.familyName}</p>
                    <p className="text-xs text-gray-500">Ref: {watch.reference}</p>
                    <p className="text-xs text-gray-500">{watch.yearProducedName}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setModelPage((p) => Math.max(1, p - 1))}
                  disabled={modelPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {modelPage} of {watchesByModelData?.allPages}
                </span>
                <button
                  onClick={() => setModelPage((p) => p + 1)}
                  disabled={modelPage >= (watchesByModelData?.allPages || 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* Section 5: Watch Details */}
      {selectedWatchId && (
        <section className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">5. Watch Details (ID: {selectedWatchId})</h2>
          {watchDetailsLoading ? (
            <p>Loading watch details...</p>
          ) : watchDetailsData ? (
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><strong>Make:</strong> {watchDetailsData.watch.makeName}</div>
                  <div><strong>Model:</strong> {watchDetailsData.watch.modelName}</div>
                  <div><strong>Family:</strong> {watchDetailsData.watch.familyName}</div>
                  <div><strong>Year:</strong> {watchDetailsData.watch.yearProducedName}</div>
                  <div><strong>Reference:</strong> {watchDetailsData.watch.reference}</div>
                  <div><strong>Limited:</strong> {watchDetailsData.watch.limitedName}</div>
                  <div><strong>Movement:</strong> {watchDetailsData.watch.movementName}</div>
                </div>
              </div>

              {/* Images */}
              {watchDetailsData.watchImages.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Watch Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {watchDetailsData.watchImages.map((img: any) => (
                      <img
                        key={img.watchImageId}
                        src={img.url}
                        alt={img.watchImageName}
                        className="w-full h-40 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Functions */}
              {watchDetailsData.watchFunctions.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Functions</h3>
                  <ul className="list-disc list-inside text-sm">
                    {watchDetailsData.watchFunctions.map((func: any, idx: number) => (
                      <li key={idx}>{func.functionName}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Case Details */}
              {watchDetailsData.caseDetails.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Case Details</h3>
                  {watchDetailsData.caseDetails.map((caseDetail: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-2 gap-2 text-sm">
                      {caseDetail.caseMaterialName && <div><strong>Material:</strong> {caseDetail.caseMaterialName}</div>}
                      {caseDetail.caseShapeName && <div><strong>Shape:</strong> {caseDetail.caseShapeName}</div>}
                      {caseDetail.caseDiameterName && <div><strong>Diameter:</strong> {caseDetail.caseDiameterName}</div>}
                      {caseDetail.caseHeightName && <div><strong>Height:</strong> {caseDetail.caseHeightName}</div>}
                      {caseDetail.caseLugWidthName && <div><strong>Lug Width:</strong> {caseDetail.caseLugWidthName}</div>}
                      {caseDetail.caseGlassName && <div><strong>Glass:</strong> {caseDetail.caseGlassName}</div>}
                      {caseDetail.caseBackName && <div><strong>Back:</strong> {caseDetail.caseBackName}</div>}
                      {caseDetail.caseWRName && <div><strong>Water Resistance:</strong> {caseDetail.caseWRName}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Dial Details */}
              {watchDetailsData.dialDetails.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dial Details</h3>
                  {watchDetailsData.dialDetails.map((dial: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-2 gap-2 text-sm">
                      {dial.dialColorName && <div><strong>Color:</strong> {dial.dialColorName}</div>}
                      {dial.dialMaterialName && <div><strong>Material:</strong> {dial.dialMaterialName}</div>}
                      {dial.dialIndexesName && <div><strong>Indexes:</strong> {dial.dialIndexesName}</div>}
                      {dial.dialHandsName && <div><strong>Hands:</strong> {dial.dialHandsName}</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Caliber Details */}
              {watchDetailsData.caliberDetails.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Caliber Details</h3>
                  {watchDetailsData.caliberDetails.map((caliber: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-2 gap-2 text-sm">
                      {caliber.caliberMakeName && <div><strong>Make:</strong> {caliber.caliberMakeName}</div>}
                      {caliber.caliberReferenceName && <div><strong>Reference:</strong> {caliber.caliberReferenceName}</div>}
                      {caliber.caliberMovementName && <div><strong>Movement:</strong> {caliber.caliberMovementName}</div>}
                      {caliber.caliberDiameterName && <div><strong>Diameter:</strong> {caliber.caliberDiameterName} mm</div>}
                      {caliber.caliberJewelsName && <div><strong>Jewels:</strong> {caliber.caliberJewelsName}</div>}
                      {caliber.caliberReserveName && <div><strong>Power Reserve:</strong> {caliber.caliberReserveName}h</div>}
                      {caliber.caliberFrequencyName && <div><strong>Frequency:</strong> {caliber.caliberFrequencyName} vph</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* Caliber Images */}
              {watchDetailsData.caliberImages.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Caliber Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {watchDetailsData.caliberImages.map((img: any) => (
                      <img
                        key={img.id}
                        src={img.url}
                        alt={img.caliberImageName}
                        className="w-full h-40 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </section>
      )}
    </div>
  );
}
