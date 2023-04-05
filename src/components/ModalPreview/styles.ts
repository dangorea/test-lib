import styled from "styled-components";

export const ModalPreviewWrapper = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  background: rgba(22, 45, 61, 0.66);
  transition: background 0.2s cubic-bezier(0.23, 1, 0.32, 1);
`;

export const TransitionLayer = styled.div`
  border: none;
  overflow: initial;
  height: 100%;
  width: 100%;
  outline: none;
  border-radius: 0px;
  padding: 0px;
  background-color: transparent;
  margin-bottom: 0px;
  position: relative;
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1),
    transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
`;

export const AlignmentLayer = styled.div`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const PreviewModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
`;
