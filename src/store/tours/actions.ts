import axios from "axios";
import type { AnyAction, Dispatch } from "redux";
import TOUR_CONSTANTS, { TOUR_ACTIONS } from "./constants";
import type { FloorPlan, Icon, Level, Link, RootState, Tour } from "../types";
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
import { IMAGE_STATUSES } from "../constants/images";
import c from "../images/constants";

const BASE_ENDPOINT = "tour";

export const requestMyTours =
  (page = 0) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TOUR_CONSTANTS.GET_MY_TOURS_REQUEST });
      const res = await axios.get(
        `${BASE_ENDPOINT}/self?page=${page}&size=24&sort=createdAt`
      );
      dispatch({
        type: TOUR_CONSTANTS.GET_MY_TOURS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.GET_MY_TOURS_ERROR,
          payload: err.message || err,
        });
        dispatch(errorNotification(`Tours not received: ${err.message}`));
      }
    }
  };

export const createTour =
  (tourData: Partial<Tour>, cb?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TOUR_CONSTANTS.CREATE_TOUR_REQUEST });
      const res = await axios.post(`${BASE_ENDPOINT}`, tourData);
      dispatch({ type: TOUR_CONSTANTS.CREATE_TOUR_SUCCESS, payload: res.data });
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.CREATE_TOUR_ERROR,
          payload: err.message || err,
        });
        dispatch(errorNotification(`Tour not created: ${err.message}`));
      }
    }
  };

export const updateTour =
  (id: string, updatedData: Partial<Tour>, cb?: () => void) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TOUR_CONSTANTS.UPDATE_TOUR_REQUEST });
      const res = await axios.put(`${BASE_ENDPOINT}/${id}`, updatedData);
      dispatch({ type: TOUR_CONSTANTS.UPDATE_TOUR_SUCCESS, payload: res.data });
      dispatch(successNotification("Tour updated"));
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.UPDATE_TOUR_ERROR,
          payload: err.message || err,
        });
        dispatch(errorNotification(`Tour not updated: ${err.message}`));
      }
    }
  };

export const deleteTour =
  (id: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TOUR_CONSTANTS.DELETE_TOUR_REQUEST });
      const res = await axios.delete(`${BASE_ENDPOINT}/${id}`);
      dispatch({ type: TOUR_CONSTANTS.DELETE_TOUR_SUCCESS, payload: res.data });
      dispatch(successNotification("Tour deleted"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.DELETE_TOUR_ERROR,
          payload: err.message || err,
        });
        dispatch(errorNotification(`Tour not deleted: ${err.message}`));
      }
    }
  };

