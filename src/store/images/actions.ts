import axios from "axios";
import type { AnyAction, Dispatch } from "redux";
import c from "./constants";
import type { Image360, RootState } from "../types";
import Evaporate from "evaporate";
import { EVAPORATE_CONFIG } from "../../utils/config";
import { IMAGE_STATUSES } from "../constants/images";
import {
  errorNotification,
  successNotification,
} from "../notifications/actions";
import { State } from "./types";

const BASE_ENDPOINT = "sphere";

export const requestMyImages =
  (page = 0, size = 24) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.GET_MY_IMAGES_REQUEST });
      const res = await axios.get(
        `${BASE_ENDPOINT}?page=${page}&size=${size}&sort=createdAt`
      );
      dispatch({ type: c.GET_MY_IMAGES_SUCCESS, payload: res.data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.GET_MY_IMAGES_ERROR,
          payload: err.message || err,
        });
        dispatch(errorNotification(`Images not received: ${err.message}`));
      }
    }
  };

export const uploadImage =
  (
    file: File,
    afterCreate?: (img: Image360) => void,
    onComplete?: (img: Image360) => void
  ) =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({ type: c.UPLOAD_IMAGE_REQUEST });

      const { data } = await axios.post<Image360>(`${BASE_ENDPOINT}`, {
        name: file.name,
      });

      afterCreate?.(data);

      const { id } = data;

      const metadata = getState().images.data.metadata;

      await requestMyImages(
        metadata?.numberOfPage,
        metadata?.perPage
      )(dispatch);

      await updateImage(id, { status: IMAGE_STATUSES.UPLOADING })(dispatch);

      const evaporate = await Evaporate.create(EVAPORATE_CONFIG);

      const addConfig: Evaporate.AddConfig = {
        name: "sphere.jpg",
        file: file,
        progress: (value) => {
          dispatch({
            type: c.SET_UPLOAD_PROGRESS,
            payload: { id, progress: value },
          });
        },
      };

      const overrides = {
        bucket: `${EVAPORATE_CONFIG.bucket}/${id}`,
      };

      await evaporate.add(addConfig, overrides);

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      const interval = setInterval(async (): Promise<void> => {
        try {
          const { data: newImageData } = await axios.get(
            `${BASE_ENDPOINT}/${id}`
          );

          if (newImageData.status === IMAGE_STATUSES.FAILED) {
            clearInterval(interval);
            dispatch({
              type: c.UPLOAD_IMAGE_ERROR,
              payload: newImageData.status,
            });
          }

          if (
            [
              IMAGE_STATUSES.PROCESSED,
              IMAGE_STATUSES.IMPROVED,
              IMAGE_STATUSES.NOT_IMPROVED,
            ].includes(newImageData.status)
          ) {
            clearInterval(interval);
            dispatch({ type: c.UPLOAD_IMAGE_SUCCESS });
            await requestMyImages(
              metadata?.numberOfPage,
              metadata?.perPage
            )(dispatch);
            onComplete?.(newImageData);
          }
        } catch (err) {
          if (err instanceof Error) {
            clearInterval(interval);
            dispatch({
              type: c.UPLOAD_IMAGE_ERROR,
              payload: err.message || err,
            });
          }
        }
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.UPLOAD_IMAGE_ERROR, payload: err.message || err });
        dispatch(errorNotification(`Image not uploaded: ${err.message}`));
      }
    }
  };

export const updateImage =
  (id: string, updatedData: Partial<Image360>, cb?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.PUT_IMAGE_REQUEST });
      const res = await axios.put(`${BASE_ENDPOINT}/${id}`, updatedData);
      dispatch({ type: c.PUT_IMAGE_SUCCESS, payload: res.data });
      dispatch(successNotification("Image updated"));
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        const msg: string = err.message;
        dispatch({ type: c.PUT_IMAGE_ERROR, payload: msg });
        dispatch(errorNotification(`Image not updated: ${msg}`));
      }
    }
  };

export const deleteImage =
  (id: string) =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({ type: c.DELETE_IMAGE_REQUEST });
      const res = await axios.delete(`${BASE_ENDPOINT}/${id}`);

      const metadata = getState().images.data.metadata;

      await requestMyImages(
        metadata?.numberOfPage,
        metadata?.perPage
      )(dispatch);
      dispatch({ type: c.DELETE_IMAGE_SUCCESS, payload: res.data });
      dispatch(successNotification("Image deleted"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.DELETE_IMAGE_ERROR, payload: err.message || err });
        dispatch(errorNotification(`Image not deleted: ${err.message}`));
      }
    }
  };

export const deleteManyImages =
  (ids: string[]) =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({ type: c.DELETE_MANY_IMAGES_REQUEST });
      const res = await axios.delete(`${BASE_ENDPOINT}/spheres`, { data: ids });
      await requestMyImages(getState().images.data.metadata?.numberOfPage)(
        dispatch
      );
      dispatch({ type: c.DELETE_MANY_IMAGES_SUCCESS, payload: res.data });
      dispatch(successNotification("Images deleted"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.DELETE_MANY_IMAGES_ERROR,
          payload: err?.message || err,
        });
        dispatch(errorNotification(`Images not deleted: ${err.message}`));
      }
    }
  };

export const setStartingPoint =
  (
    point: Omit<
      Image360["startingPoint"],
      "coverUrl" | "previewUrl" | "thumbUrl"
    >,
    cb?: () => void,
    removeNotification?: boolean
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.SET_STARTING_POINT_REQUEST });
      const res = await axios.put(
        `${BASE_ENDPOINT}/${point.sphereId}/startingpoint`,
        point
      );
      setTimeout(() => {
        dispatch({ type: c.SET_STARTING_POINT_SUCCESS, payload: res.data });
        if (!removeNotification) {
          dispatch(successNotification("Thumbnail updated"));
        }
      }, 3000);
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        const msg: string = err.message;
        dispatch({ type: c.SET_STARTI_NG_POINTERROR, payload: msg });
        if (!removeNotification) {
          dispatch(errorNotification(`Thumbnail not updated: ${msg}`));
        }
      }
    }
  };

export const AddImage = (image: Image360): AnyAction => ({
  type: c.PUT_IMAGE_SUCCESS,
  payload: image,
});

export const AddImages =
  (images: Image360[]): any =>
  (dispatch: Dispatch): void => {
    images.forEach((img) => dispatch(AddImage(img)));
  };

export const setImageState = (state: any) => (dispatch: Dispatch) => {
  dispatch({
    type: c.SET_IMAGE_STATE_SUCCESS,
    payload: state.images,
  });
};
