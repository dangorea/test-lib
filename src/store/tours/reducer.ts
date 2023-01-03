import c from "./constants";
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

const initialState: State = {
  data: {},
  isLoading: false,
  error: null,
  currentTour: null,
  test: "tour state test",
};

const reducers: Reducers<State> = {
  [c.GET_MY_TOURS_REQUEST]: requestReducer,
  [c.GET_MY_TOURS_ERROR]: errorReducer,
  [c.GET_MY_TOURS_SUCCESS]: successReducer,
  [c.UPDATE_TOUR_COVER_REQUEST]: requestReducer,
  [c.UPDATE_TOUR_COVER_ERROR]: errorReducer,
  [c.UPDATE_TOUR_COVER_SUCCESS]: emptySuccessReducer,
  [c.UPDATE_TOUR_STARTING_POINT_REQUEST]: requestReducer,
  [c.UPDATE_TOUR_STARTING_POINT_ERROR]: errorReducer,
  [c.UPDATE_TOUR_STARTING_POINT_SUCCESS]: emptySuccessReducer,
  [c.UPDATE_FLOOR_IMAGE_SUCCESS_REQUEST]: successReducer,
  [c.UPDATE_FLOOR_IMAGE_ERROR]: errorReducer,
  [c.MANAGE_SPHERES_REQUEST]: requestReducer,
  [c.MANAGE_SPHERES_ERROR]: errorReducer,
  [c.MANAGE_SPHERES_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: payload,
    };
  },
  [c.ADD_HOTSPOT_REQUEST]: requestReducer,
  [c.ADD_HOTSPOT_ERROR]: errorReducer,
  [c.ADD_HOTSPOT_SUCCESS]: (state, payload: Hotspot) => {
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
  [c.UPDATE_HOTSPOT_SUCCESS]: (state, payload: Hotspot) => {
    const [sphereId] = payload.id.split("_");

    const spheres = (state.currentTour as Tour).spheres;

    let sphereInd = null;
    if (payload.productSphereId) {
      sphereInd = spheres.findIndex(({ id }) => id === payload.productSphereId);
    } else {
      sphereInd = spheres.findIndex(({ id }) => id === sphereId);
    }

    const sphere = spheres[sphereInd];
    const sphereHotspotInd = sphere.hotSpots.findIndex(
      ({ id }) => id === payload.id
    );
    const wixProductsHotspotInd = sphere.wixProducts.findIndex(
      ({ id }) => id === payload.id
    );
    const linksHotspotInd = sphere.links.findIndex(
      ({ id }) => id === payload.id
    );

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
                ? [
                    ...sphere.links.slice(0, linksHotspotInd),
                    payload,
                    ...sphere.links.slice(linksHotspotInd + 1),
                  ]
                : [...sphere.links],
            hotSpots: [
              ...sphere.hotSpots.slice(0, sphereHotspotInd),
              payload,
              ...sphere.hotSpots.slice(sphereHotspotInd + 1),
            ],
            wixProducts:
              payload.type === HOTSPOT_TYPES.PRODUCT
                ? [
                    ...sphere.wixProducts.slice(0, wixProductsHotspotInd),
                    payload,
                    ...sphere.wixProducts.slice(wixProductsHotspotInd + 1),
                  ]
                : [...sphere.wixProducts],
          },
          ...spheres.slice(sphereInd + 1),
        ],
      },
    };
  },
  [c.DELETE_HOTSPOT_SUCCESS]: (
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
  [c.ADD_FLOOR_IMAGE_REQUEST]: requestReducer,
  [c.ADD_FLOOR_IMAGE_ERROR]: errorReducer,
  [c.ADD_FLOOR_IMAGE_SUCCESS]: (state, payload: any) => {
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
  [c.DELETE_FLOOR_IMAGE_REQUEST]: requestReducer,
  [c.DELETE_FLOOR_IMAGE_ERROR]: errorReducer,
  [c.DELETE_FLOOR_IMAGE_SUCCESS]: (state, payload: any) => {
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
  [c.UPDATE_FLOOR_IMAGE_REQUEST]: requestReducer,
  [c.UPDATE_FLOOR_IMAGE_ERROR]: errorReducer,
  [c.UPDATE_FLOOR_IMAGE_SUCCESS]: (state, payload: any) => {
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
  [c.ADD_FLOOR_LEVEL_LINK_REQUEST]: requestReducer,
  [c.ADD_FLOOR_LEVEL_LINK_ERROR]: errorReducer,
  [c.ADD_FLOOR_LEVEL_LINK_SUCCESS]: (state, payload: any) => {
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
  [c.UPDATE_FLOOR_LEVEL_LINK_REQUEST]: requestReducer,
  [c.UPDATE_FLOOR_LEVEL_LINK_ERROR]: errorReducer,
  [c.UPDATE_FLOOR_LEVEL_LINK_SUCCESS]: (state, payload: any) => {
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
  [c.DELETE_FLOOR_LEVEL_LINK_REQUEST]: requestReducer,
  [c.DELETE_FLOOR_LEVEL_LINK_ERROR]: errorReducer,
  [c.DELETE_FLOOR_LEVEL_LINK_SUCCESS]: (state, payload: any) => {
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
  [c.CREATE_TOUR_REQUEST]: requestReducer,
  [c.CREATE_TOUR_ERROR]: errorReducer,
  [c.CREATE_TOUR_SUCCESS]: (state, payload: Tour) => {
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
  [c.UPDATE_TOUR_REQUEST]: requestReducer,
  [c.UPDATE_TOUR_ERROR]: errorReducer,
  [c.UPDATE_TOUR_SUCCESS]: (state, payload: Tour) => {
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
  [c.DELETE_TOUR_REQUEST]: requestReducer,
  [c.DELETE_TOUR_ERROR]: errorReducer,
  [c.DELETE_TOUR_SUCCESS]: (state, payload: Tour) => {
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
  [c.GET_TOUR_PREVIEW_REQUEST]: requestReducer,
  [c.GET_TOUR_PREVIEW_ERROR]: errorReducer,
  [c.GET_TOUR_PREVIEW_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: payload,
    };
  },
  [c.GET_FULL_TOUR_REQUEST]: requestReducer,
  [c.GET_FULL_TOUR_ERROR]: errorReducer,
  [c.GET_FULL_TOUR_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      currentTour: payload,
    };
  },
  [c.SET_CURRENT_TOUR_REQUEST]: requestReducer,
  [c.SET_CURRENT_TOUR_ERROR]: errorReducer,
  [c.SET_CURRENT_TOUR_SUCCESS]: (state, payload: Tour) => {
    return {
      ...state,
      ...payload,
    };
  },
  def: (state) => state,
};

const toursReducer = (state = initialState, action: AnyAction): State => {
  const relevantReducer = reducers[action.type] || reducers.def;

  return relevantReducer(state, action.payload) as State;
};

export default toursReducer;
