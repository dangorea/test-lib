import type { CommonState, PaginationMetadata, Tour } from "../../utils/types";

export interface State extends CommonState {
  data:
    | {
        page: Tour[];
        metadata: PaginationMetadata;
      }
    | Record<string, never>;
  currentTour: Tour | null;
  test: string;
}

export type SphereViewOptions = {
  ath: number;
  atv: number;
  fov: number;
  sphereId: string;
};

export type PanelProperties = {
  type: string;
  size: number;
  units: string;
};

export type HotspotStaringPoint = {
  sphereId: string;
  ath: string;
  atv: string;
  fov: string;
  coverUrl?: string;
  previewUrl?: string;
  thumbUrl?: string;
};

export type Hotspot = {
  id: string;
  name: string;
  type: HOTSPOT_TYPES;
  content: string;
  ath: string;
  atv: string;
  style: string;
  color: string;
  panelProperties?: PanelProperties;
  title?: string;
  target?: string;
  wixProductId?: string;
  productSphereId?: string;
  hotspotStartingPoint?: HotspotStaringPoint;
  width?: string;
  height?: string;
  size?: string;
};

export type LinkHotspot = {
  id: string;
  ath: string;
  atv: string;
  style: string;
  color: string;
  title: string;
  target: string;
  hotspotStartingPoint: HotspotStaringPoint;
};

export type ProductHotspot = {
  id: string;
  ath: string;
  atv: string;
  style: string;
  color: string;
  title: string;
  wixProductId: string;
};

export enum HOTSPOT_TYPES {
  PRODUCT = "PRODUCT",
  URL = "URL",
  INFO = "INFO",
  LINK = "LINK",
  GALLERY = "GALLERY",
  FLAT = "FLAT",
}
