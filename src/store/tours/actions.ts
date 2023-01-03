import axios from "axios";
import type { Dispatch } from "redux";
import c, { TOUR_ACTIONS } from "./constants";
import type { FloorPlan, Level, Link, RootState, Tour } from "../types";
import {
  errorNotification,
  successNotification,
} from "../notifications/actions";
import { AddImages } from "../images/actions";
import { setViewerImageId } from "../viewer/actions";
import type {
  Hotspot,
  LinkHotspot,
  ProductHotspot,
  SphereViewOptions,
} from "./types";
import { getHotspot } from "./selectors";
import {
  getHotspotFromLinkHotspot,
  getHotspotFromProductHotspot,
  getLinkToImageHotspotFromTour,
  getProductHotspotFromTour,
  transformFullTourSphereLinks,
} from "../../utils/tour";
import Evaporate from "evaporate";
import { CONFIG, EVAPORATE_CONFIG } from "../../utils/config";
import type React from "react";
import { State } from "./types";
import { AnyAction } from "redux";

const BASE_ENDPOINT = "tour";

export const requestMyTours =
  (page = 0) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.GET_MY_TOURS_REQUEST });
      const res = await axios.get(
        `${BASE_ENDPOINT}/self?page=${page}&size=24&sort=createdAt`
      );
      dispatch({ type: c.GET_MY_TOURS_SUCCESS, payload: res.data });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.GET_MY_TOURS_ERROR, payload: err.message || err });
        dispatch(errorNotification(`Tours not received: ${err.message}`));
      }
    }
  };

export const createTour =
  (tourData: Partial<Tour>, cb?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.CREATE_TOUR_REQUEST });
      const res = await axios.post(`${BASE_ENDPOINT}`, tourData);
      dispatch({ type: c.CREATE_TOUR_SUCCESS, payload: res.data });
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.CREATE_TOUR_ERROR, payload: err.message || err });
        dispatch(errorNotification(`Tour not created: ${err.message}`));
      }
    }
  };

export const updateTour =
  (id: string, updatedData: Partial<Tour>, cb?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.UPDATE_TOUR_REQUEST });
      const res = await axios.put(`${BASE_ENDPOINT}/${id}`, updatedData);
      dispatch({ type: c.UPDATE_TOUR_SUCCESS, payload: res.data });
      dispatch(successNotification("Tour updated"));
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.UPDATE_TOUR_ERROR, payload: err.message || err });
        dispatch(errorNotification(`Tour not updated: ${err.message}`));
      }
    }
  };

export const deleteTour =
  (id: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.DELETE_TOUR_REQUEST });
      const res = await axios.delete(`${BASE_ENDPOINT}/${id}`);
      dispatch({ type: c.DELETE_TOUR_SUCCESS, payload: res.data });
      dispatch(successNotification("Tour deleted"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.DELETE_TOUR_ERROR, payload: err.message || err });
        dispatch(errorNotification(`Tour not deleted: ${err.message}`));
      }
    }
  };

export const getTourPreview =
  (id: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.GET_TOUR_PREVIEW_REQUEST });
      const res = await axios.get<Tour>(`${BASE_ENDPOINT}/${id}?full=true`);

      dispatch({
        type: c.GET_TOUR_PREVIEW_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.GET_TOUR_PREVIEW_ERROR, payload: err.message });
        dispatch(
          errorNotification(`Tour preview not received: ${err.message}`)
        );
      }
    }
  };

export const requestFullTour =
  (id: string) =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({ type: c.GET_FULL_TOUR_REQUEST });
      const res = await axios.get<Tour>(`${BASE_ENDPOINT}/${id}?full=true`);
      dispatch({
        type: c.GET_FULL_TOUR_SUCCESS,
        payload: transformFullTourSphereLinks(res.data),
      });
      dispatch(AddImages(res.data.spheres));
      if (!getState().viewer.imageId) {
        dispatch(setViewerImageId(res.data.startingPoint.sphereId));
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.GET_FULL_TOUR_ERROR, payload: err.message });
        dispatch(errorNotification(`Tour not received: ${err.message}`));
      }
    }
  };

