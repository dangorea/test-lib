import React, { FC, useRef } from "react";
import { useField } from "formik";
import {
  Input,
  InputContainer,
  InputPadding,
  InputWrapper,
  Picker,
  Popover,
  Swatch,
  TagContainer,
  FormFieldWrapper,
  Label,
} from "./styles";
import useOutsideAction from "../../../utils/hooks/useOutsideAction";
import ColorPicker from "./ColorPicker";
import useOpen from "../../../utils/hooks/useOpen";

type Props = {
  label: string;
  name: string;
  required?: boolean;
};

const FormColorInput: FC<Props> = ({ label, name, required = false }) => {
  const [field, _, helpers] = useField(name);
  const popover = useRef(null);
  const { open, handleOpen, handleClose } = useOpen();
  useOutsideAction(popover, handleClose);

  return (
    <FormFieldWrapper>
      <Label id={name}>
        <span>{label}</span>
      </Label>
      <Picker>
        <InputWrapper>
          <InputContainer onClick={handleOpen}>
            <InputPadding>
              <TagContainer>#</TagContainer>
              <Input
                value={field.value.replace("#", "").toUpperCase()}
                onChange={(e) => helpers.setValue(`#${e.target.value}`)}
                required={required}
              />
              <Swatch style={{ backgroundColor: field.value }} />
            </InputPadding>
          </InputContainer>
        </InputWrapper>
        <Popover ref={popover}>
          <ColorPicker
            open={open}
            field={field.value}
            helpers={helpers.setValue}
            handleClose={handleClose}
          />
        </Popover>
      </Picker>
    </FormFieldWrapper>
  );
};

export default FormColorInput;
