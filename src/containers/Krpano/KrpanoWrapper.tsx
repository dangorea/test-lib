import React, { useEffect, useState } from "react";
import Viewer from "../Viewer";
import TourViewer from "../TourViewer";
import { useDispatch, useSelector } from "react-redux";
import { openTourViewer, setWidgetView } from "../../store/viewer/actions";
import { getViewerImageId } from "../../store/viewer/selectors";
import {
  setOnClose,
  setSource,
  setUserConfig,
} from "../../store/config/reducer";
import type { SUBSCRIPTION_PLAN } from "../../utils/types";
import WidgetTourPreview from "../Widget/WidgetTourPreview";
import { isDefault } from "../../utils/premium";
import { getWidgetAutoplayTour } from "../../store/widget/selectors";
import { getCoverImageUrl } from "../../store/tours/selectors";
import { CONFIG } from "../../utils/config";
import { MaskBackground, MaskText, MaskWrapper } from "./styles";

React.useLayoutEffect = React.useEffect;

type Props = {
  tourId: string;
  userConfig: SUBSCRIPTION_PLAN;
  source: string;
  tourMode: string;
  isWidget?: boolean;
  onClose: () => void;
};

const KrpanoWrapper = ({
  tourId,
  userConfig,
  source,
  tourMode,
  isWidget = false,
  onClose,
}: Props) => {
  const dispatch = useDispatch();
  const imageId = useSelector(getViewerImageId());
  const [isPreview, setIsPreview] = useState(isWidget);
  const coverUrl = useSelector(getCoverImageUrl());
  const enableAutoplayTour = useSelector(getWidgetAutoplayTour());

  useEffect(() => {
    dispatch(
      // @ts-ignore
      openTourViewer(tourId, tourMode)
    );
    dispatch(setSource(source));
    dispatch(setOnClose(onClose));
    dispatch(setUserConfig(userConfig));
    if (isWidget) {
      dispatch(setWidgetView(true));
    }
  }, []);

  if (!imageId) {
    return null;
  }

  return isDefault(userConfig.id) ? (
    <MaskWrapper>
      <MaskBackground
        src={
          coverUrl
            ? `${CONFIG.storageUrl}/${coverUrl}`
            : `${CONFIG.storageUrl}/tours/${tourId}/cover.jpg?v=0`
        }
        alt=""
      />
      <MaskText>Your trial expired please upgrade</MaskText>
    </MaskWrapper>
  ) : isPreview && !enableAutoplayTour ? (
    <WidgetTourPreview
      tourId={tourId}
      coverUrl={coverUrl}
      setIsPreview={setIsPreview}
    />
  ) : (
    <Viewer id={imageId}>
      <TourViewer />
    </Viewer>
  );
};

export default KrpanoWrapper;
