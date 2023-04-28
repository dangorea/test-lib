import React, { FC } from "react";
import { useSelector } from "react-redux";
import { getViewerTourMode } from "../../store/viewer/selectors";

import EditTour from "./EditTour";
import PreviewOverlay from "./PreviewOverlay";

import { TOUR_MODES } from "../../store/viewer/constants";

const TourViewer: FC = () => {
  const tourMode = useSelector(getViewerTourMode());

  return tourMode === TOUR_MODES.PREVIEW ? <PreviewOverlay /> : <EditTour />;
};

export default TourViewer;
