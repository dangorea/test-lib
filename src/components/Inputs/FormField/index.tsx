import React, { FC, useEffect, useState } from "react";
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
// import type { InputProps } from "wix-style-react/dist/es/src/Input";
// import { FormField as WixFormField, Input, Text } from "wix-style-react";

export enum TypeFormField {
  URL = "url",
}

type Props = {
  label: string;
  name: string;
  required: boolean;
  placeholder: string;
  type?: TypeFormField;
};

const FormField: FC<Props> = ({
  label,
  name,
  required = false,
  placeholder,
  type,
}) => {
  const [field, _, helpers] = useField(name);
  const [invalidField, setInvalidField] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const urlPattern =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[A-Z, a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  useEffect(() => {
    // TODO improve this
    if (!field.value && required) {
      setInvalidField(true);
      setErrorMessage("Required");
    } else {
      setInvalidField(false);
    }

    if (
      type === TypeFormField.URL &&
      !field.value.match(urlPattern) &&
      field.value
    ) {
      setErrorMessage("Should be valid url");
      setInvalidField(true);
    } else if (type === TypeFormField.URL && !field.value) {
      setErrorMessage("Required");
    } else if (type === TypeFormField.URL) {
      setInvalidField(false);
    }
  }, [field.value]);

  return (
    <FormFieldWrapper>
      <Label id={name}>
        <span>{label}</span>
        {required && <RequiredField>*</RequiredField>}
      </Label>
      <InputWrapper>
        <FormWrapper>
          <FormContainer focus={focus} error={invalidField}>
            <InputContainer>
              {invalidField && (
                <ErrorNotification>
                  <Tooltip title={errorMessage} position="left" theme="#162D3D">
                    <img src={exclamation} alt="exclamation" />
                  </Tooltip>
                </ErrorNotification>
              )}
              <FormInput
                id={name}
                type="text"
                placeholder={placeholder}
                onChange={(e) => helpers.setValue(e.target.value)}
                value={field.value}
                required={required}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
            </InputContainer>
          </FormContainer>
        </FormWrapper>
      </InputWrapper>
      {/*  TODO Fix here*/}
      {/*<WixFormField*/}
      {/*  label={<Text light>{label}</Text>}*/}
      {/*  id={name}*/}
      {/*  required={required}*/}
      {/*>*/}
      {/*  <Input*/}
      {/*    status={meta.touched && meta.error ? "error" : undefined}*/}
      {/*    statusMessage={meta.error}*/}
      {/*    id={name}*/}
      {/*    {...field}*/}
      {/*    {...props}*/}
      {/*  />*/}
      {/*</WixFormField>*/}
    </FormFieldWrapper>
  );
};

export default FormField;
