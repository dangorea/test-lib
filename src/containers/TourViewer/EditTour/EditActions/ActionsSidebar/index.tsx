import React, { FC, ReactElement, ReactNode } from "react";
import { Dismiss } from "wix-ui-icons-common";
import {
  CloseBtn,
  SidebarTitle,
  SidebarWrapper,
} from "../../EditBottomBar/AddImagesSidebar/styles";
import {
  ActionsSidebarBottomBtns,
  ActionsSidebarContent,
  CancelBtn,
  DeleteBtn,
  DeleteWrapper,
  SaveBtn,
} from "./styles";

type Props = {
  open: boolean;
  title: string | ReactElement;
  children: ReactNode | undefined;
  handleClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
};

const ActionsSidebar: FC<Props> = ({
  open,
  title,
  onSave,
  handleClose,
  onDelete,
  children,
}) => {
  return (
    <SidebarWrapper onDrop={(e) => e.stopPropagation()} open={open}>
      <CloseBtn onClick={handleClose}>
        <Dismiss />
      </CloseBtn>
      <SidebarTitle>{title}</SidebarTitle>
      <ActionsSidebarContent>{children}</ActionsSidebarContent>
      <ActionsSidebarBottomBtns>
        {onDelete && (
          <DeleteWrapper>
            <DeleteBtn onClick={onDelete}>Delete</DeleteBtn>
          </DeleteWrapper>
        )}
        <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
        <SaveBtn onClick={onSave}>Save</SaveBtn>
      </ActionsSidebarBottomBtns>
    </SidebarWrapper>
  );
};

export default ActionsSidebar;
