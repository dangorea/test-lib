import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Iframe from "react-iframe";
import Wix from "wix-sdk";
import Dismiss from "images/dismiss";
import { getProductHotspotFromTour } from "../../../../utils/tour";
import { getCurrentTour } from "../../../../store/tours/selectors";
import { getViewerImageId } from "../../../../store/viewer/selectors";
import { getProductById } from "../../../../store/tours/actions";
import { CloseBtn, HeaderWrapper } from "../InfospotContentDrawer/styles";
import { ContentDrawer, IframeBlock } from "./styles";
import type { Product, Tour } from "../../../../store/types";
import type { Hotspot } from "../../../../store/tours/types";

const PRODUCT_CONTENT_DRAWER_WIDTH = window.innerWidth - 200 || 800;

const ProductSpotIframeDrawer = () => {
  const tour = useSelector(getCurrentTour()) as Tour;
  const imageId = useSelector(getViewerImageId()) as string;
  const [productId, setProductId] = useState<string>("");
  const [productSpot, setProductSpot] = useState<Product | null>(null);
  const instanceId = Wix.Utils.getInstanceId();

  useEffect(() => {
    if (instanceId && productId) {
      getProductById(instanceId, productId).then((res) => setProductSpot(res));
    }
  }, [instanceId, tour, productId]);

  const showProductSpotContent = useCallback(
    (e: any) => {
      const hotspot = getProductHotspotFromTour(
        tour,
        e.scene,
        imageId
      ) as Hotspot;

      setProductId(hotspot.wixProductId || "");
    },
    [imageId, tour]
  );

  useEffect(() => {
    document.addEventListener("click:product", showProductSpotContent);
    return () => {
      document.removeEventListener("click:product", showProductSpotContent);
    };
  }, [showProductSpotContent]);

  return (
    <ContentDrawer open={!!productSpot} width={PRODUCT_CONTENT_DRAWER_WIDTH}>
      <HeaderWrapper>
        <div>{productSpot?.name}</div>
        <CloseBtn onClick={() => setProductSpot(null)}>
          <Dismiss />
        </CloseBtn>
      </HeaderWrapper>
      {productSpot && (
        <IframeBlock>
          <Iframe
            url={
              productSpot?.productPageUrl?.base +
              productSpot?.productPageUrl?.path
            }
            width="100%"
            height="100%"
            frameBorder={0}
            styles={{ overflowX: "scroll", overflowY: "scroll" }}
          />
        </IframeBlock>
      )}
    </ContentDrawer>
  );
};

export default ProductSpotIframeDrawer;
