import styled from 'styled-components';

export const ImageViewerBottomBarWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 0;
  left: 0;
  padding: 5px;
  display: flex;
  z-index: 600;
  color: white;
`;

export const ImageViewerControls = styled.div`
  position: fixed;
  right: 5px;
  bottom: 10px;
  display: flex;
  height: 24px;

  & > div {
    cursor: pointer;
    margin-right: 10px;

    & > img {
      height: 24px;
    }

    &::before {
      content: '';
      position: relative;
      left: 50%;
      bottom: 50%;
      display: inline-block;
      height: 0;
      width: 0;
    }

    &:hover {
      &::before {
        box-shadow: 0 0 30px 20px rgba(255, 255, 255, 0.5);
      }
    }
  }
`;
