import React, { FC } from 'react';
import { FormField as WixFormField, Slider, Text } from 'wix-style-react';
import { useField } from 'formik';
import type { InputProps } from 'wix-style-react/dist/es/src/Input';

type Props = {
  label: string;
  name: string;
  required?: boolean;
} & Partial<InputProps>;
const HotspotSizeSlider: FC<Props> = ({ label, name, required = false }) => {
  const [field, _meta, helpers] = useField(name);

  return (
    <WixFormField
      label={<Text light>{label}</Text>}
      id={name}
      required={required}
    >
      <Slider
        id={name}
        min={0.01}
        step={0.001}
        max={0.8}
        displayMarks={false}
        onChange={helpers.setValue}
        value={field.value}
      />
    </WixFormField>
  );
};

export default HotspotSizeSlider;
