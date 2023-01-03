import styled from "styled-components";
import { Drawer } from "../ProductspotIframeDrawer/styles";

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
