import React, { ReactNode } from "react";
import Dismiss from "../../../../../assets/icons/dismiss";
import {
  ActionsSidebarContent,
  CloseBtn,
  ModalWrapper,
  SidebarTitle,
} from "./styles";

type Props = {
  open: boolean;
  children: ReactNode | undefined;
  title: string;
  handleClose: () => void;
  onSave?: () => void;
  onDelete?: () => void;
};

const ActionModal = ({ open, title, handleClose, children }: Props) => {
  return (
    <ModalWrapper onDrop={(e) => e.stopPropagation()} open={open}>
      <CloseBtn onClick={handleClose}>
        <Dismiss />
      </CloseBtn>
      <SidebarTitle>{title}</SidebarTitle>
      <ActionsSidebarContent>{children}</ActionsSidebarContent>
    </ModalWrapper>
  );
};

export default ActionModal;
