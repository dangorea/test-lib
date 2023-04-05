import React from "react";
import {
  AlignmentLayer,
  ModalPreviewWrapper,
  PreviewModalOverlay,
  TransitionLayer,
} from "./styles";

const ModalPreview = () => {
  return (
    <ModalPreviewWrapper>
      <TransitionLayer>
        <AlignmentLayer>
          <PreviewModalOverlay></PreviewModalOverlay>
        </AlignmentLayer>
      </TransitionLayer>
    </ModalPreviewWrapper>
  );
};

export default ModalPreview;
