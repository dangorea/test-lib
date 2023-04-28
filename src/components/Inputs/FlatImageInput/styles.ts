import styled from "styled-components";
import { Drawer } from "../../UploadDrawer/styles";

export const FormFieldWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SphereSelectDrawer = styled(Drawer)`
  display: flex;
  flex-direction: column;
  z-index: 600;
  cursor: auto;
  background-color: white;
  padding: 20px 20px;
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

  & > button {
    margin-right: 10px;
  }
`;

export const SecondViewerContainer = styled.div`
  width: 100%;
  height: 30vh;
  user-select: none;

  img {
    object-fit: cover;
    display: block;
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;

export const Select = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;
