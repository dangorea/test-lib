import styled from "styled-components";

export const ModalPreviewWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  cursor: default;
  background: rgba(22, 45, 61, 0.66);
  //transition: background 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  transition: all 0.2s ease-in-out;
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
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
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

export const TopBar = styled.div`
  position: sticky;
  background: #162d3d;
  height: 66px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  color: #fff;
  padding: 18px 24px;
`;

export const TopBarLabel = styled.div`
  width: 20%;
  max-width: 20%;
`;

export const TopBarCloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 9px;
  border-radius: 50%;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;

  &:hover {
    border-color: transparent;
    background-color: rgba(50, 83, 106, 0.54);
    color: #fff;
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const ChildrenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  height: calc(100vh - 66px);
  overflow-y: auto;
  padding: 24px 24px 0 24px;
`;
