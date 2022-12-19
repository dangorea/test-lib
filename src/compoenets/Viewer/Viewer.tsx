import React, { useCallback, useEffect, useState } from "react";
import "./Viewer.css";
import { createPortal } from "react-dom";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { embedPano, removePano, useMountEffect, VIEWER_CONFIG } from "./config";

interface Props {
  imageId: string;
  image: any;
  tour: any;
  krpano: any;
  refreshHotspots: () => void;
  isWidget: any;
  borderStyle: any;
  enableAutoplayTour: any;
  children: any;
  isSideViewer: any;
  generateInitialXml: any;
  setKrpanoInterface: any;
  removeKrpanoInterface: any;
}

const ADD_SPOT_DND_TYPE = "ADD_SPOT_DND_TYPE";
const ADD_IMAGE_HOTSPOT = "ADD_IMAGE_HOTSPOT";

const Viewer = ({
  imageId,
  krpano,
  image,
  children,
  enableAutoplayTour,
  tour,
  refreshHotspots,
  borderStyle,
  isWidget,
  isSideViewer,
  generateInitialXml,
  setKrpanoInterface,
  removeKrpanoInterface,
}: Props) => {
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
        kr.call(`loadxml(${generateInitialXml(tour, image.image.type)})`);

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
        dispatch(setKrpanoInterface(kr));
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
        dispatch(removeKrpanoInterface());
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

    if (!!tour && krpano) {
      krpano.set("events.onnewscene", refreshHotspots);

      krpano.call(
        `loadscene(${imageId}, ${startingViewVars}, MERGE | KEEPVIEW, ZOOMBLEND(2.0, 2.0, easeInOutSine))`
      );

      return () => {
        krpano.set("events.onnewscene", null);
      };
    }

    return;
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId, !!tour, krpano]);

  useEffect(() => {
    if (!krpano || !tour) {
      return;
    }
    setTimeout(() => {
      krpano.set("events.onnewscene", refreshHotspots);
    }, 800);
  }, [tour, refreshHotspots]);

  return (
    <div className={'viewer-container'}
      {...borderStyle}
      id={
        isSideViewer ? VIEWER_CONFIG.SECOND_TARGET_ID : VIEWER_CONFIG.TARGET_ID
      }
      ref={drop}
    >
      {viewerEl ? createPortal(children, viewerEl) : null}
    </div>
  );
};

export default Viewer;
