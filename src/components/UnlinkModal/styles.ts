import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  inset: 0px;
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  background: rgba(22, 45, 61, 0.66);
  transition: background 0.2s cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
`;

export const Modal = styled.div`
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

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Popup = styled.div`
  background-color: #fff;
  position: relative;
  max-height: calc(100vh - (48px * 2));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: var(
    --wsr-shadow40,
    0 8px 8px 0 rgba(22, 45, 61, 0.12),
    0 3px 24px 0 rgba(22, 45, 61, 0.18)
  );
  width: 510px;
  min-width: 510px;
`;

export const HeadingWrapper = styled.div`
  display: flex;
  overflow-y: auto;
`;

export const HeadingContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const LabelContainer = styled.div`
  padding: 24px 42px 18px 30px;
  font-weight: 500;
  font-size: 23px;
  line-height: 32px;
  width: 100%;
  color: #162d3d;
  margin: 0;
`;

export const ErrorMessageWrapper = styled.div`
  height: inherit;
  width: inherit;
  overflow-y: auto;
  padding-bottom: 6px;
  padding-right: 30px;
  padding-left: 30px;
`;

export const ErrorMessageContainer = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #162d3d;
  white-space: pre-line;

  & > span {
    font-weight: bold;
  }
`;

export const Divider = styled.hr`
  opacity: 0;
  transition: opacity 100ms linear;
  background-color: var(--wsr-divider-color, #dfe5eb);
  min-height: 1px;
  width: 100%;
  margin: 0;
`;

export const BottomBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
`;

export const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  flex-shrink: 0;
`;

export const CancelBtn = styled.button`
  margin-right: 12px;
  border: solid 1px #ee5951;
  background: 0 0;
  color: #ee5951;

  height: 30px;
  min-width: 72px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  border-radius: 15px;
  padding: 0 17px;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;

  &:hover {
    background-color: #f66;
    border-color: #f66;
    color: #fff;
  }
`;

export const UnlinkBtn = styled.button`
  height: 30px;
  min-width: 72px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  border-radius: 15px;
  padding: 0 17px;
  background-color: #ee5951;
  border: solid 1px #ee5951;
  color: #fff;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;

  &:hover {
    background-color: #f66;
    border-color: #f66;
    color: #fff;
  }
`;
