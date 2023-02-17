import React from "react";
import KrpanoWrapper from "./KrpanoWrapper";
import { CONFIG, EVAPORATE_CONFIG } from "../../utils/config";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Layout from "../Layout";
import { ErrorText, GlobalStyle, LoaderWrapper } from "./styles";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../../store/index";

React.useLayoutEffect = React.useEffect;

type Source = "wix" | "viarLive";

interface Props {
  tourId: string;
  source: Source;
  isWidget?: any;
}

const Krpano = ({ tourId, source, isWidget }: Props) => {
  // debugger;

  // axios.interceptors.request.use((request) => {
  //   console.log("Starting Request", request, null, 2);
  //   return request;
  // });
  // axios.interceptors.response.use((response) => {
  //   console.log("Response:", response, null, 2);
  //   return response;
  // });

  axios.defaults.baseURL =
    source === "viarLive"
      ? "https://viar.live/api/v1/"
      : "https://api.wix.viar.live/api/v1/";

  EVAPORATE_CONFIG.signHeaders.Authorization = axios.defaults.headers.common[
    "Authorization"
  ] as string;

  EVAPORATE_CONFIG.signerUrl =
    source === "viarLive"
      ? "https://viar.live/api/v1/upload"
      : "https://api.wix.viar.live/api/v1/upload";

  CONFIG.token = axios.defaults.headers.common["Authorization"] as string;

  // CONFIG.awsBucket =
  //   source === "viarLive" ? "static.a.viar.live" : "test.static.a.viar.live";

  // CONFIG.apiUrl =
  //   source === "viarLive"
  //     ? "https://viar.live/api/v1/"
  //     : "https://api.wix.viar.live/api/v1/";
  // CONFIG.client = source;
  //
  // CONFIG.storageUrl =
  //   source === "viarLive"
  //     ? "https://d3m15nce7ee3px.cloudfront.net"
  //     : "https://ddn1wrsew90bv.cloudfront.net";
  //
  // CONFIG.awsBucket =
  //   source === "viarLive" ? "static.a.viar.live" : "test.static.a.viar.live";

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
              source={source}
              isWidget={isWidget}
            />
          </Layout>
        </GlobalStyle>
      </DndProvider>
    </Provider>
  );
};
export default /*wrapper.withRedux(*/ Krpano;
