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
import Tooltip from "../Tooltip";

type Props = {
  height: number;
  width: number;
  imageUrl: string;
  onUpdateImage: (e: { preventDefault: () => void }) => void;
  // onAddImage?: () => void;
};

const ImageViewer = ({ height, width, imageUrl, onUpdateImage }: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <PreviewContainer>
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
