import React, { FC, useCallback, useEffect } from "react";
import {
  getHotspotFromTour,
  getLinkToImageHotspotFromTour,
  getProductHotspotFromTour,
} from "../../../utils/tour";
import { useDispatch, useSelector } from "react-redux";
import {
  updateHotspot,
  updateLinkToImageHotspot,
  updateLinkToProductHotspot,
} from "../../../store/tours/actions";
import {
  getKrpanoInterface,
  getViewerImageId,
} from "../../../store/viewer/selectors";
import { getCurrentTour } from "../../../store/tours/selectors";
import { TMP_HOTSPOT_NAME } from "./EditActions/constants";
import { Tour } from "../../../store/types";
import {
  Hotspot,
  HOTSPOT_TYPES,
  ProductHotspot,
} from "../../../store/tours/types";
import { Krpano } from "../../../utils/config";
import { LinkHotspot } from "../../../utils/types";
import EditActions from "./EditActions";
import EditBottomBar from "./EditBottomBar";

const EditTour: FC = () => {
  const tour = useSelector(getCurrentTour()) as Tour;
  const imageId = useSelector(getViewerImageId()) as string;
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const editable = useSelector(getCurrentTour())?.editable;
  const dispatch = useDispatch();

  const onHotspotDrop = useCallback(
    (e: any) => {
      const hotspotId = e.scene as string;

      if (hotspotId === TMP_HOTSPOT_NAME) {
        return;
      }

      const hotspot = getHotspotFromTour(tour, hotspotId) as Hotspot;
      const productSpot = getProductHotspotFromTour(tour, hotspotId, imageId);

      if (hotspot?.type === HOTSPOT_TYPES.LINK) {
        let linkHotspot = getLinkToImageHotspotFromTour(
          tour,
          hotspotId
        ) as LinkHotspot;
        if (!linkHotspot && hotspot.title && hotspot.target) {
          linkHotspot = (({ type, name, content, ...o }) => o)(
            hotspot
          ) as LinkHotspot;
        }
        dispatch(
          updateLinkToImageHotspot(tour.id, imageId, hotspotId, {
            ...linkHotspot,
            atv: krpano.get(`hotspot[${hotspotId}].atv`),
            ath: krpano.get(`hotspot[${hotspotId}].ath`),
          })
        );
      } else if (productSpot?.wixProductId) {
        let productHotspot = getProductHotspotFromTour(
          tour,
          hotspotId,
          imageId
        ) as ProductHotspot;
        if (!productHotspot && hotspot.title && hotspot.wixProductId) {
          productHotspot = (({ type, name, content, ...o }) => o)(
            hotspot
          ) as ProductHotspot;
        }
        dispatch(
          updateLinkToProductHotspot(tour.id, imageId, hotspotId, {
            ...productHotspot,
            atv: krpano.get(`hotspot[${hotspotId}].atv`),
            ath: krpano.get(`hotspot[${hotspotId}].ath`),
          })
        );
      } else {
        dispatch(
          updateHotspot(tour.id, imageId, hotspotId, {
            ...hotspot,
            atv: krpano.get(`hotspot[${hotspotId}].atv`),
            ath: krpano.get(`hotspot[${hotspotId}].ath`),
          })
        );
      }
    },
    [dispatch, imageId, krpano, tour]
  );

  useEffect(() => {
    document.addEventListener("drop:linkspot", onHotspotDrop);
    document.addEventListener("drop:infospot", onHotspotDrop);
    document.addEventListener("drop:hotspot", onHotspotDrop);
    document.addEventListener("drop:product", onHotspotDrop);
    document.addEventListener("drop:flatspot", onHotspotDrop);

    return () => {
      document.removeEventListener("drop:linkspot", onHotspotDrop);
      document.removeEventListener("drop:infospot", onHotspotDrop);
      document.removeEventListener("drop:hotspot", onHotspotDrop);
      document.removeEventListener("drop:product", onHotspotDrop);
      document.removeEventListener("drop:flatspot", onHotspotDrop);
    };
  }, [onHotspotDrop]);

  useEffect(() => {
    const hotspots =
      tour.spheres.find(({ id }) => id === imageId)?.hotSpots || [];

    const newHots = hotspots.map((hotspot) => {
      if (Object(hotspot).hasOwnProperty("wixProductId")) {
        return { ...hotspot, target: hotspot.wixProductId };
      }
      return hotspot;
    });

    setTimeout(() => {
      newHots?.forEach((hs) => {
        krpano.set(`hotspot[${hs.id}].draggable`, editable);
      });
    }, 300);

    return () => {
      newHots?.forEach((hs) => {
        krpano.set(`hotspot[${hs.id}].draggable`, false);
      });
    };
  }, [editable, imageId, krpano, tour]);

  return (
    <>
      {/*<EditControls />*/}
      <EditActions />
      <EditBottomBar />
    </>
  );
};

export default EditTour;
