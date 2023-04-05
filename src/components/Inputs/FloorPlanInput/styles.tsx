import styled from "styled-components";

export const BtnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const UploadBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 133px;
  height: 40px;
  padding: 10px 24px;
  gap: 10px;
  background: transparent;
  position: relative;
  border: 1px solid #ffffff;
  border-radius: 60px;
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid #aaa;
    color: #aaa;
    transition: all 0.2s ease-in-out;

    path {
      transition: all 0.2s ease-in-out;
      fill: #aaa;
    }
  }
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
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover {
    box-shadow: 0px 4px 40px -10px rgba(0, 129, 255, 0.4);
    border: 1px solid #3899ec;
    background: #3899ec;
    transition: all 0.2s ease-in-out;
    outline: none;
  }

  &:active {
    background: #007aff;
    border: 1px solid #007aff;
    transition: all 0.2s ease-in-out;
    outline: none;
  }
`;

export const FileInput = styled.input`
  display: none;
`;
