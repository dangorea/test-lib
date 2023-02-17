import styled from "styled-components";

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
