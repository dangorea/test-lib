import React, { FC, useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Dismiss } from "wix-ui-icons-common";

import type { Image360, Tour } from "../../../../../store/types";
import { getCurrentTour } from "../../../../../store/tours/selectors";
import { getImage } from "../../../../../store/images/selector";

import { ImageTitle, ImageWrapper, MoveIcon, UnlinkBtn } from "./styles";
import { getThumbSrc } from "../../../../../utils/image";
import ImageTitleInput from "./ImageTitleInput";
import move from "../../../../../assets/icons/move.svg";

export const ADD_IMAGE_HOTSPOT = "ADD_IMAGE_HOTSPOT";

type Props = {
  image: Image360;
  setUnlinkId: (id: string) => void;
  changeImage: (id: string) => void;
  active: boolean;
};

const ImageListItem: FC<Props> = ({
  image,
  setUnlinkId,
  changeImage,
  active,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const img = useSelector(getImage(image.id)) as Image360;
  const tour = useSelector(getCurrentTour()) as Tour;
  const currentTitle = img.title || img.name;
  const isLastSphere = tour.spheres.length < 2;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ADD_IMAGE_HOTSPOT,
    item: { target: image.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <ImageWrapper
      active={active}
      preview={getThumbSrc(img)}
      isDragging={isDragging}
      onClick={() => changeImage(image.id)}
      ref={drag}
    >
      {!isLastSphere && (
        <MoveIcon>
          <img src={move} alt="move" />
        </MoveIcon>
      )}
      {!isLastSphere && (
        <UnlinkBtn
          onClick={(e) => {
            e.stopPropagation();
            setUnlinkId(image.id);
          }}
        >
          <Dismiss />
        </UnlinkBtn>
      )}
      {isEditingTitle ? (
        <ImageTitleInput
          currentTitle={currentTitle}
          imageId={image.id}
          setIsEditingTitle={setIsEditingTitle}
        />
      ) : (
        <ImageTitle
          onClick={(e) => {
            e.stopPropagation();
            setIsEditingTitle(true);
          }}
        >
          {currentTitle}
        </ImageTitle>
      )}
    </ImageWrapper>
  );
};

export default ImageListItem;
