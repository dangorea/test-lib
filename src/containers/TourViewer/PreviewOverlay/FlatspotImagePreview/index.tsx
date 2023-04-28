import React, { FC, useCallback, useEffect, useState } from "react";
import ModalPreview from "../../../../components/ModalPreview";
import * as DOMPurify from "dompurify";
import { useSelector } from "react-redux";
import { getCurrentTour } from "../../../../store/tours/selectors";
import { getHotspotFromTour } from "../../../../utils/tour";
import { Content, FlatSpotPreview } from "./style";
import { CONFIG } from "../../../../utils/config";
import type { Hotspot } from "../../../../store/tours/types";
import type { Tour } from "../../../../utils/types";

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

  if (!flatspot) {
    return null;
  }

  return (
    <ModalPreview
      label={flatspot?.name as string}
      onClose={() => setFlatspot(null)}
    >
      <FlatSpotPreview
        src={getImage(flatspot as Hotspot)}
        alt=""
        width={flatspot?.width}
        height={flatspot?.height}
      />
      <Content
        open={!!flatspot.content}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(flatspot?.content || ""),
        }}
      />
    </ModalPreview>
  );
};

export default FlatspotImagePreview;
