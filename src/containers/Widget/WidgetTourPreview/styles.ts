import styled from "styled-components";
// import { TextButton } from 'wix-style-react';

import { CONFIG } from "../../../utils/config";

import type { WidgetSettings } from "../../../store/widget/types";

type Props = {
  tourId: string;
  borderStyle: Partial<WidgetSettings>;
  coverUrl: string;
};

export const WidgetPreviewOverlay = styled.div<Props>`
  background: ${({ tourId, coverUrl }) =>
      coverUrl
        ? `url(${CONFIG.storageUrl}/${coverUrl})`
        : `url(${CONFIG.storageUrl}/tours/${tourId}/cover.jpg?v=0)`}
    no-repeat center center fixed;
  background-size: cover;

  width: 100%;
  height: 100%;
  z-index: 500;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  ${({ borderStyle }) => {
    const { showBorder, borderWidth, borderColor } = borderStyle;

    return (
      showBorder &&
      `border: ${borderWidth || "0"}px solid ${
        borderColor?.color || "transparent"
      }`
    );
  }};

  & > button {
    flex-grow: 1;
  }

  & > img svg {
    height: 70px;
  }
`;

export const SpaceBlock = styled.div`
  height: 25px;
  width: 25px;
`;

export const WixTextButton = styled.div`
  & > span img {
    width: 150px;
  }

  @media (max-width: 700px) {
    & > span img {
      width: 90px;
    }
  }
`;

export const TitleContainer = styled.div`
  padding: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
  inline-size: 100%;
`;
