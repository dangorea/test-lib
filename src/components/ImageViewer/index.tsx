import React, { useState } from "react";
import {
  AddBtn,
  AddIconContainer,
  ImagePreviewWrapper,
  ImgPreview,
  PreviewContainer,
  SVGContainer,
  UpdateBtn,
  UpdateBtnContainer,
  UpdateCover,
  UpdateIconContainer,
} from "./styles";
import AddIcon from "../../assets/icons/addIcon";
import UpdateIcon from "../../assets/icons/updateIcon";

type Props = {
  height: number;
  width: number;
  imageUrl: string;
  error: boolean;
  onUpdateImage: (e: { preventDefault: () => void }) => void;
};

const ImageViewer = ({
  height,
  width,
  imageUrl,
  onUpdateImage,
  error,
}: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <PreviewContainer error={error}>
      {!imageUrl ? (
        <AddBtn onClick={onUpdateImage}>
          <AddIconContainer>
            <SVGContainer>
              <AddIcon />
            </SVGContainer>
          </AddIconContainer>
        </AddBtn>
      ) : (
        <ImagePreviewWrapper
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <ImgPreview height={height} width={width} src={imageUrl} />
          {isHover && (
            <UpdateCover>
              <UpdateBtnContainer>
                <UpdateBtn onClick={onUpdateImage}>
                  <UpdateIconContainer>
                    <UpdateIcon />
                  </UpdateIconContainer>
                </UpdateBtn>
              </UpdateBtnContainer>
            </UpdateCover>
          )}
        </ImagePreviewWrapper>
      )}
    </PreviewContainer>
  );
};

export default ImageViewer;
