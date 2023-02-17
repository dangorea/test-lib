import styled from "styled-components";

export const FormFieldWrapper = styled.div`
  //margin-top: 10px;
  //margin-bottom: 10px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  max-width: 100%;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #ffffff;
  margin-top: 10px;
`;

export const Picker = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Swatch = styled.div`
  width: 20px;
  height: 18px;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: 0 6px 0 0;
`;

export const Popover = styled.div`
  position: absolute;
  top: -90%;
  left: 42%;
  border-radius: 9px;
  box-shadow: 0 6px 12px rgb(0 0 0 / 40%);
  z-index: 100;
`;

export const InputWrapper = styled.div`
  padding-top: 6px;
  flex-grow: 1;
  margin: auto 0;
  flex: 0 0 100%;
  max-width: 100%;
`;

export const InputContainer = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  box-sizing: border-box;
  border-radius: 6px;
  display: flex;
  border: solid 1px #c1e4fe;
  background-color: #fff;
  color: #162d3d;

  &:focus {
    color: #162d3d;
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 24px;
    font-weight: 400;
    outline: 0;
    border-color: #3899EC;
    box-shadow: 0 0 0 3px #aadbfc;
  \`
  }
  
  &:hover {
    background: #eaf7ff;
  }
`;

export const InputPadding = styled.div`
  padding: 0 6px;
  display: flex;
  width: 100%;
  align-items: center;
`;

export const TagContainer = styled.div`
  padding-left: 6px;
  margin: auto 0 auto 6px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #7a92a5;
`;

export const Input = styled.input`
  color: #162d3d;
  display: block;
  flex: 1 1 auto;
  margin: 0;
  border: 0;
  outline: 0;
  background: 0 0;
  box-shadow: none;
  width: inherit;
  overflow-block: scroll;
  padding: 5px 3px 5px 6px;
  text-overflow: clip;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  //font-size: 16px;
  //box-sizing: border-box;
  //line-height: 24px;
  //font-weight: 400;
  //outline: 0;
  //box-shadow: none;
  //overflow-block: scroll;
  //padding: 5px 9px 5px 12px;
  //border-radius: 6px;
  //border: solid 1px #c1e4fe;
  //background: #fff;
  //width: 100%;
  //margin-top: 5px;
  //
  //&::placeholder {
  //  color: #162d3d;
  //  font-size: 15px;
  //  letter-spacing: 1px;
  //  line-height: 24px;
  //  font-weight: 400;
  //}
  //
  //&:focus {
  //  color: #162d3d;
  //  font-size: 15px;
  //  letter-spacing: 1px;
  //  line-height: 24px;
  //  font-weight: 400;
  //}
  //
  //&:hover {
  //  background: #eaf7ff;
  //}
`;

export const ColorPickerWrapper = styled.div`
  border: 0;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 6px 6px 0 rgba(22, 45, 61, 0.06),
    0 0 18px 0 rgba(22, 45, 61, 0.12);
  font-size: 14px;
  line-height: 18px;
  color: #162d3d;
  background: #fff;
  width: 240px;
`;

export const ReactColorPicker = styled.div`
  & > .react-colorful {
    height: 126px;
    width: auto;

    & > .react-colorful__hue {
      height: 12px;
      border-radius: 0;
    }

    //& > .react-colorful__pointer {
    //  height: 12px;
    //  width: 12px;
    //  border-radius: 50%;
    //  //top: 0;
    //  //left: 0;
    //  margin-top: -6px;
    //  margin-left: -6px;
    //  position: absolute;
    //  border: solid 1px #162d3d;
    //  background: #fff;
    //  opacity: 0.7;
    //  cursor: pointer;
    //}

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent transparent white;
    }
  }

  .react-colorful__saturation-pointer {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    position: absolute;
    border: solid 1px #162d3d;
    background: #fff !important;
    opacity: 0.7;
    cursor: pointer;
  }

  .react-colorful__hue-pointer,
  .react-colorful__alpha-pointer {
    position: absolute;
    height: 16px;
    width: 16px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 1px 0 rgba(22, 45, 61, 0.48),
      0 0 3px 0 rgba(22, 45, 61, 0.12);
    cursor: pointer;
  }
`;

export const ColorFormWrapper = styled.div`
  display: flex;
  padding: 12px 18px;
`;

export const ColorInputContainer = styled.div`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  border-radius: 6px;
  display: flex;
  border: solid 1px #c1e4fe;
  background-color: #fff;
  color: #162d3d;
  flex: 1;
  min-width: 0;
`;

export const InputContent = styled.div`
  padding: 0 6px;
`;

export const ColorInput = styled.input`
  text-overflow: clip;
  padding: 5px 3px 5px 6px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: #162d3d;
  display: block;
  flex: 1 1 auto;
  margin: 0;
  border: 0;
  outline: 0;
  background: 0 0;
  box-shadow: none;
  width: inherit;
  overflow-block: scroll;
  min-width: 0;
`;

export const ColorPreview = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  margin-left: 12px;
  border-radius: 6px;
  border: solid 1px rgba(43, 129, 203, 0.24);
`;

export const ButtonBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 18px;
`;

export const CancelBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 18px;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #3899ec;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  background-color: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background-color: #4eb7f5;
    border-color: #4eb7f5;
    color: #fff;

    & > svg > path {
      fill: white;
    }
  }

  &:active {
    background-color: #3899ec;
    border-color: #3899ec;
    color: #fff;
  }

  &:disabled {
    background-color: rgba(22, 45, 61, 0.3);
    border-color: transparent;
    color: #fff;
  }
`;

export const ConfirmBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 18px;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #3899ec;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  background-color: #3899ec;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
  margin-left: 6px;

  & > svg {
    width: 12px;
    height: 12px;
  }

  &:hover {
    background-color: #4eb7f5;
    border-color: #4eb7f5;
    color: #fff;
  }
`;
