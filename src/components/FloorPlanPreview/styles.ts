import styled from "styled-components";

export const ImageWrapper = styled.div`
  position: relative;
  width: 286px;
  max-height: 436.62px;
  max-width: 270px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  user-select: none;

  & > img {
    border-radius: 20px;
    object-fit: contain;
    max-width: 100%;
    user-select: none;
  }
`;

export const ImagePreviewContainer = styled.div<{ isWidget: boolean }>`
  position: relative;
  display: flex;
  align-self: flex-end;
  justify-self: flex-end;
  top: ${({ isWidget }) => (isWidget ? "-44px" : "-45px")};
  left: -45px;
`;

export const ZoomImageBtn = styled.div`
  background: #201b1d;
  border-radius: 11px 0px;
  width: 44px;
  height: 44px;
  position: absolute;
  top: 2px;
  left: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageInfo = styled.div`
  width: 100%;
  position: absolute;
  place-content: center;
  place-items: center;
  display: flex;
  flex-direction: column;
`;

export const EmptyMessage = styled.div`
  width: 200px;
  word-wrap: break-word;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  padding: 37px 0 0 0;
`;
