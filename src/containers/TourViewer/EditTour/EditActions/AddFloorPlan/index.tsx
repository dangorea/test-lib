import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { FormWrapper, SvgIconHover } from "./styles";
import FloorPlanIcon from "../FloorPlanIcon/index";
import { createPortal } from "react-dom";
import { VIEWER_CONFIG } from "../../../../../utils/config";
import ActionModal from "../ActionModal/index";
import { ActionBtn } from "../UpdateCover/styles";
import Tooltip from "../../../../../components/Tooltip";
import FloorPlanInput from "../../../../../components/Inputs/FloorPlanInput";
import FloorFormField from "../../../../../components/Inputs/FloorFormField";
import { initialValues, validationSchema } from "./form";
import { Form, Formik } from "formik";
import ImageContainer from "../../../../../components/FloorPlanPreview/ImageContainer";
import { useDispatch, useSelector } from "react-redux";
import { getTourId } from "../../../../../store/viewer/selectors";
import { errorNotification } from "../../../../../store/notifications/actions";
import {
  addFloorPlanDotsToLink,
  updateFloorPlanLevel,
  uploadFloorPlanLevel,
} from "../../../../../store/tours/actions";
import type { Values } from "./form";
import FloorCheckbox from "../../../../../components/Inputs/FloorCheckbox";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const AddFloorPlan: FC<Props> = ({ open, handleOpen, handleClose }) => {
  const [currentFloorPlan, setCurrentFloorPlan] =
    useState<Values>(initialValues);
  const tourId = useSelector(getTourId()) as string;
  const dispatch = useDispatch();

  const onUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const { target } = event;
      const files = target.files;

      Array.from(files as FileList).map(async (file) => {
        const isImage =
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg";

        if (!isImage) {
          dispatch(errorNotification("File type should be JPG, PNG"));
          return;
        }

        await dispatch(
          // @ts-ignore
          uploadFloorPlanLevel(
            tourId,
            file,
            file.name
            // setUploadedImage,
            // setUploadAction
          )
        );

        // if (!title) {
        //   dispatch(errorNotification("Image title required"));
        //   return;
        // }
        // setUploadAction(true);
      });
    },
    [dispatch]
  );

  // const saveDots = useCallback(
  //   async (data: Array<Link>, selected: Level) => {
  //     for (const dot of Array.from(data)) {
  //       if (!selected.hasOwnProperty("id")) {
  //         dispatch(errorNotification("Save image first"));
  //         return;
  //       }
  //
  //       if (!dot.toUpload) {
  //         continue;
  //       }
  //
  //       setUploadAction(true);
  //
  //       await dispatch(
  //         addFloorPlanDotsToLink(tourId, selected, dot, setUploadAction)
  //       );
  //     }
  //   },
  //   [dispatch]
  // );

  const handleSubmit = useCallback(
    async (vals: Values) => {
      if (vals.link.length) {
        vals.link.map(
          (dot) =>
            dot.toUpload &&
            dispatch(
              // @ts-ignore
              addFloorPlanDotsToLink(tourId, vals.level, dot)
            )
        );
      }

      if (vals.title !== vals.level?.title) {
        dispatch(
          //@ts-ignore
          updateFloorPlanLevel(tourId, vals.link?.id as string, vals.title)
        );
      }
    },
    [dispatch, handleClose]
  );

  const onCancel = useCallback(() => {
    setCurrentFloorPlan(initialValues);
    handleClose();
  }, [handleClose]);

  return (
    <div>
      <SvgIconHover>
        <ActionBtn onClick={handleOpen}>
          <Tooltip
            title="Floor Plan"
            position="right"
            styles={{
              left: "35px",
              top: "-2px",
            }}
          >
            <FloorPlanIcon />
          </Tooltip>
        </ActionBtn>
      </SvgIconHover>
      {createPortal(
        <Formik
          initialValues={currentFloorPlan}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm, values }) => {
            return (
              <ActionModal
                open={open}
                handleClose={onCancel}
                title="Floor Plan"
              >
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    gap: "46px",
                  }}
                >
                  <ImageContainer name="link" />
                  <FormWrapper>
                    <FloorFormField
                      name="title"
                      label="Add image title"
                      placeholder="ex. Ground floor plan"
                      required
                    />
                    {values.link && (
                      <FloorCheckbox
                        name="toggle"
                        label="Show hotspot titles"
                      />
                    )}
                    <FloorPlanInput
                      name="level"
                      handleChange={onUpload}
                      handleSubmit={submitForm}
                    />
                  </FormWrapper>
                </Form>
              </ActionModal>
            );
          }}
        </Formik>,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </div>
  );
};

export default AddFloorPlan;
