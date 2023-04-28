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
import useOpen from "../../utils/hooks/useOpen";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../store/images/actions";
import { errorNotification } from "../../store/notifications/actions";
import useOutsideAction from "../../utils/hooks/useOutsideAction";
import Dismiss from "../../assets/icons/dismiss";
import DragAndDrop from "../../components/DragAndDropFiles";

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
            dispatch(
              // @ts-ignore
              uploadImage(file)
            );
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
      <UploadBtn
        fullWidth
        onClick={(e) => {
          e.preventDefault();
          handleOpen();
        }}
      >
        {btnText}
      </UploadBtn>
      <Drawer ref={wrapperRef} open={open} width={width}>
        <SidePanel width={width}>
          <HeaderWrapper>
            <HeaderText>Upload 360° Images</HeaderText>
            <CloseBtn
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              <Dismiss color="#3899ec" />
            </CloseBtn>
          </HeaderWrapper>
          <Divider />
          <ContentWrapper>
            <DragAndDrop uploadFiles={uploadFiles} />
          </ContentWrapper>
        </SidePanel>
      </Drawer>
    </>
  );
};

export default UploadDrawer;
