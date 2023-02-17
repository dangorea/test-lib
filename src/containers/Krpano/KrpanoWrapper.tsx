import React, { useEffect } from "react";
import Viewer from "../Viewer";
import TourViewer from "../TourViewer";
import { useDispatch, useSelector } from "react-redux";
import { openTourViewer, setWidgetView } from "../../store/viewer/actions";
import { getViewerImageId } from "../../store/viewer/selectors";
import { setSource } from "../../store/test/reducer";
import { getIcons } from "../../store/tours/actions";
React.useLayoutEffect = React.useEffect;
type Props = {
  tourId: string;
  source: string;
  isWidget?: boolean;
};

function KrpanoWrapper({ tourId, source, isWidget = false }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openTourViewer(tourId));
    dispatch(setSource(source));
    dispatch(getIcons());
  }, []);

  const imageId = useSelector(getViewerImageId());

  if (isWidget) {
    dispatch(setWidgetView(true));
  }

  if (!imageId) {
    return null;
  }

  return (
    <>
      <Viewer id={imageId}>
        <TourViewer id={tourId} />
      </Viewer>
    </>
  );
}

export default KrpanoWrapper;
