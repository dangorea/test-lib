import React, { FC } from "react";
import KrpanoWrapper from "./KrpanoWrapper";
import { CONFIG, EVAPORATE_CONFIG } from "../../utils/config";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Layout from "../Layout";
import { ErrorText, GlobalStyle, LoaderWrapper } from "./styles";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../../store/index";
import { TOUR_MODES } from "../../store/viewer/constants";
import type { SUBSCRIPTION_PLAN } from "../../utils/types";

React.useLayoutEffect = React.useEffect;

type Source = "wix" | "viarLive";
interface Props {
  tourId: string;
  userConfig: SUBSCRIPTION_PLAN;
  source: Source;
  tourMode: string;
  isWidget?: boolean;
  onClose: () => void;
}

const Krpano: FC<Props> = ({
  tourId,
  userConfig,
  source,
  isWidget,
  tourMode = TOUR_MODES.PREVIEW,
  onClose,
}) => {
  axios.defaults.baseURL =
    source === "viarLive"
      ? "https://api.test.viar.live/api/v1/"
      : "https://api.wix.viar.live/api/v1/";

  EVAPORATE_CONFIG.signHeaders.Authorization = axios.defaults.headers.common[
    "Authorization"
  ] as string;

  EVAPORATE_CONFIG.signerUrl =
    source === "viarLive"
      ? "https://api.test.viar.live/api/v1/upload"
      : "https://api.wix.viar.live/api/v1/upload";

  CONFIG.token = axios.defaults.headers.common["Authorization"] as string;
  CONFIG.subscriptionPlan = userConfig;

  if (!tourId || !source) {
    return (
      <LoaderWrapper>
        <ErrorText>Something went wrong!</ErrorText>
      </LoaderWrapper>
    );
  }

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <GlobalStyle>
          <Layout>
            <KrpanoWrapper
              tourId={tourId}
              userConfig={userConfig}
              source={source}
              tourMode={tourMode}
              isWidget={isWidget}
              onClose={onClose}
            />
          </Layout>
        </GlobalStyle>
      </DndProvider>
    </Provider>
  );
};
export default /*wrapper.withRedux(*/ Krpano;
