import React, { FC } from 'react';
import { Indicator, Input, Label, LabelText } from './styles';

type Props = {
  onChange: () => void;
  id: string;
  label: string;
  checked: boolean;
};

const CheckboxBtn: FC<Props> = ({ onChange, id, label, checked }) => {
  return (
    <Label htmlFor={id}>
      <LabelText>{label}</LabelText>
      <Input
        id={id}
        type="checkbox"
        role="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <Indicator />
    </Label>
  );
};

export default CheckboxBtn;
