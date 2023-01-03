import styled from 'styled-components';
import { Heading } from 'wix-style-react';

export const SidebarWrapper = styled.div<{
  open: boolean;
}>`
  width: 740px;
  max-width: 100%;
  height: 525px;
  display: table;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 50%;
  bottom: 0;
  border: 1px solid;
  ${({ open }) =>
    open
      ? 'transform: translateY(-50%); transition: opacity 300ms ease-in;'
      : 'display: none; scale(0);'};
  opacity: ${({ open }) => (open ? 1 : 0)};
  z-index: 3004;
  padding: 12px 24px;
  background: rgba(21, 21, 31, 0.9);
  box-shadow: -73.8244px 67.4534px 80px rgba(0, 0, 0, 0.07),
    -47.8491px 43.7198px 46.8519px rgba(0, 0, 0, 0.0531481),
    -28.4361px 25.9821px 25.4815px rgba(0, 0, 0, 0.0425185),
    -14.7649px 13.4907px 13px rgba(0, 0, 0, 0.035),
    -6.01532px 5.4962px 6.51852px rgba(0, 0, 0, 0.0274815),
    -1.36712px 1.24914px 3.14815px rgba(0, 0, 0, 0.0168519);
  border-radius: 12px;
  user-select: none;
`;

export const CloseBtn = styled.div`
  position: absolute;
  right: 35px;
  top: 35px;
  cursor: pointer;
  color: gray;
  width: 30px;
  height: 30px;
  transition: all 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: white;
    border-color: white;
  }

  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export const SidebarTitle = styled(Heading)`
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 300px;
  line-height: 52px;
  text-align: center;
  letter-spacing: -0.03em;
  transform: translate(191%, 50%);
`;

export const ActionsSidebarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  gap: 30px;
  padding: 0 0 0 15px;
  height: 100%;
  width: 100%;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 286px;
  max-height: 436.62px;
  max-width: 260px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  user-select: none;

  & > img {
    border-radius: 20px;
    object-fit: contain;
    max-width: 100%;
    user-select: none;
  }
`;

export const ImagePreviewContainer = styled.div<{ isWidget: boolean }>`
  position: relative;
  display: flex;
  align-self: flex-end;
  justify-self: flex-end;
  top: ${({ isWidget }) => (isWidget ? '-44px' : '-45px')};
  left: -45px;
`;

export const ZoomImageBtn = styled.div`
  background: #201b1d;
  border-radius: 11px 0px;
  width: 44px;
  height: 44px;
  position: absolute;
  top: 1px;
  left: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageInfo = styled.div`
  width: 100%;
  position: absolute;
  place-content: center;
  place-items: center;
  display: flex;
  flex-direction: column;
`;

export const EmptyMessage = styled.div`
  width: 200px;
  word-wrap: break-word;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  padding: 37px 0 0 0;
`;
