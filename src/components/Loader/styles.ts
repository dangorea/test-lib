import styled, { keyframes } from "styled-components";

export const SpinnerWrapper = styled.div`
  //border: solid 1px #c1e4fe;
  background: white;
  border-radius: 8px;
  max-width: 60vh;
  max-height: 100%;
  margin: 10px 0 10px 0;
`;

export const SpinnerContainer = styled.div`
  max-width: 100%;
  //height: 48.99vh;
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;
`;

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 4px solid #c1e4fe;
  border-right: 4px solid #c1e4fe;
  border-bottom: 4px solid #c1e4fe;
  border-left: 4px solid #2b81cb;
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: auto;
  margin-bottom: auto;
`;
