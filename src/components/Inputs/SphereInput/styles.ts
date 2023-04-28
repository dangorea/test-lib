import styled from "styled-components";
import { Drawer } from "../../UploadDrawer/styles";

export const FormFieldWrapper = styled.div``;

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

export const RequiredField = styled.div`
  line-height: 24px;
  font-weight: 400;
  display: inline-block;
  color: #4eb7f5;
  font-size: 22px;
  margin-left: 6px;
  margin-top: -4px;
`;

export const SphereSelectDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  cursor: auto;
  background-color: white;
  padding: 20px 20px;
  z-index: 600;
`;

export const SphereSelectImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;
`;

export const PreviewItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DrawerTitle = styled.div`
  font-weight: 400;
  font-size: 28px;
  line-height: 36px;
  color: #162d3d;
  text-align: center;
  margin-bottom: 20px;
`;

export const SphereSelectActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  & > * {
    margin-right: 10px;
  }
`;

export const SecondViewerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 35%;
  user-select: none;

  img {
    object-fit: fill;
    max-width: 100%;
    height: 30vh;
    user-select: none;
  }
`;

export const Button = styled.button`
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
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #4eb7f5;
    border-color: #4eb7f5;
    color: #ffffff;
  }

  &:disabled {
    color: #ffffff;
    background-color: rgba(22, 45, 61, 0.3);
    border-color: transparent;
    cursor: default;
  }
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 6px;
  user-select: none;

  & > * {
    user-select: none;
  }
`;

export const Select = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;
