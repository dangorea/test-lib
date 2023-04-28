import TOUR_CONSTANTS from "./constants";
import type { AnyAction } from "redux";
import {
  emptySuccessReducer,
  errorReducer,
  requestReducer,
  successReducer,
} from "../utils";
import type { Reducers, Tour } from "../../utils/types";
import type { Hotspot, State } from "./types";
import { HOTSPOT_TYPES } from "./types";
import { transformFullTourSphereLinks } from "../../utils/tour";
import { HYDRATE } from "next-redux-wrapper";
import type { Icon } from "../types";

const initialState: State = {
  data: {},
  isLoading: false,
  error: null,
  currentTour: null,
  icons: [],
};

const reducers_actions: Reducers<State> = {
  [TOUR_CONSTANTS.GET_MY_TOURS_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.GET_MY_TOURS_ERROR]: errorReducer,
  [TOUR_CONSTANTS.GET_MY_TOURS_SUCCESS]: successReducer,
  [TOUR_CONSTANTS.UPDATE_TOUR_COVER_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.UPDATE_TOUR_COVER_ERROR]: errorReducer,
  [TOUR_CONSTANTS.UPDATE_TOUR_COVER_SUCCESS]: emptySuccessReducer,
  [TOUR_CONSTANTS.UPDATE_TOUR_STARTING_POINT_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.UPDATE_TOUR_STARTING_POINT_ERROR]: errorReducer,
  [TOUR_CONSTANTS.UPDATE_TOUR_STARTING_POINT_SUCCESS]: emptySuccessReducer,
  [TOUR_CONSTANTS.UPDATE_FLOOR_IMAGE_SUCCESS_REQUEST]: successReducer,
  [TOUR_CONSTANTS.UPDATE_FLOOR_IMAGE_ERROR]: errorReducer,
  [TOUR_CONSTANTS.MANAGE_SPHERES_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.MANAGE_SPHERES_ERROR]: errorReducer,
  [TOUR_CONSTANTS.MANAGE_SPHERES_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: payload,
    };
  },
  [TOUR_CONSTANTS.ADD_HOTSPOT_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.ADD_HOTSPOT_ERROR]: errorReducer,
  [TOUR_CONSTANTS.ADD_HOTSPOT_SUCCESS]: (state, payload: Hotspot) => {
    const [sphereId] = payload.id.split("_");

    const spheres = (state.currentTour as Tour).spheres;
    let sphereInd = null;
    if (payload.productSphereId) {
      sphereInd = spheres.findIndex(({ id }) => id === payload.productSphereId);
    } else {
      sphereInd = spheres.findIndex(({ id }) => id === sphereId);
    }

    const sphere = spheres[sphereInd];

    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: {
        ...state.currentTour,
        spheres: [
          ...spheres.slice(0, sphereInd),
          {
            ...sphere,
            links:
              payload.type === HOTSPOT_TYPES.LINK
                ? [...sphere?.links, { ...payload }]
                : [...sphere?.links],
            hotSpots: [...(sphere?.hotSpots || []), payload],
            wixProducts:
              payload.type === HOTSPOT_TYPES.PRODUCT
                ? [...(sphere?.wixProducts || []), { ...payload }]
                : [...sphere?.wixProducts],
          },
          ...spheres.slice(sphereInd + 1),
        ],
      },
    };
  },
  [TOUR_CONSTANTS.UPDATE_HOTSPOT_SUCCESS]: (state, payload: Hotspot) => {
    return {
      ...state,
      currentTour: payload,
    };
  },
  [TOUR_CONSTANTS.DELETE_HOTSPOT_SUCCESS]: (
    state,
    hotspotId: string | { sphereId: string; hotspotId: string }
  ) => {
    let sphereId = "";
    if (typeof hotspotId === "string") {
      sphereId = hotspotId.split("_")[0];
    } else {
      sphereId = hotspotId.sphereId;
    }

    const spheres = (state.currentTour as Tour).spheres;

    const sphereInd = spheres.findIndex(({ id }) => id === sphereId);

    const sphere = spheres[sphereInd];
    let hId = "";
    if (typeof hotspotId === "string") {
      hId = hotspotId;
    } else {
      hId = hotspotId.hotspotId;
    }

    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: {
        ...state.currentTour,
        spheres: [
          ...spheres.slice(0, sphereInd),
          {
            ...sphere,
            links: sphere.links.filter(({ id }) => id !== hId),
            hotSpots: sphere.hotSpots.filter(({ id }) => id !== hId),
            wixProducts: sphere.wixProducts.filter(({ id }) => id !== hId),
          },
          ...spheres.slice(sphereInd + 1),
        ],
      },
    };
  },
  [TOUR_CONSTANTS.UPLOAD_FLOOR_IMAGE_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.UPLOAD_FLOOR_IMAGE_ERROR]: errorReducer,
  [TOUR_CONSTANTS.UPLOAD_FLOOR_IMAGE_SUCCESS]: (state, payload: any) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: {
        ...state.currentTour,
        tourFloorPlan: {
          levels: [...payload],
        },
      },
    };
  },
  [TOUR_CONSTANTS.DELETE_FLOOR_IMAGE_SUCCESS]: (state, payload: any) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: {
        ...state.currentTour,
        ...payload,
      },
    };
  },
  [TOUR_CONSTANTS.UPDATE_FLOOR_IMAGE_SUCCESS]: (state, payload: any) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: {
        ...state.currentTour,
        ...payload,
      },
    };
  },
  [TOUR_CONSTANTS.ADD_FLOOR_LEVEL_LINK_SUCCESS]: (state, payload: any) => {
    const [levelId] = payload.id.split("_");
    const levels = (state.currentTour as Tour).tourFloorPlan.levels;
    const levelInd = levels.findIndex(({ id }) => id === levelId);

    const level = levels[levelInd];
    level.links.push(payload);

    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: {
        ...state.currentTour,
        tourFloorPlan: {
          levels: [...levels],
        },
      },
    };
  },
  [TOUR_CONSTANTS.UPDATE_FLOOR_LEVEL_LINK_SUCCESS]: (state, payload: any) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: payload,
    };
  },
  [TOUR_CONSTANTS.DELETE_FLOOR_LEVEL_LINK_SUCCESS]: (state, payload: any) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: {
        ...state.currentTour,
        tourFloorPlan: {
          ...payload.tourFloorPlan,
        },
      },
    };
  },
  [TOUR_CONSTANTS.CREATE_TOUR_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.CREATE_TOUR_ERROR]: errorReducer,
  [TOUR_CONSTANTS.CREATE_TOUR_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      data: {
        ...state.data,
        metadata: state.data.metadata,
        page: [...(state.data?.page || []), payload],
      },
    };
  },
  [TOUR_CONSTANTS.UPDATE_TOUR_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.UPDATE_TOUR_ERROR]: errorReducer,
  [TOUR_CONSTANTS.UPDATE_TOUR_SUCCESS]: (state, payload: Tour) => {
    const pageCopy = [...state.data.page];
    const tourInd = pageCopy.findIndex(({ id }) => id === payload.id);
    pageCopy.splice(tourInd, 1, payload);

    return {
      ...state,
      isLoading: false,
      error: null,
      data: {
        ...state.data,
        metadata: state.data.metadata,
        page: pageCopy,
      },
    };
  },
  [TOUR_CONSTANTS.DELETE_TOUR_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.DELETE_TOUR_ERROR]: errorReducer,
  [TOUR_CONSTANTS.DELETE_TOUR_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      data: {
        ...state.data,
        metadata: state.data.metadata,
        page: state.data.page.filter(({ id }) => id !== payload.id),
      },
    };
  },
  [TOUR_CONSTANTS.GET_TOUR_PREVIEW_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.GET_TOUR_PREVIEW_ERROR]: errorReducer,
  [TOUR_CONSTANTS.GET_TOUR_PREVIEW_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: transformFullTourSphereLinks(payload),
    };
  },
  [TOUR_CONSTANTS.GET_FULL_TOUR_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.GET_FULL_TOUR_ERROR]: errorReducer,
  [TOUR_CONSTANTS.GET_FULL_TOUR_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: transformFullTourSphereLinks(payload),
    };
  },
  [TOUR_CONSTANTS.SET_CURRENT_TOUR_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.SET_CURRENT_TOUR_ERROR]: errorReducer,
  [TOUR_CONSTANTS.SET_CURRENT_TOUR_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      ...payload,
    };
  },
  [TOUR_CONSTANTS.GET_ICONS_REQUEST]: requestReducer,
  [TOUR_CONSTANTS.GET_ICONS_ERROR]: errorReducer,
  [TOUR_CONSTANTS.GET_ICONS_SUCCESS]: (state, payload: any) => {
    return {
      ...state,
      icons: [...payload],
    };
  },
  [TOUR_CONSTANTS.DELETE_ICONS_SUCCESS]: (state, payload: Icon) => {
    return {
      ...state,
      icons: [
        ...state.icons.filter((icon) => {
          return icon.id !== payload.id;
        }),
      ],
    };
  },
  def: (state) => {
    return state;
  },
};

const toursReducer = (state = initialState, action: AnyAction): State => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  const relevantReducer = reducers_actions[action.type] || reducers_actions.def;

  return relevantReducer(state, action.payload) as State;
};

export default toursReducer;
