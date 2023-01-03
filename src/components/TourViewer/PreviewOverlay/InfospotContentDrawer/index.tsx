import React, { FC, useCallback, useEffect, useState } from "react";
import { getHotspotFromTour } from "../../../../utils/tour";
import type { Hotspot } from "../../../../store/tours/types";
import { sanitize } from "dompurify";
import { useSelector } from "react-redux";
import { getCurrentTour } from "../../../../store/tours/selectors";
import type { Tour } from "../../../../store/types";
import { ContentDrawer } from "./styles";
import { SidePanel } from "wix-style-react";

const INFO_CONTENT_DRAWER_WIDTH = 540;

const InfospotContentDrawer: FC = () => {
  const tour = useSelector(getCurrentTour()) as Tour;

  const [infospot, setInfospot] = useState<Hotspot | null>(null);

  const showInfospotContent = useCallback(
    (e: any) => {
      const hotspot = getHotspotFromTour(tour, e.scene) as Hotspot;
      hotspot.content = hotspot.content.replace(
        /href/g,
        'target="_blank" href'
      );

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
      <SidePanel onCloseButtonClick={() => setInfospot(null)} width={"100%"}>
        <SidePanel.Header
          title={infospot?.name as string}
          showDivider={false}
          className="wix-sidepanel-header"
        />
        <SidePanel.Content className="wix-sidepanel-content">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitize(infospot?.content || ""),
            }}
          />
        </SidePanel.Content>
      </SidePanel>
    </ContentDrawer>
  );
};

export default InfospotContentDrawer;
