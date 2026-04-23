// Make Types
export interface Make {
  makeId: number;
  makeName: string;
}

export interface MakesResponse {
  count: number;
  make: Make[];
}

// Model Types
export interface Model {
  modelId: number;
  modelName: string;
  makeId: number;
  makeName: string;
}

export interface ModelsResponse {
  count: number;
  models: Model[];
}

// Watch List Types
export interface WatchListItem {
  watchId: number;
  makeName: string;
  modelName: string;
  familyName: string;
  yearProducedName: string;
  limitedName: string;
  descriptionContent: string | null;
  movementName: string;
  functionName: string;
  priceInEuro: string;
  reference: string;
  watchImageName: string;
  url: string;
}

export interface WatchesListResponse {
  count: number;
  page: number;
  allPages: number;
  limit: number;
  watches: WatchListItem[];
}

// Watch Details Types
export interface WatchInfo {
  id: number;
  watchId: number;
  makeName: string;
  modelName: string;
  familyName: string;
  yearProducedName: string;
  limitedName: string;
  descriptionContent: string | null;
  movementName: string;
  priceInEuro: string;
  reference: string;
}

export interface WatchFunction {
  functionName: string;
}

export interface CaseDetail {
  caseMaterialName: string | null;
  caseGlassName: string | null;
  caseBackName: string | null;
  caseShapeName: string | null;
  caseDiameterName: string | null;
  caseHeightName: string | null;
  caseLugWidthName: string | null;
  caseBezelName: string | null;
  caseWRName: string | null;
  caseCoatingName: string | null;
}

export interface DialDetail {
  dialColorName: string | null;
  dialMaterialName: string | null;
  dialIndexesName: string | null;
  dialHandsName: string | null;
  dialNickName: string | null;
  dialFinishName: string | null;
}

export interface CaliberDetail {
  caliberMakeName: string | null;
  caliberReferenceName: string | null;
  caliberDescriptionContent: string | null;
  caliberMovementName: string | null;
  caliberDisplayName: string | null;
  caliberDiameterName: string | null;
  caliberJewelsName: string | null;
  caliberReserveName: string | null;
  caliberFrequencyName: string | null;
}

export interface CaliberDate {
  caliberDateName: string;
}

export interface CaliberChronograph {
  caliberChonographName: string;
}

export interface CaliberHands {
  caliberHandsName: string;
}

export interface CaliberAstronomical {
  caliberAstronomicalName: string;
}

export interface CaliberAdditional {
  caliberAdditionalsName: string;
}

export interface WatchImage {
  watchImageId: number;
  watchImageName: string;
  url: string;
}

export interface CaliberImage {
  id: number;
  caliberImageName: string;
  url: string;
}

export interface WatchDetailsResponse {
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
