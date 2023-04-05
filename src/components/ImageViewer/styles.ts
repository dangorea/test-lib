import styled from "styled-components";

export const PreviewContainer = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  border-radius: 8px;
  background-color: #eaf7ff;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.2s linear;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  z-index: 1;
`;

export const AddBtn = styled.button`
  //display: block;
  height: 100%;
  padding: 12px;
  border: 0;
  transition: background 0.2s linear;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  background-color: #eaf7ff;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  outline: 0;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: #3899ec;
`;

export const AddIconContainer = styled.div`
  align-items: center;
  border: dashed 1px #4eb7f5;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const SVGContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;

  & > svg > path {
    fill: #3899ec;
  }
`;

export const ImagePreviewWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImgPreview = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
`;

export const UpdateCover = styled.div`
  display: flex;
  transition: all 0.1s linear;
  border-radius: 8px;
  background-color: rgba(22, 45, 61, 0.66);
  position: absolute;
  //top: 0;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  cursor: auto;
`;

export const UpdateBtnContainer = styled.div`
  display: flex;
  color: #fff;
  justify-content: center;
  margin: auto;
  align-items: baseline;
  transition: opacity 0.1s linear;
`;

export const UpdateBtn = styled.button`
  border: solid 1px #fff;
  background: 0 0;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;

  &:hover {
    background-color: #eaf7ff;
    color: #3899ec;
    border-color: #eaf7ff;

    & > * {
      & > svg {
        width: 20px;
        height: 20px;

        & > path {
          fill: #3899ec;
        }
      }
    }
  }
`;

export const UpdateIconContainer = styled.span`
  line-height: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 20px;
    height: 20px;

    & > path {
      fill: #fff;
    }
  }
`;
