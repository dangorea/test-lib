import styled from 'styled-components';

const translateStyles: any = {
  entering: 95,
  entered: 0,
  exiting: 0,
  exited: 225,
};

const fade: any = {
  entering: 1,
  entered: 1,
  exiting: 0.3,
  exited: 0.1,
};

export const EditBottomBarWrapper = styled.div<{ state: any }>`
  position: absolute;
  z-index: 600;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 95px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 5px;
  transition: transform 0.2s linear, opacity 0.3s ease-out;
  transform: translateY(${({ state }) => translateStyles[state] as string}px);
  opacity: ${({ state }) => fade[state] as string};
`;

export const AddImage = styled.div`
  border: 2px solid white;
  height: 75px;
  border-radius: 12px;
  width: 100px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowBtn = styled.div`
  border: 2px solid white;
  height: 75px;
  border-radius: 10px;
  width: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-left: 16px;
  margin-right: 16px;
`;
