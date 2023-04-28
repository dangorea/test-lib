import { useSelector } from "react-redux";
import { getViewerImageId } from "../../store/viewer/selectors";
import { getCurrentTour } from "../../store/tours/selectors";
import type { Image360 } from "../../store/types";
import type { Tour } from "../types";
import { useAddHotspot } from "./useAddHotspot";
import { useCallback, useMemo } from "react";

export const useRefreshHotspots = (): (() => void) => {
  const sphereId = useSelector(getViewerImageId());
  const tour = useSelector(getCurrentTour()) as Tour;
  const addHotspot = useAddHotspot();

  const hotspots = useMemo(
    () =>
      (tour.spheres.find(({ id }) => id === sphereId) as Image360)?.hotSpots,
    [sphereId, tour?.spheres]
  );

  return useCallback(() => {
    if (hotspots) {
      hotspots.forEach((hotspot) => addHotspot(hotspot));
    }
  }, [addHotspot, hotspots]);
};
