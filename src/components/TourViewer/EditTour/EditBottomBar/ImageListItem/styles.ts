import styled, { css } from 'styled-components';

export const ImageWrapper = styled.div<{
  active: boolean;
  preview: string;
  isDragging: boolean;
}>`
  display: inline-block;
  width: 120px;
  height: 75px;
  overflow: hidden;
  background-color: #000;
  cursor: pointer;
  position: relative;
  margin: 0 5px;
  border: 2px solid #666;
  border-radius: 12px;
  background-image: url('${({ preview }) => preview}');
  background-size: cover;
  visibility: ${({ isDragging }) => (isDragging ? 'hidden' : 'visible')};
  ${({ active }) =>
    active &&
    css`
      border: 2px white solid;
    `}

  &:hover > * {
    opacity: 1;
  }
`;

export const ImageTitle = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 11px;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: opacity 0.2s ease-in-out;
  text-align: center;
`;

export const UnlinkBtn = styled.div`
  opacity: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #a41e22;
  color: #fff;
  font-size: 14px;
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all ease-in-out;

  & > svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    box-shadow: 0 0 5px 3px rgba(255, 255, 255, 0.4);
  }
`;

export const MoveIcon = styled.div`
  width: 20px;
  height: 20px;
  opacity: 0;
  border-radius: 50%;
  position: absolute;
  left: 5px;
  top: 5px;
  transition: 0.2s opacity ease-in-out;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 14px;
    height: 14px;
  }
`;
