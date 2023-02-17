import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  padding: 1em 0;
  align-items: flex-start;

  div {
    margin-left: 1em;
    flex-grow: 1;
  }

  h3 {
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
  }

  img {
    width: 100%;
    max-width: 80px;
  }
`;
