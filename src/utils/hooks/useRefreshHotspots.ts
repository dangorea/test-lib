import { useSelector } from "react-redux";
import { getViewerImageId } from "../../store/viewer/selectors";
import { getCurrentTour, getHotspots } from "../../store/tours/selectors";
import type { Image360, Tour } from "../../store/types";
import { useAddHotspot } from "./useAddHotspot";
import { useCallback, useMemo } from "react";

export const useRefreshHotspots = (): (() => void) => {
  const sphereId = useSelector(getViewerImageId());
  const tour = useSelector(getCurrentTour()) as Tour;
  const addHotspot = useAddHotspot();
  // const hotspots = useSelector(getHotspots(sphereId as string));

  const hotspots = useMemo(
    () =>
      (tour?.spheres.find(({ id }) => id === sphereId) as Image360)?.hotSpots,
    [sphereId, tour?.spheres]
  );

  return useCallback(() => {
    if (hotspots) {
      hotspots.forEach((hotspot) => addHotspot(hotspot));
    }
  }, [addHotspot, hotspots]);
};