export const updateTourCover =
  (id: string, options: SphereViewOptions) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.UPDATE_TOUR_COVER_REQUEST });
      await axios.put(`${BASE_ENDPOINT}/${id}/cover`, options);
      dispatch({ type: c.UPDATE_TOUR_COVER_SUCCESS });
      dispatch(successNotification("Tour updated"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.UPDATE_TOUR_COVER_ERROR, payload: err.message });
        dispatch(errorNotification(`Tour not updated`));
      }
    }
  };

export const updateTourStartingPoint =
  (id: string, options: SphereViewOptions) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.UPDATE_TOUR_STARTING_POINT_REQUEST });
      await axios.put(`${BASE_ENDPOINT}/${id}/startingpoint`, options);
      dispatch({ type: c.UPDATE_TOUR_STARTING_POINT_SUCCESS });
      dispatch(successNotification("Tour updated"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.UPDATE_TOUR_STARTING_POINT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Tour not updated`));
      }
    }
  };

export const manageSpheres =
  (
    tourId: string,
    sphereIds: string[],
    action: TOUR_ACTIONS,
    cb?: (updatedTour: Tour) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.MANAGE_SPHERES_REQUEST });
      const res = await axios.post<Tour>(`${BASE_ENDPOINT}/${tourId}/sphere`, {
        action,
        sphereIds,
      });
      dispatch({ type: c.MANAGE_SPHERES_SUCCESS, payload: res.data });
      dispatch(successNotification("Tour updated"));
      cb?.(res.data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.MANAGE_SPHERES_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Tour not updated`));
      }
    }
  };

export const addHotspot =
  (
    tourId: string,
    sphereId: string,
    options: Partial<Hotspot>,
    cb?: (newHotspot: Hotspot) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.ADD_HOTSPOT_REQUEST });
      const res = await axios.post<Hotspot>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/hotspot`,
        options
      );
      dispatch({ type: c.ADD_HOTSPOT_SUCCESS, payload: res.data });
      dispatch(successNotification("Tour updated"));
      cb?.(res.data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Tour not updated`));
      }
    }
  };

export const updateHotspot =
  (
    tourId: string,
    sphereId: string,
    hotspotId: string,
    options: Partial<Hotspot>,
    cb?: (updatedHotspot: Hotspot) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.UPDATE_HOTSPOT_REQUEST });
      const res = await axios.put<Tour>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/hotspot/${hotspotId}`,
        options
      );

      const updatedHotspot = getHotspot(hotspotId)({
        tours: { currentTour: res.data },
      } as RootState) as Hotspot;

      dispatch({ type: c.UPDATE_HOTSPOT_SUCCESS, payload: updatedHotspot });
      dispatch(successNotification("Hotspot updated"));
      cb?.(updatedHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Hotspot not updated`));
      }
    }
  };

export const deleteHotspot =
  (tourId: string, sphereId: string, hotspotId: string, cb?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: c.ADD_HOTSPOT_REQUEST });
      await axios.delete<Tour>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/hotspot/${hotspotId}`
      );

      dispatch({ type: c.DELETE_HOTSPOT_SUCCESS, payload: hotspotId });
      dispatch(successNotification("Hotspot deleted"));
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Hotspot not deleted`));
      }
    }
  };

export const addLinkToImageHotspot =
  (
    tourId: string,
    sphereId: string,
    options: Omit<LinkHotspot, "id">,
    cb?: (newHotspot: Hotspot) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const res = await axios.post<LinkHotspot>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/link`,
        options
      );

      const newHotspot = getHotspotFromLinkHotspot(res.data);

      dispatch({ type: c.ADD_HOTSPOT_SUCCESS, payload: newHotspot });
      dispatch(successNotification("Tour updated"));
      cb?.(newHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Tour not updated`));
      }
    }
  };

