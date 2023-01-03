import styled from 'styled-components';

export const CurrentIconWrapper = styled.div`
  display: flex;
  width: 70px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const CurrentIcon = styled.img`
  width: 50px;
  height: 50px;
`;

export const IconsSelectGrid = styled.div`
  max-height: 200px;
  overflow: auto;
  background-color: #000;
  width: 500px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
`;

export const IconDeleteElement = styled.div`
  position: absolute;
  z-index: 1;
  width: 20px;
  height: 20px;
  opacity: 1;
  display: flex;
  justify-content: center;
  left: 30px;
  top: 0;
`;

export const UnlinkBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #a41e22;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all ease-in-out;

  &:hover {
    box-shadow: 0 0 5px 3px rgba(255, 255, 255, 0.4);
  }
`;

export const IconItem = styled.img<{ selected: boolean }>`
  height: 50px;
  width: 50px;
  cursor: pointer;
  position: relative;

  background-color: ${({ selected }) => (selected ? '#0081ff' : 'none')};
`;

export const ModalWrapper = styled.div`
  background: white;
  border-radius: 25px;
  width: 500px;
  height: 250px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-80%, -20%);
`;
