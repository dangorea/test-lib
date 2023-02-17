import styled, { css } from "styled-components";

import type { WidgetSettings } from "../../../../store/widget/types";

export const PreviewBottomBarWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 0;
  left: 0;
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  grid-template-areas:
    ". ImageTitleContainer ."
    "SliderContainer SliderContainer SliderContainer"
    ". TitlesContainer TourControls";
  align-items: center;
  z-index: 600;
  color: white;
  text-align: center;

  @media (max-width: 700px) {
    bottom: 6px;
    right: 2px;
  }

  @media (max-width: 500px) {
    grid-template-columns: 80px 1fr 80px;
  }
`;

export const SliderContainer = styled.div<{ show: boolean }>`
  grid-area: SliderContainer;
  width: 100%;
  max-height: ${({ show }) => (show ? "100px" : "0")};
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

export const TourTitleContainer = styled.div`
  grid-area: TitlesContainer;
  justify-self: center;
  align-self: end;

  overflow: hidden;
  inline-size: 100%;
`;

export const TourName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ showTitle, tfa }: Partial<WidgetSettings>) =>
    showTitle &&
    `
    color: ${tfa?.color || "#ffffff"};
    font-family: ${tfa?.family || ""};
    font-size: ${tfa?.size || 16}px;
    font-style: ${tfa?.style.italic ? "italic" : "normal"};
    font-weight: ${tfa?.style.bold ? "bold" : "normal"};
    text-decoration: ${tfa?.style.underline ? "underline" : "none"};

    @media (max-width: 500px) {
      font-size: ${(tfa?.size as number) * 0.9}px;
    }
  `};
`;

export const ImageTitleContainer = styled.div`
  grid-area: ImageTitleContainer;
  justify-self: center;
  align-self: end;

  overflow: hidden;
  inline-size: 100%;
`;

export const ImageTitle = styled.div`
  grid-area: ImageTitle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ spt, photoData }: Partial<WidgetSettings>) =>
    spt &&
    `
    color: ${photoData?.color || "#ffffff"};
    font-family: ${photoData?.family || ""};
    font-size: ${photoData?.size as number}px;
    font-style: ${photoData?.style.italic ? "italic" : "normal"};
    font-weight: ${photoData?.style.bold ? "bold" : "normal"};
    text-decoration: ${photoData?.style.underline ? "underline" : "none"};
    
    @media (max-width: 500px) {
      font-size: ${(photoData?.size as number) * 0.9}px;
    }
    `};
`;

export const TourControls = styled.div`
  grid-area: TourControls;
  justify-self: end;
  align-self: end;
  display: flex;
  /* height: 24px; */
  align-items: center;
  margin-top: 0.3em;
  z-index: 3000;

  & > div {
    cursor: pointer;
    margin-right: 10px;

    & > img {
      height: 24px;
    }

    &::before {
      content: "";
      position: relative;
      left: 50%;
      bottom: 50%;
      height: 0;
      width: 0;
    }

    &:hover {
      &::before {
        box-shadow: 0 0 30px 20px rgba(255, 255, 255, 0.5);
      }
    }

    @media (max-width: 700px) {
      & > img {
        height: 20px;
      }
    }

    @media (max-width: 500px) {
      & > img {
        height: 17px;
      }
    }
  }
`;

export const ImagePreview = styled.img<{ selected: boolean }>`
  margin-right: 10px;
  height: 80px;
  width: 120px;
  cursor: pointer;
  border: 2px transparent solid;
  box-sizing: border-box;
  ${({ selected }) =>
    selected &&
    css`
      border: 2px white solid;
    `}
`;
