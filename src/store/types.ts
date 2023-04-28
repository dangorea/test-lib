import type { State as ImagesState } from "./images/types";
import type {
  Hotspot,
  LinkHotspot,
  ProductHotspot,
  State as ToursState,
} from "./tours/types";
import type { State as ConfigState } from "./config/types";
import type { State as NotificationsState } from "./notifications/types";
import type { State as WidgetState } from "./widget/types";
import type { State as ViewerState } from "./viewer/types";
import type { IMAGE_STATUSES } from "./constants/images";
import type { SPHERE_TYPES } from "../utils/types";

export interface RootState {
  images: ImagesState;
  tours: ToursState;
  notifications: NotificationsState;
  viewer: ViewerState;
  widget: WidgetState;
  config: ConfigState;
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
  productOptions: {
    choices: {
      value: string;
      description: string;
      inStock: boolean;
    }[];
  }[];
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
  serviceTags: string[];
  status: IMAGE_STATUSES;
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
  firstDrop?: boolean;
};

export type Level = {
  id: string;
  name: string;
  title: string;
  links: Link[] | null;
};
