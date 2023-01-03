import styled from 'styled-components';

export const DraggableActionBtnWrapper = styled.div<{ isDragging: boolean }>`
  cursor: move;
  display: flex;
  visibility: ${({ isDragging }) => (isDragging ? 'hidden' : 'visible')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 21px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  z-index: 600;
  padding: 8px 4px;
  background: #fff;
  overflow: hidden;
  transition: opacity 0.2s linear, background 0.2s linear;
  user-select: none;

  & > img,
  & > svg {
    color: black;
  }

  & > img:first-child {
    margin-bottom: 5px;
  }

  &:hover {
    background-color: rgb(78, 183, 245);

    & > img,
    & > svg {
      color: white;
    }
  }
`;
