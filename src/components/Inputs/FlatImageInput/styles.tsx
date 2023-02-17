import styled from "styled-components";
import { Drawer } from "../../../containers/MyImages/Actionbar/UploadDrawer/styles";
// import { Heading } from "wix-style-react";

export const FormFieldWrapper = styled.div`
  //margin-top: 10px;
  //margin-bottom: 10px;
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

// TODO maybe fix here
export const DrawerTitle = styled("title")`
  text-align: center;
  margin-bottom: 20px;
`;

export const SphereSelectActions = styled.div`
  display: flex;
  gap: 5%;
`;

export const SecondViewerContainer = styled.div`
  width: 100%;
  height: 25%;
  user-select: none;

  img {
    object-fit: cover;
    display: block;
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;
