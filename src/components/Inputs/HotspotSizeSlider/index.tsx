import React, { FC } from "react";
import { useField } from "formik";
import {
  FormFieldWrapper,
  Label,
  Slider,
  StyledSlider,
  StyledThumb,
  StyledTrack,
} from "./styles";
import Tooltip from "../../Tooltip";
import type { StyledProps } from "styled-components";

type Props = {
  label: string;
  name: string;
  props?: any;
};

type TrackProps = {
  className: string;
  key: string;
  style: StyledProps<any>;
};

type TrackState = {
  index: number;
  valueNow: number;
  value: number;
};

const Thumb = (props: TrackProps, state: TrackState) => {
  return (
    <StyledThumb {...state} {...props}>
      <Tooltip
        title={Math.ceil(state.valueNow * 100).toString()}
        position="top"
        styles={{
          transform: "translate(28px, -5px)",
        }}
      ></Tooltip>
    </StyledThumb>
  );
};

const Track = (props: TrackProps, state: TrackState) => {
  return <StyledTrack {...props} {...state} />;
};

const HotspotSizeSlider: FC<Props> = ({ label, name, props }) => {
  const [field, _meta, helpers] = useField(name);

  return (
    <FormFieldWrapper>
      <Label>
        <span>{label}</span>
      </Label>
      <Slider id={name}>
        <StyledSlider
          renderTrack={Track}
          renderThumb={Thumb}
          min={0.15}
          step={0.001}
          max={1}
          value={field.value}
          onChange={(value) => helpers.setValue(value)}
          {...props}
        />
      </Slider>
    </FormFieldWrapper>
  );
};

export default HotspotSizeSlider;
