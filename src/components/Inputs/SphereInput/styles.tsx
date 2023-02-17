import styled from "styled-components";
import { Drawer } from "../../../containers/MyImages/Actionbar/UploadDrawer/styles";

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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 5px;
  flex: 1;
`;

export const SecondViewerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 35%;
  user-select: none;

  //& > * {
  //  margin-right: 10px;
  //}

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
  padding-top: 6px;
  user-select: none;

  & > * {
    user-select: none;
  }
`;

export const PreviewContainer = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  border-radius: 8px;
  background-color: #eaf7ff;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.2s linear;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
`;

export const ImgPreview = styled.img`
  position: relative;
  border-radius: 8px;
  background-color: #eaf7ff;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 0.2s linear;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
`;
