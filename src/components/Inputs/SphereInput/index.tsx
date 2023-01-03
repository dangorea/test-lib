import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "formik";
import {
  Button,
  Checkbox,
  FormField as WixFormField,
  ImageViewer,
  Text,
} from "wix-style-react";

import type { ImageViewerProps } from "wix-style-react/dist/es/src/ImageViewer";

import { getCurrentTour } from "../../../store/tours/selectors";
import { getImage } from "../../../store/images/selector";
import type { Tour } from "../../../store/types";

import { getPreviewSrc } from "../../../utils/image";
import useOpen from "../../../utils/hooks/useOpen";

import PreviewItem from "../../PreviewItem";
import Viewer from "../../../components/Viewer";

import {
  DrawerTitle,
  PreviewItemWrapper,
  PreviewWrapper,
  SecondViewerContainer,
  SphereSelectActions,
  SphereSelectDrawer,
  SphereSelectImageGrid,
} from "./styles";
import { Select } from "../../MyImages/ImageGrid/ImageItem/styles";
import { FormFieldWrapper } from "../FormField/styles";
import { setViewerImageId } from "../../../store/viewer/actions";
import { getViewerImageId } from "../../../store/viewer/selectors";
import { successNotification } from "../../../store/notifications/actions";

type Props = {
  label: string;
  name: string;
  required?: boolean;
} & Partial<ImageViewerProps>;

const SphereInput: FC<Props> = ({
  label,
  name,
  required = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const sphere = useSelector(getImage(field?.value));
  const tour = useSelector(getCurrentTour()) as Tour;
  const { open, handleOpen, handleClose } = useOpen();
  const [tmpSelectedSphere, setTmpSelectedSphere] = useState<string | null>(
    null
  );
  const dispatch = useDispatch();
  const selectedImageViewer = useSelector(getViewerImageId());

  function handleImage() {
    setTmpSelectedSphere(field.value);
    handleOpen();
  }

  function handleFollowHotspot() {
    if (field.value === selectedImageViewer) {
      dispatch(successNotification("You are on selected sphere"));
    }
    dispatch(setViewerImageId(field.value));
  }

  return (
    <>
      <span style={{ marginBottom: "10px" }}>Set starting point</span>
      {sphere?.id && (
        <SecondViewerContainer>
          <Viewer id={sphere?.id} isSideViewer />
        </SecondViewerContainer>
      )}
      <FormFieldWrapper>
        <WixFormField
          label={<Text light>{label}</Text>}
          id={name}
          required={required}
        >
          <PreviewWrapper>
            <ImageViewer
              height={64}
              width={64}
              status={meta.touched && meta.error ? "error" : undefined}
              statusMessage={meta.error}
              imageUrl={sphere ? getPreviewSrc(sphere) : ""}
              showRemoveButton={false}
              onUpdateImage={handleImage}
              onAddImage={handleImage}
              {...field}
              {...props}
            />
            {field.value && (
              <Button onClick={handleFollowHotspot}>Go to hotspot</Button>
            )}
          </PreviewWrapper>
        </WixFormField>
      </FormFieldWrapper>
      <SphereSelectDrawer open={open} width={540}>
        <DrawerTitle appearance="H2">Choose Hotspot Image</DrawerTitle>
        <SphereSelectImageGrid>
          {tour.spheres.map((image) => {
            const isSelected = image.id === tmpSelectedSphere;
            return (
              <PreviewItemWrapper key={image.id}>
                <PreviewItem
                  src={getPreviewSrc(image)}
                  withoutLaunchIcon
                  isSelected={isSelected}
                  onClick={() => setTmpSelectedSphere(image.id)}
                >
                  <Select>
                    <Checkbox checked={isSelected} size="medium" />
                  </Select>
                </PreviewItem>
                <Text>{image.title || image.name}</Text>
              </PreviewItemWrapper>
            );
          })}
        </SphereSelectImageGrid>
        <SphereSelectActions>
          <Button
            onClick={() => {
              handleClose();
              setTmpSelectedSphere(null);
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!tmpSelectedSphere}
            onClick={() => {
              helpers.setValue(tmpSelectedSphere);
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

export default SphereInput;
