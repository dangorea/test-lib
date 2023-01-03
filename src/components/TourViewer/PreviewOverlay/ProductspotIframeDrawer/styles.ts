import styled, { keyframes } from "styled-components";

export const Drawer = styled.div<{ open: boolean; width: number }>`
  position: fixed;
  top: 0;
  right: ${({ open, width }) => (open ? 0 : -width)}px;
  height: 100%;
  box-shadow: 0 3px 24px 0 rgba(22, 45, 61, 0.18),
    0 8px 8px 0 rgba(22, 45, 61, 0.12);
  z-index: 3004;
  transition: right 0.4s ease 0s;
  width: ${({ width }) => width}px;

  @media (max-width: 700px) {
    right: ${({ open, width }) => (open ? 0 : -width) * 0.3};
    visibility: ${({ open }) => (!open ? "hidden" : "visible")};
    opacity: ${({ open }) => (!open ? "0" : "1")};
    transition: right 0.4s ease 0s, visibility 0.3s linear, opacity 0.3s linear;
    width: 100%;
  }
`;

export const ContentDrawer = styled(Drawer)`
  z-index: 3004;
  cursor: auto;

  & .wix-sidepanel-header > div h4 {
    font-size: 1rem;
    font-weight: bold;

    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 800px) {
    & .wix-sidepanel-header > div,
    & .wix-sidepanel-content {
      padding: 1em;
      width: 100%;
    }

    & .wix-sidepanel-header button {
      transform: scale(0.8);
    }

    & .wix-sidepanel-content > div p {
      margin: 0;
      word-wrap: break-word;
    }
  }

  @media (max-width: 500px) {
    & .wix-sidepanel-header > div {
      max-height: 50px;
    }
  }
`;

export const IframeBlock = styled.div`
  margin-top: -18px;
  width: 99%;
  height: 93vh;
`;

export const SpinnerBlock = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: auto;
  margin-bottom: auto;
`;
