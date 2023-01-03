import React, { FC, useCallback } from "react";
import { manageSpheres } from "../../../../../../store/tours/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  getTourId,
  getViewerImageId,
} from "../../../../../../store/viewer/selectors";
import { MessageModalLayout, Modal, Text } from "wix-style-react";
import { getImageTitles } from "../../../../../../store/images/selector";
import { TOUR_ACTIONS } from "../../../../../../store/tours/constants";
import { setViewerImageId } from "../../../../../../store/viewer/actions";
import { VIEWER_CONFIG } from "../../../../../../utils/config";

type Props = {
  imageId: string | null;
  handleClose: () => void;
};

const ImageUnlinkModal: FC<Props> = ({ imageId, handleClose }) => {
  const tourId = useSelector(getTourId()) as string;
  const imageTitle = useSelector(getImageTitles([imageId as string]));
  const currentViewerImage = useSelector(getViewerImageId());

  const dispatch = useDispatch();

  const unlinkImage = useCallback(() => {
    dispatch(
      manageSpheres(
        tourId,
        [imageId as string],
        TOUR_ACTIONS.DELETE,
        (updatedTour) => {
          if (imageId === currentViewerImage) {
            dispatch(setViewerImageId(updatedTour.spheres[0].id));
          }

          handleClose();
        }
      )
    );
  }, [currentViewerImage, dispatch, handleClose, imageId, tourId]);

  return (
    // @ts-ignore
    <Modal
      isOpen={!!imageId}
      shouldCloseOnOverlayClick
      onRequestClose={handleClose}
      parentSelector={() =>
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as HTMLElement
      }
    >
      {/*@ts-ignore*/}
      <MessageModalLayout
        theme={"destructive"}
        onCloseButtonClick={handleClose}
        primaryButtonText="Unlink"
        primaryButtonOnClick={unlinkImage}
        secondaryButtonText="Cancel"
        secondaryButtonOnClick={handleClose}
        title="Unlink Images"
      >
        <Text>{`Are you sure you want to unlink following image: `}</Text>
        <Text weight="bold">{imageTitle}</Text>
      </MessageModalLayout>
    </Modal>
  );
};

export default ImageUnlinkModal;
