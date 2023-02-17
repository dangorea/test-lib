import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getKrpanoInterface,
  getTypeOfView,
  getViewerTourMode,
} from "../../../store/viewer/selectors";
import { setViewerImageId } from "../../../store/viewer/actions";
import { getCurrentTour } from "../../../store/tours/selectors";
import { TOUR_MODES } from "../../../store/viewer/constants";
import type { Hotspot } from "../../../store/tours/types";
import type { Tour } from "../../../store/types";

import { getHotspotFromTour } from "../../../utils/tour";

import PreviewActions from "./PreviewActions";
import PreviewBottomBar from "./PreviewBottomBar";
import InfospotContentDrawer from "./InfospotContentDrawer";
import GalleryspotContentDrawer from "./GalleryspotContentDrawer";
import ProductSpotIframeDrawer from "./ProductspotIframeDrawer";
import type { Krpano } from "../../../utils/config";
import PreviewFloorPlan from "./PreviewFloorPlan";
import FlatspotImagePreview from "./FlatspotImagePreview";

const PreviewOverlay: FC = () => {
  const dispatch = useDispatch();
  const tour = useSelector(getCurrentTour()) as Tour;
  const isEditing = useSelector(getViewerTourMode()) === TOUR_MODES.EDIT;
  const isWidget = useSelector(getTypeOfView());
  const krpano = useSelector(getKrpanoInterface()) as Krpano;

  const openHotspotLink = useCallback(
    (e: any) => {
      if (isEditing) {
        return;
      }

      const hotspot = getHotspotFromTour(tour, e.scene);

      window.open(hotspot?.content, "_blank");
    },
    [isEditing, tour]
  );

  const loadScene = useCallback(
    (e: any) => {
      if (isEditing) {
        return;
      }

      const hotspot = getHotspotFromTour(tour, e.scene) as Hotspot;
      if (hotspot && hotspot.hotspotStartingPoint) {
        krpano.set("view.hlookat", hotspot.hotspotStartingPoint.ath);
        krpano.set("view.vlookat", hotspot.hotspotStartingPoint.atv);
        krpano.set("view.fov", hotspot.hotspotStartingPoint.fov);
      }
      dispatch(setViewerImageId(hotspot.content));
    },
    [dispatch, isEditing, krpano, tour]
  );

  useEffect(() => {
    document.addEventListener("click:linkspot", openHotspotLink);
    document.addEventListener("click:hotspot", loadScene);

    return () => {
      document.removeEventListener("click:linkspot", openHotspotLink);
      document.removeEventListener("click:hotspot", loadScene);
    };
  }, [loadScene, openHotspotLink]);

  return (
    <>
      {!isWidget && (
        <>
          <PreviewActions />
          <GalleryspotContentDrawer />
        </>
      )}
      {/*<PreviewFloorPlan />*/}
      <InfospotContentDrawer />
      {/*<ProductSpotIframeDrawer />*/}
      <FlatspotImagePreview />
      <PreviewBottomBar />
    </>
  );
};

export default PreviewOverlay;
