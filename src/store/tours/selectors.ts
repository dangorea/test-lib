import type {
  Image360,
  Level,
  PaginationMetadata,
  RootState,
  Tour,
} from "../types";
import type { Hotspot, State } from "./types";
import type { Icon } from "../types";

export const getIsToursLoading =
  () =>
  (state: RootState): boolean =>
    state.tours.isLoading;

export const getMyTours =
  () =>
  (state: RootState): Tour | null =>
    state.tours.currentTour;

export const getMyImage =
  () =>
  (state: RootState): any =>
    state?.images?.data?.items;

export const getCoverImageTitle =
  () =>
  (state: RootState): string => {
    const tour = state.tours.currentTour;
    const sphereId = tour?.startingPoint.sphereId;
    const image = tour?.spheres.find((sphere) => sphere.id === sphereId);
    const imageTitle =
      image?.title || image?.name.split(".").slice(0, -1).join(".");
    return imageTitle || "";
  };

export const getCoverImageUrl =
  () =>
  (state: RootState): string => {
    const tour = state.tours.currentTour;
    return tour ? tour?.startingPoint.coverUrl : "";
  };

export const getToursMetadata =
  () =>
  (state: RootState): PaginationMetadata =>
    state.tours.data.metadata;

export const getCurrentTour =
  () =>
  (state: RootState): State["currentTour"] => {
    return state.tours.currentTour;
  };

export const getHotspot =
  (hotspotId: string) =>
  (state: RootState): Hotspot | void => {
    const sphereId = hotspotId.split("_")[0];

    const sphere = state.tours.currentTour?.spheres.find(
      ({ id: sId }) => sId === sphereId
    );

    return sphere?.hotSpots.find(({ id: hId }) => hId === hotspotId);
  };

export const getHotspots =
  (sphereId: string) =>
  (state: RootState): Hotspot[] | undefined => {
    const sphere = state.tours.currentTour?.spheres.find(
      ({ id: sId }) => sId === sphereId
    );

    return sphere?.hotSpots;
  };

export const getAllSpheres =
  () =>
  (state: RootState): Array<Image360> | undefined =>
    state.tours.currentTour?.spheres;

export const getLevels =
  () =>
  (state: RootState): Level[] | [] =>
    state.tours.currentTour?.tourFloorPlan.levels || [];

export const getIcons =
  () =>
  (state: RootState): Icon[] | [] =>
    state.tours.icons;

export const getCurrentTourId =
  () =>
  (state: RootState): string | undefined =>
    state.tours.currentTour?.id;
