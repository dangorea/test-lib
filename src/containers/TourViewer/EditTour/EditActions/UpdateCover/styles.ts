import styled from 'styled-components';

export const SvgIconHover = styled.div`
  & #cover-icon {
    fill: black;
  }

  &:hover {
    & #cover-icon {
      fill: white;
    }
  }
`;
