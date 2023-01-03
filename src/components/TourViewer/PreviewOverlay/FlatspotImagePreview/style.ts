import styled from 'styled-components';

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  justify-content: center;
  align-items: center;
  
  & > img {
    max-width: 80vw;
    height: 60vh;
  }
`;

export const Content = styled.text`
  color: black;
  background: white;
  border-radius: 9px;
  text-align: center;
  padding: 15px;
  
  & > p {
    margin: 0;
  }
`;
