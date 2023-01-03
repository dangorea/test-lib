import React, { Fragment, useEffect } from "react";
import Viewer from "../Viewer";
import TourViewer from "../TourViewer";
import { getTourPreview, requestMyTours } from "../../store/tours/actions";
import { useDispatch, useSelector } from "react-redux";
import { setViewerImageId, setViewerTourId } from "../../store/viewer/actions";
import { requestMyImages } from "../../store/images/actions";
import { getImage } from "../../store/images/selector";
import { getMyImage } from "../../store/tours/selectors";
import { getWidgetSettings } from "../../store/widget/actions";

function KrpanoWrapper({ imageId, tourId }: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setViewerImageId(imageId));
    dispatch(requestMyImages());
    dispatch(requestMyTours());
    dispatch(setViewerTourId(tourId));
    dispatch(getTourPreview(tourId));
    dispatch(getWidgetSettings());
  }, [imageId, tourId]);

  const image = useSelector(getImage(imageId));
  const myImages = useSelector(getMyImage());

  if (!imageId) {
    return null;
  }

  return (
    <Fragment>
      {image && myImages ? (
        <Viewer>
          <TourViewer id={tourId} />
        </Viewer>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
}

export default KrpanoWrapper;
