import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestFullTour } from "../../store/tours/actions";
import {
  getKrpanoInterface,
  getTypeOfView,
  getViewerImageId,
  getViewerTourMode,
} from "../../store/viewer/selectors";

import EditTour from "./EditTour";
import PreviewOverlay from "./PreviewOverlay";

import { TOUR_MODES } from "../../store/viewer/constants";
import { getCurrentTour } from "../../store/tours/selectors";
import {
  getWidgetAutoplayTour,
  getWidgetBorder,
} from "../../store/widget/selectors";
import { useRefreshHotspots } from "../../utils/hooks/useRefreshHotspots";

type Props = {
  id: string;
  params?: Array<string | boolean>;
};

const TourViewer: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const imageId = useSelector(getViewerImageId());
  const tourMode = useSelector(getViewerTourMode());

  const tour = useSelector(getCurrentTour());
  const image = tour?.spheres.find((sphere) => sphere.id === imageId);
  const isWidget = useSelector(getTypeOfView());
  const borderStyle = useSelector(getWidgetBorder());
  const enableAutoplayTour = useSelector(getWidgetAutoplayTour());
  const krpano = useSelector(getKrpanoInterface());
  const refreshHotspots = useRefreshHotspots();

  const [localTourMode, setLocalTourMode] = useState("EDIT");

  useEffect(() => {
    dispatch(requestFullTour(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      setLocalTourMode(tourMode);
    }, 200);
  }, [tourMode]);

  if (!id) {
    return null;
  }

  return localTourMode === TOUR_MODES.PREVIEW ? (
    <PreviewOverlay />
  ) : (
    <EditTour />
  );
};

export default TourViewer;
