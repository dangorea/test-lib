import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { useDrop } from "react-dnd";

import { getImage } from "../../store/images/selector";
import type { Image360 } from "../../store/types";
import {
  removeKrpanoInterface,
  removeSecondKrpanoInterface,
  setKrpanoInterface,
  setSecondKrpanoInterface,
  setViewerState,
} from "../../store/viewer/actions";
import { getCurrentTour } from "../../store/tours/selectors";
import {
  getWidgetAutoplayTour,
  getWidgetBorder,
} from "../../store/widget/selectors";
import {
  getKrpanoInterface,
  getSecondKrpanoInterface,
  getTypeOfView,
  getViewerImageId,
} from "../../store/viewer/selectors";

import { VIEWER_CONFIG, embedPano, removePano } from "../../utils/config";

import { generateInitialTourXml, generateInitialXml } from "../../utils/xml";
import useMountEffect from "../../utils/hooks/useMountEffect";

import { ADD_SPOT_DND_TYPE } from "../TourViewer/EditTour/EditActions/DraggableActionBtn";
import { ADD_IMAGE_HOTSPOT } from "../TourViewer/EditTour/EditBottomBar/ImageListItem";
import { useRefreshHotspots } from "../../utils/hooks/useRefreshHotspots";
import { ViewerContainer } from "./styles";
import { requestMyTours, setTourState } from "../../store/tours/actions";
import { setImageState } from "../../store/images/actions";

type Props = {
  id?: string;
  children?: ReactElement;
  isSideViewer?: boolean;
};

export type ViewerDropResult = {
  x: number;
  y: number;
};

const Viewer: FC<Props> = ({ id, children, isSideViewer }) => {
  const imageId = useSelector(getViewerImageId());
  const image = useSelector(getImage(imageId as string)) as Image360;
  const tour = useSelector(getCurrentTour());
  const krpano = useSelector(
    isSideViewer ? getSecondKrpanoInterface() : getKrpanoInterface()
  );
  const refreshHotspots = useRefreshHotspots();
  const isTour = !!tour;
  const isWidget = useSelector(getTypeOfView());
  const borderStyle = useSelector(getWidgetBorder());
  const enableAutoplayTour = useSelector(getWidgetAutoplayTour());

  const [_, drop] = useDrop(() => ({
    accept: [ADD_SPOT_DND_TYPE, ADD_IMAGE_HOTSPOT],
    drop: (_, monitor) => {
      return monitor.getClientOffset();
    },
  }));

  const dispatch = useDispatch();
  const [viewerEl, setViewerEl] = useState<null | Element>(null);

  const loadInitialView = useCallback(() => {
    embedPano({
      // todo remove consolelog
      consolelog: true,
      id: isSideViewer
        ? VIEWER_CONFIG.SECOND_VIEWER_ID
        : VIEWER_CONFIG.MAIN_VIEWER_ID,
      target: isSideViewer
        ? VIEWER_CONFIG.SECOND_TARGET_ID
        : VIEWER_CONFIG.TARGET_ID,
      onready: (kr) => {
        kr.call(
          `loadxml(${
            tour
              ? generateInitialTourXml(tour, image.image.type) // isAutoplay
              : generateInitialXml(image)
          })`
        );

        kr.call("skin_hidebottombar");

        setTimeout(() => {
          kr.set("control.bouncinglimits", false);
          if (enableAutoplayTour) {
            // kr.call('custom_little_planet_intro');
            kr.set("autorotate.enabled", true);
            kr.call("autorotate.start();");
          } else {
            kr.set("autorotate.enabled", false);
          }
        }, 500);

        setViewerEl(document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID));
        dispatch(
          isSideViewer ? setSecondKrpanoInterface(kr) : setKrpanoInterface(kr)
        );
      },
    });
  }, [dispatch, enableAutoplayTour, image, isSideViewer, tour]);

  useMountEffect(() => {
    if (!isWidget) {
      loadInitialView();
    }
    return () => {
      if (!isWidget) {
        removePano(
          isSideViewer
            ? VIEWER_CONFIG.SECOND_VIEWER_ID
            : VIEWER_CONFIG.MAIN_VIEWER_ID
        );
        dispatch(
          isSideViewer ? removeSecondKrpanoInterface() : removeKrpanoInterface()
        );
      }
    };
  });

  useEffect(() => {
    if (isWidget) {
      loadInitialView();
    }
    return () => {
      if (isWidget) {
        removePano();
        dispatch(removeKrpanoInterface());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour?.id]);

  useEffect(() => {
    const startingViewVars = `view.hlookat=${image.startingPoint.ath}&amp;view.vlookat=${image.startingPoint.atv}&amp;view.fov=${image.startingPoint.fov}`;

    if (isTour && krpano) {
      krpano.set("events.onnewscene", refreshHotspots);

      krpano.call(
        `loadscene(${
          id || imageId
        }, ${startingViewVars}, MERGE | KEEPVIEW, ZOOMBLEND(2.0, 2.0, easeInOutSine))`
      );

      return () => {
        krpano.set("events.onnewscene", null);
      };
    }

    return;
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, imageId, isTour, krpano]);

  useEffect(() => {
    if (!krpano || !tour) {
      return;
    }
    setTimeout(() => {
      krpano.set("events.onnewscene", refreshHotspots);
    }, 800);
  }, [tour, refreshHotspots]);

  return (
    <ViewerContainer
      isSideViewer={isSideViewer}
      {...borderStyle}
      id={
        isSideViewer ? VIEWER_CONFIG.SECOND_TARGET_ID : VIEWER_CONFIG.TARGET_ID
      }
      ref={drop}
    >
      {viewerEl ? createPortal(children, viewerEl) : null}
    </ViewerContainer>
  );
};

export default Viewer;
