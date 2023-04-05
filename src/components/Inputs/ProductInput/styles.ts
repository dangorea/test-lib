import styled from "styled-components";

export const DropDown = styled.div<{ open: boolean }>`
  outline: 0;
  border: 0;
  width: 100%;
  display: ${({ open }) => (open ? "grid" : "none")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  grid-template-columns: repeat(1, 1fr);
  justify-content: center;
  flex-direction: column;
  color: #000;
  box-shadow: -73.8244px 67.4534px 80px rgba(0, 0, 0, 0.07),
    -47.8491px 43.7198px 46.8519px rgba(0, 0, 0, 0.0531481),
    -28.4361px 25.9821px 25.4815px rgba(0, 0, 0, 0.0425185),
    -14.7649px 13.4907px 13px rgba(0, 0, 0, 0.035),
    -6.01532px 5.4962px 6.51852px rgba(0, 0, 0, 0.0274815),
    -1.36712px 1.24914px 3.14815px rgba(0, 0, 0, 0.0168519);
  overflow: auto;
  max-height: 235px;
  background: #fff;
  padding: 0;

  &::-webkit-scrollbar {
    width: 1em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c1e4fe;
    background-clip: content-box;
    border-radius: calc(5px * 2);
    border: 5px solid transparent;
    height: 72px;
  }
`;

export const DropDownItem = styled.div`
  min-height: 36px;
  padding-left: 18px;
  padding-right: 24px;
`;

export const ItemText = styled.div`
  display: flex;
  margin: 6px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #162d3d;
`;