export const getTourPreview =
  (id: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TOUR_CONSTANTS.GET_TOUR_PREVIEW_REQUEST });
      const res = await axios.get<Tour>(`${BASE_ENDPOINT}/${id}?full=true`);

      dispatch({
        type: TOUR_CONSTANTS.GET_TOUR_PREVIEW_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.GET_TOUR_PREVIEW_ERROR,
          payload: err.message,
        });
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
      dispatch({ type: TOUR_CONSTANTS.GET_FULL_TOUR_REQUEST });
      // TODO remove if not used
      // console.log("requestFullTour>>>", id);
      // const config = <AxiosRequestConfig>{
      //   method: "get",
      //   url: "https://viar.live/api/v1/tour/tl9e9r?full=true",
      //   headers: {
      //     Authorization: "",
      //     "Content-Type": "application/json",
      //     "Accept-Encoding": "",
      //   },
      //   responseType: "json",
      //   responseEncoding: "utf8",
      // };
      //
      // axios(config)
      //   .then(function (res) {
      //     console.log("tst>>>>>>>>", res);
      //     // dispatch({
      //     //   type: TOUR_CONSTANTS.GET_FULL_TOUR_SUCCESS,
      //     //   payload: transformFullTourSphereLinks(res.data),
      //     // });
      //     // dispatch(AddImages(res.data.spheres));
      //     // if (!getState().viewer.imageId) {
      //     //   dispatch(setViewerImageId(res.data.startingPoint.sphereId));
      //     // }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      // await fetch("https://viar.live/api/v1/tour/tl9e9r?full=true")
      //       //   .then((response) => response.json())
      //       //   .then((data) => console.log("fetchRes?>>>>>", data));

      const source = getState().config.source;
      CONFIG.awsBucket = getState().config.bucket;

      CONFIG.apiUrl =
        source === "viarLive"
          ? "https://viar.live/api/v1/"
          : "https://api.wix.viar.live/api/v1/";

      CONFIG.client = source;

      CONFIG.storageUrl =
        source === "viarLive"
          ? "https://d3m15nce7ee3px.cloudfront.net"
          : "https://ddn1wrsew90bv.cloudfront.net";

      const res = await axios.get<Tour>(`${BASE_ENDPOINT}/${id}?full=true`);

      dispatch({
        type: TOUR_CONSTANTS.GET_FULL_TOUR_SUCCESS,
        payload: transformFullTourSphereLinks(res.data),
      });
      dispatch(AddImages(res.data.spheres));

      if (!getState().viewer.imageId) {
        dispatch(setViewerImageId(res.data.startingPoint.sphereId));
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.GET_FULL_TOUR_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Tour not received: ${err.message}`));
      }
    }
  };

export const updateTourCover =
  (id: string, options: SphereViewOptions) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TOUR_CONSTANTS.UPDATE_TOUR_COVER_REQUEST });
      await axios.put(`${BASE_ENDPOINT}/${id}/cover`, options);
      dispatch({ type: TOUR_CONSTANTS.UPDATE_TOUR_COVER_SUCCESS });
      dispatch(successNotification("Tour updated"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.UPDATE_TOUR_COVER_ERROR,
          payload: err.message,
        });
        dispatch(errorNotification(`Tour not updated`));
      }
    }
  };

export const updateTourStartingPoint =
  (id: string, options: SphereViewOptions) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TOUR_CONSTANTS.UPDATE_TOUR_STARTING_POINT_REQUEST });
      await axios.put(`${BASE_ENDPOINT}/${id}/startingpoint`, options);
      dispatch({ type: TOUR_CONSTANTS.UPDATE_TOUR_STARTING_POINT_SUCCESS });
      dispatch(successNotification("Tour updated"));
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.UPDATE_TOUR_STARTING_POINT_ERROR,
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
      dispatch({ type: TOUR_CONSTANTS.MANAGE_SPHERES_REQUEST });
      const res = await axios.post<Tour>(`${BASE_ENDPOINT}/${tourId}/sphere`, {
        action,
        sphereIds,
      });
      dispatch({
        type: TOUR_CONSTANTS.MANAGE_SPHERES_SUCCESS,
        payload: res.data,
      });
      dispatch(successNotification("Tour updated"));
      cb?.(res.data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.MANAGE_SPHERES_ERROR,
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
      dispatch({ type: TOUR_CONSTANTS.ADD_HOTSPOT_REQUEST });
      const res = await axios.post<Hotspot>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/hotspot`,
        options
      );
      dispatch({ type: TOUR_CONSTANTS.ADD_HOTSPOT_SUCCESS, payload: res.data });
      dispatch(successNotification("Tour updated"));
      cb?.(res.data);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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
      dispatch({ type: TOUR_CONSTANTS.UPDATE_HOTSPOT_REQUEST });
      const res = await axios.put<Tour>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/hotspot/${hotspotId}`,
        options
      );

      const updatedHotspot = getHotspot(hotspotId)({
        tours: { currentTour: res.data },
      } as RootState) as Hotspot;

      dispatch({
        type: TOUR_CONSTANTS.UPDATE_HOTSPOT_SUCCESS,
        payload: updatedHotspot,
      });
      dispatch(successNotification("Hotspot updated"));
      cb?.(updatedHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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
      dispatch({ type: TOUR_CONSTANTS.ADD_HOTSPOT_REQUEST });
      await axios.delete<Tour>(
        `${BASE_ENDPOINT}/${tourId}/sphere/${sphereId}/hotspot/${hotspotId}`
      );

      dispatch({
        type: TOUR_CONSTANTS.DELETE_HOTSPOT_SUCCESS,
        payload: hotspotId,
      });
      dispatch(successNotification("Hotspot deleted"));
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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

      dispatch({
        type: TOUR_CONSTANTS.ADD_HOTSPOT_SUCCESS,
        payload: newHotspot,
      });
      dispatch(successNotification("Tour updated"));
      cb?.(newHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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
        type: TOUR_CONSTANTS.UPDATE_HOTSPOT_SUCCESS,
        payload: updatedHotspot,
      });
      dispatch(successNotification("Hotspot updated"));
      cb?.(updatedHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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
        type: TOUR_CONSTANTS.DELETE_HOTSPOT_SUCCESS,
        payload: hotspotId,
      });
      dispatch(successNotification("Hotspot deleted"));
      cb?.();
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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
        type: TOUR_CONSTANTS.ADD_HOTSPOT_SUCCESS,
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
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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
        type: TOUR_CONSTANTS.UPDATE_HOTSPOT_SUCCESS,
        payload: { ...updatedHotspot, productSphereId: sphereId },
      });
      dispatch(successNotification("Hotspot updated"));
      cb?.(updatedHotspot);
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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
        type: TOUR_CONSTANTS.DELETE_HOTSPOT_SUCCESS,
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
          type: TOUR_CONSTANTS.ADD_HOTSPOT_ERROR,
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
                type: TOUR_CONSTANTS.ADD_FLOOR_IMAGE_SUCCESS,
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
              type: TOUR_CONSTANTS.UPDATE_FLOOR_IMAGE_SUCCESS,
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
          dispatch({
            type: TOUR_CONSTANTS.DELETE_FLOOR_IMAGE_SUCCESS,
            payload: data,
          });
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
          dispatch({
            type: TOUR_CONSTANTS.ADD_FLOOR_LEVEL_LINK_SUCCESS,
            payload: data,
          });
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
          dispatch({
            type: TOUR_CONSTANTS.DELETE_FLOOR_LEVEL_LINK_SUCCESS,
            payload: data,
          });
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
          dispatch({
            type: TOUR_CONSTANTS.UPDATE_FLOOR_LEVEL_LINK_SUCCESS,
            payload: data,
          });
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
    type: TOUR_CONSTANTS.SET_CURRENT_TOUR_SUCCESS,
    payload: state.tours,
  };
};

export const getIcons =
  () =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      if (getState().config.source === "wix") {
        const { data } = await axios.get<Icon[]>(`media`);
        dispatch({
          type: TOUR_CONSTANTS.GET_ICONS_SUCCESS,
          payload: data,
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: c.UPLOAD_IMAGE_ERROR, payload: err.message || err });
        dispatch(errorNotification(`Image not uploaded: ${err.message}`));
      }
    }
  };

export const uploadIcons =
  (file: File, onComplete?: React.Dispatch<React.SetStateAction<boolean>>) =>
  async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      dispatch({ type: c.UPLOAD_IMAGE_REQUEST });

      const { data } = await axios.post<Icon>(`media`, {
        name: file.name,
      });

      const { id } = data;

      // await requestMyImages(
      //   metadata?.numberOfPage,
      //   metadata?.perPage
      // )(dispatch);
      //
      // await updateImage(id, { status: IMAGE_STATUSES.UPLOADING })(dispatch);

      EVAPORATE_CONFIG.bucket = `${getState().config.bucket}/media`;

      const evaporate = await Evaporate.create(EVAPORATE_CONFIG);

      const addConfig: Evaporate.AddConfig = {
        name: "media.png",
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
          const { data: newImageData } = await axios.get(`media/${id}`);

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
              IMAGE_STATUSES.CREATED,
            ].includes(newImageData.status)
          ) {
            onComplete?.(false);
            dispatch(getIcons());
            dispatch({ type: c.UPLOAD_IMAGE_SUCCESS });
            clearInterval(interval);
            // await requestMyImages(
            //   metadata?.numberOfPage,
            //   metadata?.perPage
            // )(dispatch);
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

export const deleteIcon =
  (id: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await axios.delete<Icon>(`media/${id}`).then((res) => {
        dispatch({
          type: TOUR_CONSTANTS.DELETE_ICONS_SUCCESS,
          payload: res.data,
        });
        dispatch(successNotification("File successfully deleted"));
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch(errorNotification(`Something went wrong: ${err.message}`));
      }
    }
  };

export function isJsonString(str: any): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
