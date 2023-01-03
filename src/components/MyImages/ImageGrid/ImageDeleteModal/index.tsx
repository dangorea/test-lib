import axios from "axios";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageModalLayout,
  Modal,
  Text,
  Divider,
  TextButton,
} from "wix-style-react";

import { getImageTitles } from "../../../../store/images/selector";
import { errorNotification } from "../../../../store/notifications/actions";
import { deleteImage } from "../../../../store/images/actions";
import {
  setViewerImageId,
  setViewerTourId,
} from "../../../../store/viewer/actions";
import type { Tour } from "../../../../store/types";

import { CONFIG } from "../../../../utils/config";

import { ModalContent } from "./styles";

type Props = {
  ids: string[];
  setDeleteIds: (ids: string[]) => void;
  setSelected: Dispatch<SetStateAction<string[]>>;
  open: boolean;
  handleClose: () => void;
};

type UsedImages = Array<{
  tourTitles: string[];
  imageId: string;
  tourId: string[];
}>;

const ImageDeleteModal: FC<Props> = ({
  ids,
  setDeleteIds,
  setSelected,
  handleClose,
  open,
}) => {
  const [usedImages, setUsedImages] = useState<UsedImages>([]);
  const isSingle = ids.length === 1;
  const imageTitles = useSelector(getImageTitles(ids));
  const dispatch = useDispatch();
  const usedImageTitles = useSelector(
    getImageTitles(usedImages.map(({ imageId }) => imageId))
  ) as string[];

  const isImageInTour = useCallback(
    async (imgId: string, localUsedImages: UsedImages): Promise<any> => {
      try {
        const res = await axios.get<{ page: Tour[] }>(
          `https://api.wix.viar.live/api/v1/tour/self?sphereId=${imgId}`
        );
        if (res.data.page.length) {
          localUsedImages.push({
            tourTitles: res.data.page.map(({ title }) => title),
            imageId: imgId,
            tourId: res.data.page.map(({ id }) => id),
          });
        } else {
          dispatch(deleteImage(imgId));
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch(errorNotification(`Error: ${err.message as string}`));
        }
      }
    },
    [dispatch]
  );

  const handleDelete = useCallback(async () => {
    const localUsedImages: UsedImages = [];
    await Promise.all(
      ids.map((imgId) => isImageInTour(imgId, localUsedImages))
    );
    setUsedImages(localUsedImages);
    setSelected((selected) =>
      isSingle ? selected.filter((selectedId) => selectedId !== ids[0]) : []
    );
    setDeleteIds([]);
    handleClose();
  }, [handleClose, ids, isImageInTour, isSingle, setDeleteIds, setSelected]);

  return (
    <>
      {/*// @ts-ignore*/}
      <Modal
        isOpen={open}
        shouldCloseOnOverlayClick
        onRequestClose={handleClose}
      >
        {/*// @ts-ignore*/}
        <MessageModalLayout
          theme={"destructive"}
          onCloseButtonClick={handleClose}
          primaryButtonText="Delete"
          primaryButtonOnClick={handleDelete}
          secondaryButtonText="Cancel"
          secondaryButtonOnClick={handleClose}
          title="Delete Images"
        >
          <Text>{`Are you sure you want to delete following ${
            isSingle ? "image" : "images"
          }: `}</Text>
          {imageTitles.map(
            (title, ind) =>
              title && (
                <Text key={ids[ind]} weight="bold">
                  {`${title}${ind === imageTitles.length - 1 ? "." : ", "}`}
                </Text>
              )
          )}
        </MessageModalLayout>
      </Modal>
      {/*// @ts-ignore*/}
      <Modal
        isOpen={!!usedImages.length}
        shouldCloseOnOverlayClick
        onRequestClose={() => {
          setUsedImages([]);
        }}
      >
        {/*// @ts-ignore*/}
        <MessageModalLayout
          title="This Image Appears in One of Your Tours"
          primaryButtonText="OK"
          primaryButtonOnClick={() => setUsedImages([])}
          onCloseButtonClick={() => setUsedImages([])}
        >
          <Text>
            {`To delete this ${
              usedImages.length === 1 ? "image" : "images"
            }, first remove it from the tour it’s in`}
          </Text>
          {usedImages.map(({ imageId, tourTitles, tourId }, i) => (
            <>
              <Divider direction="horizontal" />
              <ModalContent key={imageId}>
                <img
                  src={`${CONFIG.storageUrl}/spheres/${imageId}/thumb.jpg`}
                  alt="thumb"
                />
                <div>
                  <h3>{usedImageTitles[i]}</h3>
                  {tourTitles.map((title, i) => (
                    <Text key={i} weight="bold">
                      <TextButton
                        onClick={() => {
                          setUsedImages([]);
                          dispatch(setViewerImageId(imageId));
                          dispatch(setViewerTourId(tourId[i]));
                        }}
                      >
                        {`${title}${i === tourTitles.length - 1 ? "" : ", "}`}
                      </TextButton>
                    </Text>
                  ))}
                </div>
              </ModalContent>
            </>
          ))}
        </MessageModalLayout>
      </Modal>
    </>
  );
};

export default ImageDeleteModal;
