import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { useField } from "formik";
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
import ImageViewer from "../../ImageViewer";
import {
  Button,
  Label,
  PreviewWrapper,
  RequiredField,
} from "../SphereInput/styles";
import Checkbox from "../../Checkbox";
// import {
//   Button,
//   Checkbox,
//   FormField as WixFormField,
//   ImageViewer,
//   Text,
// } from "wix-style-react";
// import type { ImageViewerProps } from "wix-style-react/dist/types/ImageViewer";

type Props = {
  label: string;
  name: string;
  height: string;
  width: string;
  required?: boolean;
};

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

  const handleImage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
        <Label id={name}>
          <span>{label}</span>
          {required && <RequiredField>*</RequiredField>}
        </Label>
        <PreviewWrapper>
          <ImageViewer
            height={64}
            width={64}
            imageUrl={sphere ? getPreviewSrc(sphere) : ""}
            onUpdateImage={handleImage}
          />
        </PreviewWrapper>
      </FormFieldWrapper>
      <SphereSelectDrawer open={open} width={540}>
        <DrawerTitle>Choose Flat Image</DrawerTitle>
        <SphereSelectImageGrid>
          {images.map((image) => {
            const isSelected = image.id === tmpSelectedSphere?.id;
            const fileName = (image.title || image.name).substring(0, 10);
            return (
              <PreviewItemWrapper key={image.id}>
                <PreviewItem
                  src={getPreviewSrc(image)}
                  withoutLaunchIcon
                  isSelected={isSelected}
                  onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault();
                    setTmpSelectedSphere({
                      id: image.id,
                      height: image.exif["File:ImageHeight"],
                      width: image.exif["File:ImageWidth"],
                    });
                  }}
                >
                  <Select>
                    <Checkbox checked={isSelected} />
                  </Select>
                </PreviewItem>
                <span style={{ color: "black" }}>{fileName}</span>
              </PreviewItemWrapper>
            );
          })}
        </SphereSelectImageGrid>
        <SphereSelectActions>
          <UploadDrawer btnText="Upload More" />
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              setTmpSelectedSphere(null);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!tmpSelectedSphere?.id}
            onClick={(e) => {
              e.preventDefault();
              helpers.setValue(tmpSelectedSphere?.id);
              heightHelpers.setValue(tmpSelectedSphere?.height);
              widthHelpers.setValue(tmpSelectedSphere?.width);
              handleClose();
              setTmpSelectedSphere(null);
            }}
          >
            Select
          </Button>
        </SphereSelectActions>
      </SphereSelectDrawer>
    </>
  );
};

export default FlatImageInput;
