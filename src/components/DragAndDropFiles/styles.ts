import styled from "styled-components";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

export const Dropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  height: 100%;

  & > span {
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: #162d3d;
  }
`;

export const UploadFile = styled.button`
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #3899ec;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  outline: 0;
  transition-duration: 100ms;
  transition-timing-function: linear;
  transition-property: background-color, color, border-color;
  height: 36px;
  min-width: 84px;
  border-radius: 18px;
  padding: 0 23px;
  background-color: #3899ec;
  color: #ffffff;
  text-decoration: none;
  user-select: none;

  &:hover {
    background-color: #4eb7f5;
    border-color: #4eb7f5;
    color: #ffffff;
  }
`;
