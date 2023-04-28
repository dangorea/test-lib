import c from "./constants";
import type { AnyAction } from "redux";
import { emptySuccessReducer, errorReducer, requestReducer } from "../utils";
import type { PaginationMetadata } from "../types";

const initialState: any = {
  data: {},
  uploadProgress: {},
  isLoading: false,
  error: null,
  test: "image test state",
};

const reducers: any = {
  [c.GET_MY_IMAGES_REQUEST]: requestReducer,
  [c.GET_MY_IMAGES_ERROR]: errorReducer,
  [c.GET_MY_IMAGES_SUCCESS]: (
    state: any,
    payload: { page: any[]; metadata: PaginationMetadata }
  ) => {
    const items: { [id: string]: any } = {};
    const page: string[] = [];

    payload.page.forEach((image: any) => {
      page.push(image.id);
      items[image.id] = image;
    });

    return {
      ...state,
      data: {
        items: {
          ...state.data.items,
          ...items,
        },
        ...payload,
        page,
      },
      isLoading: false,
      error: null,
    };
  },
  [c.UPLOAD_IMAGE_REQUEST]: requestReducer,
  [c.UPLOAD_IMAGE_ERROR]: errorReducer,
  [c.UPLOAD_IMAGE_SUCCESS]: emptySuccessReducer,
  [c.SET_UPLOAD_PROGRESS]: (state: any, payload: any) => {
    return {
      ...state,
      uploadProgress: {
        ...state.uploadProgress,
        [payload.id]: payload.progress,
      },
    };
  },
  [c.PUT_IMAGE_REQUEST]: requestReducer,
  [c.PUT_IMAGE_ERROR]: errorReducer,
  [c.PUT_IMAGE_SUCCESS]: (state: any, payload: any) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      data: {
        ...state.data,
        items: {
          ...state.data.items,
          [payload.id]: payload,
        },
      },
    };
  },
  [c.SET_STARTING_POINT_REQUEST]: requestReducer,
  [c.SET_STARTING_POINT_ERROR]: errorReducer,
  [c.SET_STARTING_POINT_SUCCESS]: (
    state: any,
    payload: any["startingPoint"]
  ) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      data: {
        ...state.data,
        items: {
          ...state.data.items,
          [payload.sphereId]: {
            ...state.data.items[payload.sphereId],
            updatedAt: Date.now(),
            startingPoint: payload,
          },
        },
      },
    };
  },
  [c.DELETE_IMAGE_REQUEST]: requestReducer,
  [c.DELETE_IMAGE_ERROR]: errorReducer,
  [c.DELETE_IMAGE_SUCCESS]: (state: any, payload: any) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      data: {
        ...state.data,
        items: {
          ...state.data.items,
          [payload.id]: undefined,
        },
      },
    };
  },
  [c.DELETE_MANY_IMAGES_REQUEST]: requestReducer,
  [c.DELETE_MANY_IMAGES_ERROR]: errorReducer,
  [c.DELETE_MANY_IMAGES_SUCCESS]: (state: any, payload: any[]) => {
    const deleteObj: Record<string, undefined> = {};

    payload.forEach(({ id }) => (deleteObj[id] = undefined));

    return {
      ...state,
      isLoading: false,
      error: null,
      data: {
        ...state.data,
        items: {
          ...state.data.items,
          ...deleteObj,
        },
      },
    };
  },
  [c.SET_IMAGE_STATE_REQUEST]: requestReducer,
  [c.SET_IMAGE_STATE_ERROR]: errorReducer,
  [c.SET_IMAGE_STATE_SUCCESS]: (state: any, payload: any) => {
    return {
      ...state,
      ...payload,
    };
  },
  def: (state: any) => state,
};

const imagesReducer = (state = initialState, action: AnyAction): any => {
  const relevantReducer = reducers[action.type] || reducers.def;

  return relevantReducer(state, action.payload) as any;
};

export default imagesReducer;
