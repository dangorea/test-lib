import React, { FC, useCallback } from "react";
import { Drawer, Dropzone, Uploaders } from "./styles";
import { Button, SidePanel, AddItem, Text, FileUpload } from "wix-style-react";
import useOpen from "../../../../utils/hooks/useOpen";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../../../store/images/actions";
import type { ButtonProps } from "wix-style-react/dist/es/src/Button";
import { errorNotification } from "../../../../store/notifications/actions";

type Props = {
  btnText?: string;
  btnProps?: ButtonProps;
  width?: number;
};

const UploadDrawer: FC<Props> = ({
  btnProps,
  btnText = "Upload",
  width = 420,
}) => {
  const { open, handleOpen, handleClose } = useOpen();
  const dispatch = useDispatch();

  const uploadFiles = useCallback(
    (files: File[] | FileList) => {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type === "image/jpeg") {
          dispatch(uploadImage(files[i]));
        } else {
          dispatch(errorNotification(`File type should be JPEG or JPG`));
        }
      }

      handleClose();
    },
    [dispatch, handleClose]
  );

  return (
    <>
      <Button onClick={handleOpen} {...btnProps}>
        {btnText}
      </Button>
      <Drawer open={open} width={width}>
        <SidePanel onCloseButtonClick={handleClose} width={width}>
          <SidePanel.Header title="Upload 360° Images" />
          <SidePanel.Content>
            {/*// @ts-ignore*/}
            <Dropzone onDrop={uploadFiles}>
              {/*// @ts-ignore*/}
              <Dropzone.Overlay>
                <AddItem size="large">Drop image here</AddItem>
              </Dropzone.Overlay>
              {/*// @ts-ignore*/}
              <Dropzone.Content>
                <Uploaders>
                  <Text weight="bold">Drag & Drop Images</Text>
                  <Text weight="bold">or</Text>
                  <FileUpload
                    onChange={uploadFiles}
                    multiple
                    accept=".jpeg,.jpg"
                  >
                    {({ openFileUploadDialog }) => (
                      <Button onClick={openFileUploadDialog}>
                        Upload a File
                      </Button>
                    )}
                  </FileUpload>
                </Uploaders>
              </Dropzone.Content>
            </Dropzone>
          </SidePanel.Content>
        </SidePanel>
      </Drawer>
    </>
  );
};

export default UploadDrawer;
