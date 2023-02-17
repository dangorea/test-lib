import styled from "styled-components";
import ReactSlider from "react-slider";

export const FormFieldWrapper = styled.div`
  display: block;
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

export const Slider = styled.div`
  position: relative;
  height: calc(3px + 2 * 4.5px);
  width: 100%;
  touch-action: none;
  box-sizing: border-box;
  margin: 9px 0 6px 0;
  padding-top: 6px;
`;

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 3px;
  outline: 0;
  display: flex;
  align-items: center;

  & > * {
    outline: 0;
  }
`;

export const StyledThumb = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #3899ec;
  outline: 0;
  cursor: grab;
`;

export const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: ${({ index }) => (index === 0 ? "#3899EC" : "#DAEFFE")};
  border-radius: 999px;
`;
