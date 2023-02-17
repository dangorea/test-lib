import React, { FC, useRef } from "react";
import {
  Container,
  HeadingContainer,
  HeadingWrapper,
  Modal,
  ModalWrapper,
  Popup,
  LabelContainer,
  ErrorMessageWrapper,
  ErrorMessageContainer,
  Divider,
  BottomBarWrapper,
  BottomContainer,
  CancelBtn,
  UnlinkBtn,
} from "./styles";
import useOutsideAction from "../../utils/hooks/useOutsideAction";

type Props = {
  open: boolean;
  headerLabel: string;
  errorMessage: string;
  fileName: string;
  handleUnlink: () => void;
  handleClose: () => void;
};

const UnlinkModal: FC<Props> = ({
  open,
  headerLabel,
  errorMessage,
  fileName,
  handleUnlink,
  handleClose,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAction(wrapperRef, handleClose);

  if (!open) {
    return null;
  }

  return (
    // TODO Fix here
    <ModalWrapper>
      <Modal>
        <Container>
          <Popup ref={wrapperRef}>
            <HeadingWrapper>
              <HeadingContainer>
                <LabelContainer>{headerLabel}</LabelContainer>
              </HeadingContainer>
            </HeadingWrapper>
            <ErrorMessageWrapper>
              <ErrorMessageContainer>
                {errorMessage} <span>{fileName}</span>
              </ErrorMessageContainer>
            </ErrorMessageWrapper>
            <Divider />
            <BottomBarWrapper>
              <BottomContainer>
                <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
                <UnlinkBtn onClick={handleUnlink}>Unlink</UnlinkBtn>
              </BottomContainer>
            </BottomBarWrapper>
          </Popup>
        </Container>
      </Modal>
    </ModalWrapper>

    // <Modal
    //   isOpen={!!icon}
    //   shouldCloseOnOverlayClick
    //   onRequestClose={handleClose}
    //   parentSelector={() =>
    //     document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as HTMLElement
    //   }
    // >
    //   {/*@ts-ignore*/}
    //   <MessageModalLayout
    //     theme={"destructive"}
    //     onCloseButtonClick={handleClose}
    //     primaryButtonText="Unlink"
    //     primaryButtonOnClick={unlink}
    //     secondaryButtonText="Cancel"
    //     secondaryButtonOnClick={handleClose}
    //     title="Unlink Icons"
    //   >
    //     <Text>{`Are you sure you want to unlink following icon: `}</Text>
    //     <Text weight="bold">{icon?.name}</Text>
    //   </MessageModalLayout>
    // </Modal>
  );
};

export default UnlinkModal;
