import React, { FC, useCallback, useRef } from "react";
import {
  CloseBtn,
  ContentWrapper,
  Divider,
  Drawer,
  HeaderText,
  HeaderWrapper,
  SidePanel,
  UploadBtn,
} from "./styles";
import useOpen from "../../../../utils/hooks/useOpen";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../../store/images/actions";
import { errorNotification } from "../../../../store/notifications/actions";
import useOutsideAction from "../../../../utils/hooks/useOutsideAction";
import Dismiss from "../../../../assets/icons/dismiss";
import DragAndDrop from "../../../../components/DragAndDropFiles";
// import { Button, SidePanel, AddItem, Text, FileUpload } from "wix-style-react";
// import type { ButtonProps } from "wix-style-react/dist/types/Button";

type Props = {
  btnText?: string;
  width?: number;
};

const UploadDrawer: FC<Props> = ({ btnText = "Upload", width = 420 }) => {
  const { open, handleOpen, handleClose } = useOpen();
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAction(wrapperRef, handleClose);

  const uploadFiles = useCallback(
    async (files: File[] | FileList) => {
      await Promise.all(
        Array.from(files).map((file) => {
          if (file.type === "image/jpeg") {
            dispatch(uploadImage(file));
          } else {
            dispatch(errorNotification(`File type should be JPEG or JPG`));
          }
        })
      );
      handleClose();
    },
    [dispatch, handleClose]
  );

  return (
    <>
      <UploadBtn fullWidth onClick={handleOpen}>
        {btnText}
      </UploadBtn>
      <Drawer ref={wrapperRef} open={open} width={width}>
        <SidePanel width={width}>
          <HeaderWrapper>
            <HeaderText>Upload 360° Images</HeaderText>
            <CloseBtn onClick={handleClose}>
              <Dismiss color="#3899ec" />
            </CloseBtn>
          </HeaderWrapper>
          <Divider />
          <ContentWrapper>
            <DragAndDrop uploadFiles={uploadFiles} />
          </ContentWrapper>

          {/*TODO fix here*/}
          {/* */}
          {/*  <SidePanel.Header title="Upload 360° Images" />*/}
          {/*  <SidePanel.Content>*/}
          {/*    <Dropzone onDrop={uploadFiles}>*/}
          {/*      <Dropzone.Overlay>*/}
          {/*        <AddItem size="large">Drop image here</AddItem>*/}
          {/*      </Dropzone.Overlay>*/}
          {/*      <Dropzone.Content>*/}
          {/*        <Uploaders>*/}
          {/*          <Text weight="bold">Drag & Drop Images</Text>*/}
          {/*          <Text weight="bold">or</Text>*/}
          {/*          <FileUpload*/}
          {/*            onChange={uploadFiles}*/}
          {/*            multiple*/}
          {/*            accept=".jpeg,.jpg"*/}
          {/*          >*/}
          {/*            {({ openFileUploadDialog }) => (*/}
          {/*              <Button onClick={openFileUploadDialog}>*/}
          {/*                Upload a File*/}
          {/*              </Button>*/}
          {/*            )}*/}
          {/*          </FileUpload>*/}
          {/*        </Uploaders>*/}
          {/*      </Dropzone.Content>*/}
          {/*    </Dropzone>*/}
          {/*  </SidePanel.Content>*/}
        </SidePanel>
      </Drawer>
    </>
  );
};

export default UploadDrawer;
