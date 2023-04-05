import React, { FC, useEffect } from "react";
import { Indicator, Input, Label, LabelText } from "./styles";
import { useField } from "formik";
import { useSelector } from "react-redux";
import { getShowHotspotTitle } from "../../../store/tours/selectors";

type Props = {
  // onChange: () => void;
  name: string;
  label: string;
  // checked: boolean;
};

const FloorCheckbox: FC<Props> = ({ name, label }) => {
  const [field, _meta, helpers] = useField(name);
  const showHotspotTitles = useSelector(getShowHotspotTitle());

  useEffect(() => {
    helpers.setValue(showHotspotTitles);
  }, [showHotspotTitles]);

  return (
    <Label htmlFor={name}>
      <LabelText>{label}</LabelText>
      <Input
        id={name}
        type="checkbox"
        role="checkbox"
        onChange={(e) => helpers.setValue(e.target.checked)}
        checked={field.value}
      />
      <Indicator />
    </Label>
  );
};

export default FloorCheckbox;
