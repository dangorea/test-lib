import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getViewerTourMode } from "../../store/viewer/selectors";

import EditTour from "./EditTour";
import PreviewOverlay from "./PreviewOverlay";

import { TOUR_MODES } from "../../store/viewer/constants";

type Props = {
  id: string;
  params?: Array<string | boolean>;
};

const TourViewer: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const tourMode = useSelector(getViewerTourMode());

  return tourMode === TOUR_MODES.PREVIEW ? <PreviewOverlay /> : <EditTour />;
};

export default TourViewer;
