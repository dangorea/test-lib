import styled from "styled-components";
import { Drawer } from "../../MyImages/Actionbar/UploadDrawer/styles";
import { Heading } from "wix-style-react";

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

export const DrawerTitle = styled(Heading)`
  text-align: center;
  margin-bottom: 20px;
`;

export const SphereSelectActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;
  flex: 1;
`;

export const SecondViewerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  user-select: none;

  & > * {
    margin-right: 10px;
  }

  img {
    object-fit: fill;
    max-width: 100%;
    height: 30vh;
    user-select: none;
  }
`;

export const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