export const updateLinkToImageHotspot =
  (
    tourId: string,
    sphereId: string,
    hotspotId: string,
    options: LinkHotspot,
    cb?: (updatedHotspot: Hotspot) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const res = await axios.patch<Tour>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/link/${hotspotId}`,
        options
      );

      const updatedLinkHotspot = getLinkToImageHotspotFromTour(
        res.data,
        hotspotId
      ) as LinkHotspot;

      const updatedHotspot = getHotspotFromLinkHotspot(updatedLinkHotspot);

      dispatch({
        type: c.UPDATE_HOTSPOT_SUCCESS,
        payload: updatedHotspot,
      });
      dispatch(successNotification("Hotspot updated"));
      cb?.(updatedHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Hotspot not updated`));
      }
    }
  };

export const deleteLinkToImageHotspot =
  (tourId: string, sphereId: string, hotspotId: string, cb?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await axios.delete<Tour>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/link/${hotspotId}`
      );

      dispatch({
        type: c.DELETE_HOTSPOT_SUCCESS,
        payload: hotspotId,
      });
      dispatch(successNotification("Hotspot deleted"));
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Hotspot not deleted`));
      }
    }
  };

export const addLinkToProductHotspot =
  (
    tourId: string,
    sphereId: string,
    options: Omit<ProductHotspot, "id">,
    cb?: (newHotspot: Hotspot) => void
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const res = await axios.post<ProductHotspot>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/wix-product`,
        options
      );

      const newHotspot = getHotspotFromProductHotspot(res.data);

      dispatch({
        type: c.ADD_HOTSPOT_SUCCESS,
        payload: {
          ...newHotspot,
          productSphereId: sphereId,
        },
      });
      dispatch(successNotification("Tour updated"));
      cb?.(newHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Tour not updated`));
      }
    }
  };

export const updateLinkToProductHotspot =
  (
    tourId: string,
    sphereId: string,
    hotspotId: string,
    options: ProductHotspot,
    cb?: (updatedHotspot: Hotspot) => void
  ) =>
  // eslint-disable-next-line @typescript-eslint/require-await
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const res = await axios.patch<Tour>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/wix-product/${hotspotId}`,
        options
      );

      const updatedLinkHotspot = getProductHotspotFromTour(
        res.data,
        hotspotId,
        sphereId
      ) as ProductHotspot;
      const updatedHotspot = getHotspotFromProductHotspot({
        ...updatedLinkHotspot,
        // id: sphereId,
      });
      dispatch({
        type: c.UPDATE_HOTSPOT_SUCCESS,
        payload: { ...updatedHotspot, productSphereId: sphereId },
      });
      dispatch(successNotification("Hotspot updated"));
      cb?.(updatedHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Hotspot not updated`));
      }
    }
  };

export const deleteLinkToProductHotspot =
  (tourId: string, sphereId: string, hotspotId: string, cb?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await axios.delete<Tour>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/wix-product/${hotspotId}`
      );

      dispatch({
        type: c.DELETE_HOTSPOT_SUCCESS,
        payload: {
          sphereId,
          hotspotId,
        },
      });
      dispatch(successNotification("Hotspot deleted"));
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: c.ADD_HOTSPOT_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Hotspot not deleted`));
      }
    }
  };

