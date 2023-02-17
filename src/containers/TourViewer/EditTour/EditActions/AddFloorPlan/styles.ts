import styled from 'styled-components';

export const SvgIconHover = styled.div`
  & #hotspot-icon {
    fill: black;
  }

  &:hover {
    & #hotspot-icon {
      fill: white;
    }
  }
`;

export const BottomBtnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
`;

export const UploadBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 10px;
  background: transparent;

  position: relative;

  border: 1px solid #ffffff;
  border-radius: 60px;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #fff;
`;

export const SaveBtn = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 6px;
  width: 111px;
  height: 42px;
  background: #0071e0;
  border: 1px solid #0071e0;
  border-radius: 60px;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #ffffff;

  &:hover {
    box-shadow: 0px 4px 40px -10px rgba(0, 129, 255, 0.4);
    border: 1px solid #3899ec;
    background: #3899ec;
    transition: 0.3s;
  }
  &:active {
    background: #007aff;
    border: 1px solid #007aff;
    transition: 0.3s;
  }
`;
