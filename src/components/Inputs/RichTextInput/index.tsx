import React, { FC, useEffect, useRef, useState } from 'react';
import {
  FormField as WixFormField,
  RichTextInputArea,
  Text,
} from 'wix-style-react';
import { useField } from 'formik';
import { FormFieldWrapper } from '../FormField/styles';
import type { RichTextInputAreaProps } from 'wix-style-react/dist/es/src/RichTextInputArea';

type Props = {
  label: string;
  name: string;
  setValueCondition?: boolean;
  newValue?: string;
  required?: boolean;
} & Partial<RichTextInputAreaProps>;

const RichTextInput: FC<Props> = ({
  label,
  name,
  setValueCondition,
  newValue,
  required = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const inputRef = useRef<RichTextInputArea | null>(null);
  const [initialContentLoaded, setInitialContentLoaded] = useState(false);

  useEffect(() => {
    if (field.value && !initialContentLoaded) {
      inputRef?.current?.setValue(field.value);
      setInitialContentLoaded(true);
    } else if (setValueCondition && newValue) {
      inputRef?.current?.setValue(newValue);
    }
  }, [field.value, initialContentLoaded, newValue, setValueCondition]);

  return (
    <FormFieldWrapper>
      <WixFormField
        label={<Text light>{label}</Text>}
        id={name}
        required={required}
      >
        <RichTextInputArea
          ref={inputRef}
          status={meta.touched && meta.error ? 'error' : undefined}
          statusMessage={meta.error}
          minHeight="200px"
          {...field}
          onChange={(val: string) => helpers.setValue(val)}
          {...props}
        />
      </WixFormField>
    </FormFieldWrapper>
  );
};

export default RichTextInput;
