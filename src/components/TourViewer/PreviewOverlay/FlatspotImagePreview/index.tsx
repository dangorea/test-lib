import { Box, Modal, ModalPreviewLayout } from "wix-style-react";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentTour } from "../../../../store/tours/selectors";
import type { Tour } from "../../../../store/types";
import type { Hotspot } from "../../../../store/tours/types";
import { getHotspotFromTour } from "../../../../utils/tour";
import { CONFIG } from "../../../../utils/config";
import { Content, PreviewWrapper } from "./style";
import { sanitize } from "dompurify";

const FlatspotImagePreview: FC = () => {
  const tour = useSelector(getCurrentTour()) as Tour;

  const [flatspot, setFlatspot] = useState<Hotspot | null>(null);

  const showFlatspotContent = useCallback(
    (e: any) => {
      const hotspot = getHotspotFromTour(tour, e.scene) as Hotspot;

      setFlatspot(hotspot);
    },
    [tour]
  );

  useEffect(() => {
    document.addEventListener("click:flatspot", showFlatspotContent);

    return () =>
      document.removeEventListener("click:flatspot", showFlatspotContent);
  }, [showFlatspotContent]);

  const getImage = (flatspot: Hotspot) => {
    return `${CONFIG.storageUrl}/spheres/${flatspot?.target}/preview.jpg`;
  };

  const parser = new DOMParser();
  const content = parser.parseFromString(
    flatspot?.content as string,
    "application/xml"
  )?.lastElementChild?.textContent;

  return (
    // @ts-ignore
    <Modal isOpen={!!flatspot?.content}>
      <ModalPreviewLayout
        title={flatspot?.name}
        onClose={() => setFlatspot(null)}
      >
        {/*// @ts-ignore*/}
        <Box verticalAlign="middle" height="100%" align="center">
          <PreviewWrapper>
            <img
              src={getImage(flatspot as Hotspot)}
              alt=""
              width={flatspot?.width}
              height={flatspot?.height}
            />
            {content && (
              <Content
                dangerouslySetInnerHTML={{
                  __html: sanitize(flatspot?.content || ""),
                }}
              />
            )}
          </PreviewWrapper>
        </Box>
      </ModalPreviewLayout>
    </Modal>
  );
};

export default FlatspotImagePreview;
