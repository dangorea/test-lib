import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  ButtonBtnWrapper,
  CancelBtn,
  ColorFormWrapper,
  ColorInput,
  ColorInputContainer,
  ColorPickerWrapper,
  ColorPreview,
  ConfirmBtn,
  InputContent,
  ReactColorPicker,
} from "./styles";
import Dismiss from "../../../assets/icons/dismiss";
import Confirm from "../../../assets/icons/confirm";

type Props = {
  open: boolean;
  field: string;
  helpers: (value: any, shouldValidate?: boolean) => void;
  handleClose: () => void;
};

const ColorPicker = ({ open, field, helpers, handleClose }: Props) => {
  const [color, _] = useState(field);

  if (!open) {
    return null;
  }

  return (
    <ColorPickerWrapper>
      <ReactColorPicker>
        <HexColorPicker color={field} onChange={helpers} />
      </ReactColorPicker>
      <ColorFormWrapper>
        <ColorInputContainer>
          <InputContent>
            <ColorInput
              value={field.toUpperCase()}
              onChange={(e) => helpers(e.target.value)}
            />
          </InputContent>
        </ColorInputContainer>
        <ColorPreview color={field} />
      </ColorFormWrapper>
      <ButtonBtnWrapper>
        <CancelBtn
          onClick={(e) => {
            e.preventDefault();
            helpers(color);
            handleClose();
          }}
        >
          <Dismiss color="#3899ec" />
        </CancelBtn>
        <ConfirmBtn
          onClick={(e) => {
            e.preventDefault();
            helpers(field);
            handleClose();
          }}
        >
          <Confirm />
        </ConfirmBtn>
      </ButtonBtnWrapper>
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
