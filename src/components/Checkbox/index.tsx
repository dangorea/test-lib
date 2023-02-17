import React from "react";
import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox,
} from "./styles";

type Props = {
  checked: boolean;
  className?: string;
  props?: any;
};

const Checkbox = ({ className, checked, ...props }: Props) => {
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} onChange={() => checked} {...props} />
      <StyledCheckbox checked={checked} onChange={() => checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

export default Checkbox;
