import React, { FC, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
// import { sanitize } from "dompurify";

import { getCurrentTour } from "../../../../store/tours/selectors";
import type { Hotspot } from "../../../../store/tours/types";
import type { Tour } from "../../../../store/types";

import { getHotspotFromTour } from "../../../../utils/tour";
import useOpen from "../../../../utils/hooks/useOpen";

// import { Modal, ModalPreviewLayout, Image, Box } from "wix-style-react";
import { CONFIG } from "../../../../utils/config";

const GalleryspotContentDrawer: FC = () => {
  const { open, handleClose, handleOpen } = useOpen();

  const tour = useSelector(getCurrentTour()) as Tour;

  const [galleryspotContent, setGalleryspotContent] = useState("");

  const showGalleryspotContent = useCallback(
    (e: any) => {
      const hotspot = getHotspotFromTour(tour, e.scene) as Hotspot;
      const imageId = /*sanitize(hotspot.content)*/ hotspot.content;

      const imagePreview = `${CONFIG.storageUrl}/spheres/${imageId}/preview.jpg`;
      setGalleryspotContent(imagePreview);
      handleOpen();
    },
    [handleOpen, tour]
  );

  useEffect(() => {
    document.addEventListener("click:gallery", showGalleryspotContent);

    return () =>
      document.removeEventListener("click:gallery", showGalleryspotContent);
  }, [showGalleryspotContent]);

  return (
    <></>
    // <Modal isOpen={open} shouldCloseOnOverlayClick onRequestClose={handleClose}>
    //   <ModalPreviewLayout title="title" onClose={handleClose}>
    //     {/* @ts-ignore*/}
    //     <Box verticalAlign="middle" height="100%">
    //       <Image src={galleryspotContent} title="Alt text" />
    //     </Box>
    //   </ModalPreviewLayout>
    // </Modal>
    // TODO fix here
  );
};

export default GalleryspotContentDrawer;
