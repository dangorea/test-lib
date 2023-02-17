import React, { FC, useCallback, useMemo, useState } from "react";
// import { Checkbox, LinearProgressBar, Loader } from "wix-style-react";
import {
  Select,
  DeleteBtn,
  ImageTitle,
  LoaderWrapper,
  ProgressBarWrapper,
} from "./styles";
import type { Image360 } from "../../../../store/types";
import { getPreviewSrc } from "../../../../utils/image";
import { updateImage } from "../../../../store/images/actions";
import { useDispatch, useSelector } from "react-redux";
import PreviewItem from "../../../PreviewItem";
import { getUploadProgress } from "../../../../store/images/selector";
import { setViewerImageId } from "../../../../store/viewer/actions";

type Props = {
  img: Image360;
  isSelected: boolean;
  toggleSelect: (id: string) => void;
  handleDelete: (id: string) => void;
};

const ImageItem: FC<Props> = ({
  img,
  isSelected,
  toggleSelect,
  handleDelete,
}) => {
  const { name, title, id } = img;
  const [isHovered, setIsHovered] = useState(false);
  const uploadProgress = useSelector(getUploadProgress(id));
  const imgTitle = useMemo(() => title || name, [name, title]);
  const dispatch = useDispatch();

  const changeTitle = useCallback(
    (newTitle: string) => {
      if (newTitle === imgTitle) {
        return;
      }

      dispatch(updateImage(id, { title: newTitle }));
    },
    [dispatch, id, imgTitle]
  );

  const viewImage = useCallback(() => {
    dispatch(setViewerImageId(id));
  }, [dispatch, id]);

  const onDelete = useCallback(
    (e: any) => {
      e.stopPropagation();
      handleDelete(id);
    },
    [handleDelete, id]
  );

  const previewSrc = getPreviewSrc(img);

  return (
    <PreviewItem
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={viewImage}
      isSelected={isSelected}
      src={previewSrc}
      isLoading={!previewSrc}
    >
      {previewSrc ? (
        <>
          {/*TODO fix here*/}
          <Select onClick={(e) => e.stopPropagation()}>
            {/*<Checkbox*/}
            {/*  onChange={() => {*/}
            {/*    toggleSelect(id);*/}
            {/*  }}*/}
            {/*  checked={isSelected}*/}
            {/*/>*/}
          </Select>
          <ImageTitle
            changeTitle={changeTitle}
            title={imgTitle}
            color="white"
          />
          {isHovered && <DeleteBtn onClick={onDelete} />}
        </>
      ) : (
        <>
          <LoaderWrapper>{/*<Loader />*/}</LoaderWrapper>
          <ProgressBarWrapper>
            {/*<LinearProgressBar value={uploadProgress} />*/}
          </ProgressBarWrapper>
          <DeleteBtn onClick={onDelete} dark />
        </>
      )}
    </PreviewItem>
  );
};

export default ImageItem;