export const addFloorPlanLevel =
  (
    tourId: string,
    file: File,
    title: string,
    setUploadedImage?: (
      value:
        | ((
            prevState: FileList | Array<Level> | null
          ) => FileList | Array<Level> | null)
        | FileList
        | Array<Level>
        | null
    ) => void,
    onComplete?: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const { data } = await axios.post<FloorPlan>(
        `${BASE_ENDPOINT}/${tourId}/level`,
        {
          name: file.name,
          title: title,
        }
      );

      const { id } = data;

      const evaporate = await Evaporate.create(EVAPORATE_CONFIG);

      const addConfig: Evaporate.AddConfig = {
        name: file.name,
        file: file,
        progress: (value) => value,
      };

      const overrides = {
        bucket: `${CONFIG.awsBucket}/media/${id}`,
      };

      await evaporate.add(addConfig, overrides);

      const interval = setInterval(() => {
        void axios
          .get(`${BASE_ENDPOINT}/${tourId}/levels`)
          .then(({ data: newImageData }) => {
            if (newImageData) {
              setUploadedImage?.(
                newImageData.map((image: Level) => ({
                  ...image,
                  url: `${CONFIG.storageUrl}/media/${image.id}/${image.name}`,
                }))
              );
              onComplete?.(false);
              dispatch(successNotification(`Floor Plan saved`));
              dispatch({
                type: c.ADD_FLOOR_IMAGE_SUCCESS,
                payload: newImageData,
              });
              clearInterval(interval);
            }
            clearInterval(interval);
          });
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        dispatch(errorNotification(`${err.message}`));
      }
    }
  };

export const updateFloorPlanLevel =
  (
    tourId: string,
    selectedImageId: string,
    newTitle: string,
    onComplete?: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      void (await axios
        .patch(`${BASE_ENDPOINT}/${tourId}/level/${selectedImageId}`, {
          title: newTitle,
        })
        .then(({ data }) => {
          if (data) {
            onComplete?.(false);
            dispatch({
              type: c.UPDATE_FLOOR_IMAGE_SUCCESS,
              payload: data,
            });
            dispatch(successNotification("Floor Plan updated"));
          }
        }));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(errorNotification(`${err.message}`));
      }
    }
  };

export const deleteFloorPlanLevel =
  (tourId: string, levelId: string) =>
  async (dispatch: Dispatch): Promise<any> => {
    try {
      await axios
        .delete(`${BASE_ENDPOINT}/${tourId}/level/${levelId}`)
        .then(({ data }) => {
          dispatch({ type: c.DELETE_FLOOR_IMAGE_SUCCESS, payload: data });
          dispatch(successNotification(`Floor Plan deleted`));
        });
    } catch (err) {
      if (err instanceof Error) {
        dispatch(errorNotification(`Floor Plan not delete: ${err.message}`));
      }
    }
  };

export const addFloorPlanDotsToLink =
  (
    tourId: string,
    selectedImage: Level,
    dot: Link,
    onComplete?: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      void (await axios
        .post<FloorPlan>(
          `${BASE_ENDPOINT}/${tourId}/level/${selectedImage?.id}/link`,
          {
            ...dot,
          }
        )
        .then(({ data }) => {
          data && onComplete?.(false);
          dispatch({ type: c.ADD_FLOOR_LEVEL_LINK_SUCCESS, payload: data });
          dispatch(successNotification("Hotspot saved"));
        }));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(errorNotification(`${err.message}`));
      }
    }
  };

export const deleteFloorLevelLink =
  (tourId: string, levelId: string, linkId: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      void (await axios
        .delete<FloorPlan>(
          `${BASE_ENDPOINT}/${tourId}/level/${levelId}/link/${linkId}`
        )
        .then(({ data }) => {
          dispatch({ type: c.DELETE_FLOOR_LEVEL_LINK_SUCCESS, payload: data });
          dispatch(successNotification("Hotspot deleted"));
        }));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(errorNotification(`Link not deleted: ${err.message}`));
      }
    }
  };

export const updateFloorLevelLink =
  (tourId: string, levelId: string, linkId: string, data: any) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await axios
        .patch(`${BASE_ENDPOINT}/${tourId}/level/${levelId}/link/${linkId}`, {
          ath: data.ath,
          atv: data.atv,
        })
        .then(({ data }) => {
          dispatch({ type: c.UPDATE_FLOOR_LEVEL_LINK_SUCCESS, payload: data });
          dispatch(successNotification("Hotspot updated"));
        });
    } catch (err) {
      if (err instanceof Error) {
        dispatch(errorNotification(`${err.message}`));
      }
    }
  };

export const setTourState = (state: any): AnyAction => {
  return {
    type: c.SET_CURRENT_TOUR_SUCCESS,
    payload: state.tours,
  };
};
