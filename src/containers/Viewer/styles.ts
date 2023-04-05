import styled from "styled-components";
import type { WidgetSettings } from "../../store/widget/types";

type Props = {
  isSideViewer?: boolean;
};

export const ViewerContainer = styled.div<Props>`
  width: ${({ isSideViewer }) => (isSideViewer ? "100%" : "100vw")};
  height: ${({ isSideViewer }) => (isSideViewer ? "100%" : "100vh")};
  position: ${({ isSideViewer }) => (isSideViewer ? "static" : "absolute")};
  top: 0;
  left: 0;
  //z-index: 500;
  ${({ showBorder, borderWidth, borderColor }: Partial<WidgetSettings>) =>
    showBorder &&
    `border: ${borderWidth || "0"}px solid ${
      borderColor?.color || "transparent"
    }`};
`;
