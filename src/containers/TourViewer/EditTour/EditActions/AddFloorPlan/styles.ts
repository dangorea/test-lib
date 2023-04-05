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

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
