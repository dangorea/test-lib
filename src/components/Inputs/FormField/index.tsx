import React, { FC, useState } from "react";
import { useField } from "formik";
import {
  ErrorNotification,
  FormContainer,
  FormFieldWrapper,
  FormInput,
  FormWrapper,
  InputContainer,
  InputWrapper,
  Label,
  RequiredField,
} from "./styles";
import exclamation from "../../../assets/icons/exclamation-icon.svg";
import Tooltip from "../../Tooltip";

type Props = {
  label: string;
  name: string;
  required: boolean;
  placeholder: string;
};

const FormField: FC<Props> = ({
  label,
  name,
  required = false,
  placeholder,
}) => {
  const [field, meta, helpers] = useField(name);
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <FormFieldWrapper>
      <Label id={name}>
        <span>{label}</span>
        {required && <RequiredField>*</RequiredField>}
      </Label>
      <InputWrapper>
        <FormWrapper>
          <FormContainer focus={focus} error={!!(meta.touched && meta.error)}>
            <InputContainer>
              {meta.touched && meta.error && (
                <ErrorNotification>
                  <Tooltip title={meta.error} position="left" theme="#162D3D">
                    <img src={exclamation} alt="" />
                  </Tooltip>
                </ErrorNotification>
              )}
              <FormInput
                id={name}
                type="text"
                placeholder={placeholder}
                required={required}
                formNoValidate={false}
                autoComplete="off"
                onFocus={() => setFocus(true)}
                onChange={field.onChange}
                value={field.value}
                onBlur={() => {
                  setFocus(false);
                  helpers.setTouched(true);
                }}
              />
            </InputContainer>
          </FormContainer>
        </FormWrapper>
      </InputWrapper>
    </FormFieldWrapper>
  );
};

export default FormField;
