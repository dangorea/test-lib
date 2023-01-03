import React, { FC } from 'react';
import { FormField as WixFormField, Input, Text } from 'wix-style-react';
import { useField } from 'formik';
import type { InputProps } from 'wix-style-react/dist/es/src/Input';
import { FormFieldWrapper } from './styles';

type Props = {
  label: string;
  name: string;
  required: boolean;
} & Partial<InputProps>;

const FormField: FC<Props> = ({ label, name, required = false, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <FormFieldWrapper>
      <WixFormField
        label={<Text light>{label}</Text>}
        id={name}
        required={required}
      >
        <Input
          status={meta.touched && meta.error ? 'error' : undefined}
          statusMessage={meta.error}
          id={name}
          {...field}
          {...props}
        />
      </WixFormField>
    </FormFieldWrapper>
  );
};

export default FormField;
