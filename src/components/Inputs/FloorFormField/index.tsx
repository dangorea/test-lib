import React, { FC } from "react";
import { InputWrapper } from "./styles";
import {
  FormContainer,
  FormInput,
  FormWrapper,
  InputContainer,
  Label,
  LabelText,
  RequiredField,
  ErrorNotification,
} from "./styles";
import { useField } from "formik";
import Tooltip from "../../Tooltip";
import exclamation from "../../../assets/icons/exclamation-icon.svg";
import ImageIcon from "../../../assets/icons/imgIcon";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

const FloorFormField: FC<Props> = ({
  name,
  label,
  placeholder,
  required = false,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <InputWrapper>
      <FormWrapper>
        <Label id={name}>
          <LabelText>{label}</LabelText>
          {required && <RequiredField>*</RequiredField>}
        </Label>
        <FormContainer error={!!meta.error}>
          <InputContainer error={!!meta.error}>
            <ImageIcon />
            <FormInput
              id={name}
              placeholder={placeholder}
              type="text"
              onChange={(e) => helpers.setValue(e.target.value)}
              value={field.value}
              required={required}
              error={!!meta.error}
            />
            {meta.error && (
              <ErrorNotification>
                <Tooltip title={meta.error} position="left" theme="#162D3D">
                  <img src={exclamation} alt="" />
                </Tooltip>
              </ErrorNotification>
            )}
          </InputContainer>
        </FormContainer>
      </FormWrapper>
    </InputWrapper>
  );
};

export default FloorFormField;
