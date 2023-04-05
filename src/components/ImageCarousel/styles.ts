import styled from "styled-components";

export const FloorPlansContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 145px;
  width: 359px;
`;

export const ImageListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100px;
  height: 100%;
  overflow: hidden;
  position: relative;

  &.active {
    border: 3px solid #0071e0;
    box-shadow: 0px 4px 40px -12px rgba(0, 129, 255, 0.4);
    border-radius: 19px;
    position: static;
  }

  & > img {
    border-radius: 12px;
    width: 100%;
    max-height: 128px;
  }
`;

export const IconDeleteElement = styled.div`
  display: flex;
  position: absolute;
  align-content: flex-start;
  align-self: flex-start;
  align-items: flex-start;
`;

export const UnlinkBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #a41e22;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all ease-in-out;

  &:hover {
    box-shadow: 0 0 5px 3px rgba(255, 255, 255, 0.4);
  }
`;

export const SliderContainer = styled.div<{ show: boolean }>`
  grid-area: SliderContainer;
  width: 100%;
  max-height: ${({ show }) => (show ? "150px" : "0")};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition: opacity 0.3s ease-in-out, max-height 0.3s linear,
    width 10s ease-in;

  & .swiper-container {
    cursor: ${({ show }) => (show ? "pointer" : "default")};
  }

  & .swiper-wrapper {
    display: flex;
    justify-content: flex-start;
    pointer-events: ${({ show }) => (show ? "auto" : "none")};
    cursor: ${({ show }) => (show ? "pointer" : "default")};
  }
`;
