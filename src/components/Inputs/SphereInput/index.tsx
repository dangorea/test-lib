import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "formik";
import { getCurrentTour } from "../../../store/tours/selectors";
import { getImage } from "../../../store/images/selector";
import type { Tour } from "../../../utils/types";
import { getPreviewSrc } from "../../../utils/image";
import useOpen from "../../../utils/hooks/useOpen";
import PreviewItem from "../../../containers/PreviewItem";
import Viewer from "../../../containers/Viewer";
import {
  FormFieldWrapper,
  DrawerTitle,
  PreviewItemWrapper,
  PreviewWrapper,
  SecondViewerContainer,
  SphereSelectActions,
  SphereSelectDrawer,
  SphereSelectImageGrid,
  Label,
  RequiredField,
  Button,
  Select,
} from "./styles";
import { setViewerImageId } from "../../../store/viewer/actions";
import { getViewerImageId } from "../../../store/viewer/selectors";
import { successNotification } from "../../../store/notifications/actions";
import Checkbox from "../../Checkbox";
import ImageViewer from "../../ImageViewer";

type Props = {
  label: string;
  name: string;
  required?: boolean;
};

const SphereInput: FC<Props> = ({ label, name, required = false }) => {
  const [field, meta, helpers] = useField(name);
  const sphere = useSelector(getImage(field?.value));
  const tour = useSelector(getCurrentTour()) as Tour;
  const { open, handleOpen, handleClose } = useOpen();
  const [tmpSelectedSphere, setTmpSelectedSphere] = useState<string | null>(
    null
  );
  const dispatch = useDispatch();
  const selectedImageViewer = useSelector(getViewerImageId());

  function handleFollowHotspot(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (field.value === selectedImageViewer) {
      dispatch(successNotification("You are on selected sphere"));
    }
    dispatch(setViewerImageId(field.value));
  }

  function handleImage(e: { preventDefault: () => void }) {
    e.preventDefault();
    setTmpSelectedSphere(field.value);
    handleOpen();
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
            error={meta.touched && !field.value}
          />
          {field.value && (
            <Button onClick={handleFollowHotspot}>Go to hotspot</Button>
          )}
        </PreviewWrapper>
      </FormFieldWrapper>
      <SphereSelectDrawer open={open} width={540}>
        <DrawerTitle>Choose Hotspot Image</DrawerTitle>
        <SphereSelectImageGrid>
          {tour.spheres.map((image) => {
            const isSelected = image.id === tmpSelectedSphere;
            const fileName = (image.title || image.name).substring(0, 10);
            return (
              <PreviewItemWrapper key={image.id}>
                <PreviewItem
                  src={getPreviewSrc(image)}
                  withoutLaunchIcon
                  isSelected={isSelected}
                  onClick={() => setTmpSelectedSphere(image.id)}
                >
                  <Select>
                    <Checkbox checked={isSelected} {...field} />
                  </Select>
                </PreviewItem>
                <span style={{ color: "black" }}>{fileName}</span>
              </PreviewItemWrapper>
            );
          })}
        </SphereSelectImageGrid>
        <SphereSelectActions>
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
            disabled={!tmpSelectedSphere}
            onClick={(e) => {
              e.preventDefault();
              helpers.setValue(tmpSelectedSphere);
              helpers.setTouched(true);
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
