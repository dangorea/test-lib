import React, { FC } from 'react';
import {
  ColorInput,
  FormField as WixFormField,
  PopoverProps,
  Text,
} from 'wix-style-react';
import { useField } from 'formik';
import { FormFieldWrapper } from '../FormField/styles';
import type { ColorInputProps } from 'wix-style-react/dist/es/src/ColorInput';

type Props = {
  label: string;
  name: string;
  required?: boolean;
} & Partial<ColorInputProps>;

const FormColorInput: FC<Props> = ({
  label,
  name,
  required = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormFieldWrapper>
      <WixFormField
        label={<Text light>{label}</Text>}
        id={name}
        required={required}
      >
        <ColorInput
          status={meta.touched && meta.error ? 'error' : undefined}
          statusMessage={meta.error}
          popoverAppendTo="scrollParent"
          popoverProps={
            {
              placement: 'auto',
            } as Partial<PopoverProps>
          }
          id={name}
          onConfirm={(color) => helpers.setValue(color)}
          {...field}
          {...props}
          onChange={(color) => helpers.setValue(color)}
        />
      </WixFormField>
    </FormFieldWrapper>
  );
};

export default FormColorInput;
