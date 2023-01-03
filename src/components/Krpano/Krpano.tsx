import React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import KrpanoWrapper from "./KrpanoWrapper";
import { CONFIG } from "../../utils/config";

interface Props {
  imageId: string;
  tourId: string;
  apiUrl: string;
  isWidget?: any;
  borderStyle?: any;
  enableAutoplayTour?: any;
  isSideViewer?: any;
}

const Krpano = ({
  imageId,
  tourId,
  apiUrl,
  isWidget,
  borderStyle,
  enableAutoplayTour,
  isSideViewer,
}: Props) => {
  CONFIG.apiUrl = apiUrl;

  console.log("test", { imageId, tourId, apiUrl });

  if (!imageId && !apiUrl) {
    return <>Error</>;
  }

  return (
    <Provider store={store}>
      <KrpanoWrapper imageId={imageId} tourId={tourId} />
    </Provider>
  );
};
export default Krpano;
