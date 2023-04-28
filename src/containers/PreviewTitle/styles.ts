import styled from "styled-components";

export const TitleText = styled.div<{ color: string }>`
  width: calc(100% - 20px);
  vertical-align: top;
  display: inline-block;
  position: relative;
  padding-right: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ color }) => color};
  font-size: 14px;
  font-weight: bold;
`;

export const TitleEditBtn = styled.button`
  flex-shrink: 0;
  margin-left: 3px;
`;

export const TitleViewWrapper = styled.div`
  cursor: pointer;
`;
