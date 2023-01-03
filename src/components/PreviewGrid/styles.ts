import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 15px;

  @media (max-width: 1240px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1050px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
