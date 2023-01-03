import React, { ReactElement, useEffect } from "react";
import Viewer from "../Viewer";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getCurrentTour, getMyTours } from "../../store/tours/selectors";
import { getImage, getMyImages } from "../../store/images/selector";
import store from "../../store";
import TourViewer from "../TourViewer";
import {
  requestFullTour,
  requestMyTours,
  setTourState,
} from "../../store/tours/actions";
import { Tour } from "../../store/types";
import KrpanoWrapper from "./KrpanoWrapper";

interface Props {
  imageId: string;
  tourId: string;
  isWidget?: any;
  borderStyle?: any;
  enableAutoplayTour?: any;
  isSideViewer?: any;
}

const Krpano = ({
  imageId,
  tourId,
  isWidget,
  borderStyle,
  enableAutoplayTour,
  isSideViewer,
}: Props) => {
  if (!imageId) {
    return null;
  }

  return (
    <Provider store={store}>
      <KrpanoWrapper imageId={imageId} tourId={tourId} />
    </Provider>
  );
};
export default Krpano;
