import React, { useCallback, useEffect, useState } from "react";
import { getProductHotspotFromTour } from "../../../../utils/tour";
import type { Hotspot } from "../../../../store/tours/types";
import { useSelector } from "react-redux";
import { getCurrentTour } from "../../../../store/tours/selectors";
import type { Tour } from "../../../../store/types";
import { ContentDrawer, IframeBlock, Spinner, SpinnerBlock } from "./styles";
// import { SidePanel } from "wix-style-react";
import Iframe from "react-iframe";
import { getViewerImageId } from "../../../../store/viewer/selectors";
import { getProductById } from "../../../../utils/services/products";
import Wix from "wix-sdk";

const PRODUCT_CONTENT_DRAWER_WIDTH = window.innerWidth - 200 || 800;

const ProductSpotIframeDrawer = () => {
  const tour = useSelector(getCurrentTour()) as Tour;
  const imageId = useSelector(getViewerImageId()) as string;
  const instanceId = Wix.Utils.getInstanceId();
  const [productSpot, setProductSpot] = useState<Hotspot | null>(null);
  const [productUrl, setProductUrl] = useState<string>("");
  const [productIframeState, setProductIframeState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (productSpot && instanceId && productSpot.wixProductId) {
      setIsLoading(true);
      void getProductById({
        instanceId,
        wixProductId: productSpot?.wixProductId,
      })
        .then((res) => {
          if (res?.productPageUrl?.base && res?.productPageUrl?.path) {
            setProductUrl(
              `${res?.productPageUrl?.base}${res?.productPageUrl?.path}`
            );
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setProductUrl("");
        });
    }
  }, [instanceId, productSpot, tour]);

  const showProductSpotContent = useCallback(
    (e: any) => {
      const hotspot = getProductHotspotFromTour(
        tour,
        e.scene,
        imageId
      ) as Hotspot;
      setProductUrl("");
      setProductSpot(hotspot);
      setProductIframeState(true);
    },
    [imageId, tour]
  );

  useEffect(() => {
    document.addEventListener("click:product", showProductSpotContent);
    setProductIframeState(false);
    return () => {
      document.removeEventListener("click:product", showProductSpotContent);
    };
  }, [showProductSpotContent, productIframeState]);

  return (
    <>
      {productSpot?.title && !!productUrl?.length && (
        <ContentDrawer
          open={!!productSpot}
          width={PRODUCT_CONTENT_DRAWER_WIDTH}
        >
          {/*TODO Fix here*/}
          {/*<SidePanel*/}
          {/*  onCloseButtonClick={() => setProductSpot(null)}*/}
          {/*  width={"100%"}*/}
          {/*>*/}
          {/*  <SidePanel.Header*/}
          {/*    title={productSpot?.title}*/}
          {/*    showDivider={false}*/}
          {/*    className="wix-sidepanel-header"*/}
          {/*  />*/}
          {/*  <IframeBlock>*/}
          {/*    {isLoading ? (*/}
          {/*      <SpinnerBlock>*/}
          {/*        <Spinner />*/}
          {/*      </SpinnerBlock>*/}
          {/*    ) : (*/}
          {/*      !!productUrl.length &&*/}
          {/*      !productIframeState && (*/}
          {/*        <Iframe*/}
          {/*          url={productUrl}*/}
          {/*          width="100%"*/}
          {/*          height="100%"*/}
          {/*          frameBorder={0}*/}
          {/*          styles={{ overflowX: "scroll", overflowY: "scroll" }}*/}
          {/*        />*/}
          {/*      )*/}
          {/*    )}*/}
          {/*  </IframeBlock>*/}
          {/*</SidePanel>*/}
        </ContentDrawer>
      )}
    </>
  );
};

export default ProductSpotIframeDrawer;
