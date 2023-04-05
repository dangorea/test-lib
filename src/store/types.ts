import type { State as ImagesState } from "./images/types";
import type {
  Hotspot,
  LinkHotspot,
  ProductHotspot,
  State as ToursState,
} from "./tours/types";
import type { State as NotificationsState } from "./notifications/types";
import type { State as WidgetState } from "./widget/types";
import type { State as ViewerState } from "./viewer/types";
import type { TOUR_VISIBILITY } from "./constants/tours";
import type { IMAGE_STATUSES } from "./constants/images";

export interface RootState {
  images: ImagesState;
  tours: ToursState;
  notifications: NotificationsState;
  viewer: ViewerState;
  widget: WidgetState;
  config: {
    source: string;
    bucket: string;
  };
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
  status: IMAGE_STATUSES;
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
    levels: Array<{
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
    }>;
  };
  hotSpots: Hotspot[];
  links: LinkHotspot[];
  wixProducts: Array<ProductHotspot>;
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
    userType: "FREE" | "PRO";
  };
  createdAt: number;
  updatedAt: number;
  title: string;
  description: string;
  sphereCount: number;
  keypoints: Array<unknown>;
  spheres: Array<Image360>;
  startingPoint: StartingPoint;
  visibility: TOUR_VISIBILITY;
  editable: boolean;
  userTags: Array<unknown>;
  tourFloorPlan: { levels: Level[] };
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

export type Product = {
  id: string;
  value: string;
  media: {
    mainMedia: {
      image: {
        url: string;
      };
    };
  };
  productOptions: Array<{
    choices: Array<{
      value: string;
      description: string;
      inStock: boolean;
    }>;
  }>;
  name: string;
  price: {
    formatted: {
      price: string;
    };
  };
  description: string;
  productPageUrl: {
    base: string;
    path: string;
  };
};

export type Trial = {
  daysOfTrialLeft: number;
  inTrialPeriod: boolean;
  userType: string;
};

export type Icon = {
  createdAt: number;
  id: string;
  name: string;
  serviceTags: Array<string>;
  status: IMAGE_STATUSES;
  title: string;
  updatedAt: number;
  userId: string;
  userTags: Array<string>;
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
  firstDrop?: boolean;
};

export type Level = {
  id: string;
  name: string;
  title: string;
  links: Link[] | null;
};
