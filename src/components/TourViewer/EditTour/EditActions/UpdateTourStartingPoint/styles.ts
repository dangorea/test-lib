import styled from 'styled-components';

export const SvgIconHover = styled.div`
  & #tour-start-point-icon {
    fill: black;
  }

  &:hover {
    & #tour-start-point-icon {
      fill: white;
    }
  }
`;
