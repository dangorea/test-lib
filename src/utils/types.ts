import type { USER_TYPES } from "./config";
import type { TOUR_VISIBILITY } from "../store/constants/tours";

export interface State extends CommonState {
  data:
    | {
        page: Tour[];
        metadata: PaginationMetadata;
      }
    | Record<string, never>;
  currentTour: Tour | null;
}

export interface RootState {
  tours: State;
  images: any;
}

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

export type StartingPoint = {
  sphereId: string;
  ath: string;
  atv: string;
  fov: string;
  coverUrl: string;
  previewUrl: string;
  thumbUrl: string;
};

export interface Image360 {
  id: string;
  createdAt: number;
  updatedAt: number;
  name: string;
  status: any;
  title: string;
  thumb: string;
  preview: string;
  view: {
    fisheye: string;
    stereographic: string;
    pannini: string;
    hlookat: string;
    vlookat: string;
    fovtype: string;
    fov: string;
    maxpixelzoom: string;
    fovmin: string;
    fovmax: string;
    limitview: string;
  };
  image: {
    type: SPHERE_TYPES;
    multires: string;
    tilesize: string;
    levels: {
      tiledimagewidth: string;
      tiledimageheight: string;
      cube: {
        url: string;
      };
      cylinder: {
        url: string;
      };
      sphere: {
        url: string;
      };
    }[];
  };
  hotSpots: Hotspot[];
  links: LinkHotspot[];
  wixProducts: ProductHotspot[];
  startingPoint: StartingPoint;
  exif: {
    [fileInfo: string]: string;
  };
  userTags: string[];
  index?: number;
}

export enum SPHERE_TYPES {
  CUBE = "CUBE",
  CYLINDER = "CYLINDER",
  SPHERE = "SPHERE",
}

export interface Tour {
  id: string;
  user: {
    nickname: string;
    userType: USER_TYPES;
  };
  createdAt: number;
  updatedAt: number;
  title: string;
  description: string;
  sphereCount: number;
  keypoints: unknown[];
  spheres: Image360[];
  startingPoint: StartingPoint;
  visibility: TOUR_VISIBILITY;
  editable: boolean;
  userTags: unknown[];
  tourFloorPlan: { levels: Level[]; showHotspotTitles: boolean };
}

export interface PaginationMetadata {
  numberOfPage: number;
  numberOfPageElements: number;
  perPage: number;
  totalPages: number;
}

export interface Reducers<State> {
  [actionName: string]: (state: State, payload: any) => State | any;
}

export interface CommonState {
  data: any;
  isLoading: boolean;
  error: null | string;
}

export type Icon = {
  createdAt: number;
  id: string;
  name: string;
  serviceTags: string[];
  status: any;
  title: string;
  updatedAt: number;
  userId: string;
  userTags: string[];
};

export interface FloorPlan {
  id: string;
  name: string;
  title: string;
  mediaId: string | undefined;
  links: Link[];
}

export type Link = {
  activeColor?: string;
  ath: string;
  atv: string;
  color?: string;
  height?: string;
  name?: string;
  hotspotStartingPoint?: StartingPoint;
  id: string;
  style?: string;
  target: string;
  title?: string;
  width?: string;
  toUpload?: boolean;
};

export type Level = {
  id: string;
  name: string;
  title: string;
  url: string;
  links: Link[];
};

export type ViewerDropResult = {
  x: number;
  y: number;
};

export type SUBSCRIPTION_PLAN = {
  id: USER_TYPES;
  name: string;
  sphereLimitPerTour: number;
  tourLimit: number;
  features: string[];
};
