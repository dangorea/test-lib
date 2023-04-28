import React, { FC, useCallback, useEffect, useState } from "react";
import { getHotspotFromTour } from "../../../../utils/tour";
import type { Hotspot } from "../../../../store/tours/types";
import { useSelector } from "react-redux";
import { getCurrentTour } from "../../../../store/tours/selectors";
import type { Tour } from "../../../../utils/types";
import {
  CloseBtn,
  ContentDrawer,
  HeaderWrapper,
  RichTextPreview,
} from "./styles";
import Dismiss from "images/dismiss";
import * as DOMPurify from "dompurify";

const INFO_CONTENT_DRAWER_WIDTH = 540;

const InfospotContentDrawer: FC = () => {
  const tour = useSelector(getCurrentTour()) as Tour;

  const [infospot, setInfospot] = useState<Hotspot | null>(null);

  const showInfospotContent = useCallback(
    (e: any) => {
      const hotspot = getHotspotFromTour(tour, e.scene) as Hotspot;
      // hotspot.content = hotspot.content.replace(/\\n/g, "");
      // hotspot.content = hotspot.content.replace("\\", "");
      // hotspot.content = hotspot.content.replace(/"/g, "");
      // hotspot.content = hotspot.content.replace('\\n"', "");
      // hotspot.content = hotspot.content.replace('n"', "");
      setInfospot(hotspot);
    },
    [tour]
  );

  useEffect(() => {
    document.addEventListener("click:infospot", showInfospotContent);

    return () =>
      document.removeEventListener("click:infospot", showInfospotContent);
  }, [showInfospotContent]);

  return (
    <ContentDrawer open={!!infospot?.content} width={INFO_CONTENT_DRAWER_WIDTH}>
      <HeaderWrapper>
        <div>{infospot?.name}</div>
        <CloseBtn onClick={() => setInfospot(null)}>
          <Dismiss />
        </CloseBtn>
      </HeaderWrapper>
      <RichTextPreview
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(infospot?.content || ""),
        }}
      />
    </ContentDrawer>
  );
};

export default InfospotContentDrawer;
