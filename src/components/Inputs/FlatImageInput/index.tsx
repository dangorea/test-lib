import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useField } from "formik";
// import {
//   Button,
//   Checkbox,
//   FormField as WixFormField,
//   ImageViewer,
//   Text,
// } from "wix-style-react";
// import type { ImageViewerProps } from "wix-style-react/dist/types/ImageViewer";
import { getImage, getMyImages } from "../../../store/images/selector";
import useOpen from "../../../utils/hooks/useOpen";
import PreviewItem from "../../../containers/PreviewItem";
import {
  DrawerTitle,
  PreviewItemWrapper,
  SecondViewerContainer,
  SphereSelectActions,
  SphereSelectDrawer,
  SphereSelectImageGrid,
  FormFieldWrapper,
} from "./styles";
import { Select } from "../../../containers/MyImages/ImageGrid/ImageItem/styles";
import UploadDrawer from "../../../containers/MyImages/Actionbar/UploadDrawer";
import type { Image360 } from "../../../store/types";
import { getPreviewSrc } from "../../../utils/image";

type Props = {
  label: string;
  name: string;
  height: string;
  width: string;
  required?: boolean;
} & Partial<unknown>;

const FlatImageInput: FC<Props> = ({
  label,
  name,
  required = false,
  height,
  width,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [heightField, , heightHelpers] = useField(height);
  const [widthField, , widthHelpers] = useField(width);
  const sphere = useSelector(getImage(field.value));
  const images = useSelector(getMyImages());
  const { open, handleOpen, handleClose } = useOpen();
  const [tmpSelectedSphere, setTmpSelectedSphere] = useState<{
    id: string;
    height: string;
    width: string;
  } | null>(null);
  const selectedImage = useSelector(getImage(field.value));

  const handleImage = () => {
    setTmpSelectedSphere({
      id: field.value,
      height: heightField.value,
      width: widthField.value,
    });
    handleOpen();
  };

  return (
    <>
      {sphere?.id && (
        <SecondViewerContainer>
          <img
            src={getPreviewSrc(selectedImage as Image360)}
            alt=""
            draggable={false}
          />
        </SecondViewerContainer>
      )}
      <FormFieldWrapper>
        {/*TODO Fix here*/}
        {/*<WixFormField*/}
        {/*  label={<Text light>{label}</Text>}*/}
        {/*  id={name}*/}
        {/*  required={required}*/}
        {/*>*/}
        {/*  <ImageViewer*/}
        {/*    height={64}*/}
        {/*    width={64}*/}
        {/*    status={meta.touched && meta.error ? "error" : undefined}*/}
        {/*    statusMessage={meta.error}*/}
        {/*    imageUrl={sphere ? getPreviewSrc(sphere) : ""}*/}
        {/*    showRemoveButton={false}*/}
        {/*    onUpdateImage={handleImage}*/}
        {/*    onAddImage={handleImage}*/}
        {/*    {...field}*/}
        {/*    {...props}*/}
        {/*  />*/}
        {/*</WixFormField>*/}
      </FormFieldWrapper>
      <SphereSelectDrawer open={open} width={540}>
        <DrawerTitle appearance="H2">Choose Flat Image</DrawerTitle>
        <SphereSelectImageGrid>
          {images.map((image) => {
            const isSelected = image.id === tmpSelectedSphere?.id;
            return (
              <PreviewItemWrapper key={image.id}>
                <PreviewItem
                  src={getPreviewSrc(image)}
                  withoutLaunchIcon
                  isSelected={isSelected}
                  onClick={() => {
                    setTmpSelectedSphere({
                      id: image.id,
                      height: image.exif["File:ImageHeight"],
                      width: image.exif["File:ImageWidth"],
                    });
                  }}
                >
                  {/*TODO Fix here*/}
                  {/*<Select>*/}
                  {/*  <Checkbox checked={isSelected} size="medium" />*/}
                  {/*</Select>*/}
                </PreviewItem>
                {/*<Text>{(image.title || image.name).substring(0, 16)}</Text>*/}
              </PreviewItemWrapper>
            );
          })}
        </SphereSelectImageGrid>
        <SphereSelectActions>
          <UploadDrawer btnText="Upload More" btnProps={{ fullWidth: true }} />
          {/*TODO Fix here*/}
          {/*<Button*/}
          {/*  onClick={() => {*/}
          {/*    handleClose();*/}
          {/*    setTmpSelectedSphere(null);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Cancel*/}
          {/*</Button>*/}
          {/*<Button*/}
          {/*  disabled={!tmpSelectedSphere}*/}
          {/*  onClick={() => {*/}
          {/*    helpers.setValue(tmpSelectedSphere?.id);*/}
          {/*    heightHelpers.setValue(tmpSelectedSphere?.height);*/}
          {/*    widthHelpers.setValue(tmpSelectedSphere?.width);*/}
          {/*    handleClose();*/}
          {/*    setTmpSelectedSphere(null);*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Select*/}
          {/*</Button>*/}
        </SphereSelectActions>
      </SphereSelectDrawer>
    </>
  );
};

export default FlatImageInput;
