import React, { FC, ReactElement } from "react";
import Dismiss from "../../../../../../assets/icons/dismiss";

import {
  ActionsSidebarContent,
  CloseBtn,
  SidebarTitle,
  SidebarWrapper,
} from "./styles";

type Props = {
  open: boolean;
  children: ReactElement;
  title?: string | ReactElement;
  handleClose: () => void;
  onSave?: () => void;
  onDelete?: () => void;
};

const ActionsSidebar: FC<Props> = ({ open, title, handleClose, children }) => {
  return (
    <SidebarWrapper onDrop={(e) => e.stopPropagation()} open={open}>
      <CloseBtn onClick={handleClose}>
        <Dismiss color="gray" />
      </CloseBtn>
      <SidebarTitle /*light*/>{title}</SidebarTitle>
      <ActionsSidebarContent>{children}</ActionsSidebarContent>
    </SidebarWrapper>
  );
};

export default ActionsSidebar;
