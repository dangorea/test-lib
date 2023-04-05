import styled from "styled-components";
import { Drawer } from "../styles";

export const ContentDrawer = styled(Drawer)`
  z-index: 3004;
  cursor: auto;

  //& .wix-sidepanel-header > div h4 {
  //  font-size: 1rem;
  //  font-weight: bold;
  //
  //  overflow: hidden;
  //  text-overflow: ellipsis;
  //}
  //
  //@media (max-width: 800px) {
  //  & .wix-sidepanel-header > div,
  //  & .wix-sidepanel-content {
  //    padding: 1em;
  //    width: 100%;
  //  }
  //
  //  & .wix-sidepanel-header button {
  //    transform: scale(0.8);
  //  }
  //
  //  & .wix-sidepanel-content > div p {
  //    margin: 0;
  //    word-wrap: break-word;
  //  }
  //}
  //
  //@media (max-width: 500px) {
  //  & .wix-sidepanel-header > div {
  //    max-height: 50px;
  //  }
  //}
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  line-height: 24px;
  color: #162d3d;
`;

export const CloseBtn = styled.span`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  border: 0;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  background-color: transparent;
  margin-left: 12px;

  svg {
    width: 14px;
    height: 14px;
  }

  path {
    fill: #3899ec;
  }

  &:hover {
    path {
      fill: #4eb7f5;
    }
  }
`;

export const RichTextPreview = styled.div`
  overflow: auto;
  height: 100%;
  flex: 1;
  padding: 24px;
`;
