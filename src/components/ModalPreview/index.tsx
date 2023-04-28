import React, { FC, ReactElement } from "react";
import {
  AlignmentLayer,
  ChildrenWrapper,
  ModalPreviewWrapper,
  PreviewModalOverlay,
  TopBar,
  TopBarCloseWrapper,
  TopBarLabel,
  TransitionLayer,
} from "./styles";
import Dismiss from "images/dismiss";

type Props = {
  label: string;
  onClose: () => void;
  children: ReactElement[] | string;
};

const ModalPreview: FC<Props> = ({ label, children, onClose }) => {
  return (
    <ModalPreviewWrapper>
      <TransitionLayer>
        <AlignmentLayer>
          <PreviewModalOverlay>
            <TopBar>
              <TopBarLabel>{label}</TopBarLabel>
              <TopBarCloseWrapper onClick={onClose}>
                <Dismiss />
              </TopBarCloseWrapper>
            </TopBar>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </PreviewModalOverlay>
        </AlignmentLayer>
      </TransitionLayer>
    </ModalPreviewWrapper>
  );
};

export default ModalPreview;
