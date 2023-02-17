import styled, { css } from "styled-components";
import launch from "../../assets/icons/launch.png";

export const Container = styled.div<{
  isLoading?: boolean;
  isSelected?: boolean;
  withoutLaunchIcon?: boolean;
}>`
  height: 145px;
  position: relative;
  cursor: pointer;
  outline: ${({ isSelected }) => isSelected && "2px solid #0081ff"};
  background-color: white;
  user-select: none;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: ${({ isLoading, withoutLaunchIcon }) =>
      !isLoading && !withoutLaunchIcon && css`url(${launch})`};
    width: 52px;
    height: 52px;
    background-size: 52px 52px;
    opacity: 0;
    transition: 0.2s opacity;
  }
  &:hover {
    &::before {
      opacity: 1;
      z-index: 1;
    }
    & > img {
      filter: brightness(60%);
    }
  }
`;

export const Preview = styled.img<{ isLoading?: boolean }>`
  height: ${({ isLoading }) => !isLoading && "100%"};
  width: 100%;
  transition: 0.2s filter;
  user-select: none;
`;
