import React, { FC, ReactElement } from "react";
import { Button, TextButton } from "wix-style-react";
import { Dismiss } from "wix-ui-icons-common";

import {
  CloseBtn,
  SidebarTitle,
  SidebarWrapper,
} from "../../EditBottomBar/AddImagesSidebar/styles";
import {
  ActionsSidebarBottomBtns,
  ActionsSidebarContent,
  DeleteWrapper,
} from "./styles";

type Props = {
  open: boolean;
  title: string | ReactElement;
  children: any;
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
      <SidebarTitle light appearance="H2">
        {title}
      </SidebarTitle>
      <ActionsSidebarContent>{children}</ActionsSidebarContent>
      <ActionsSidebarBottomBtns>
        {onDelete && (
          <DeleteWrapper>
            <Button skin="destructive" onClick={onDelete}>
              Delete
            </Button>
          </DeleteWrapper>
        )}
        <TextButton skin="light" onClick={handleClose}>
          Cancel
        </TextButton>
        <Button onClick={onSave}>Save</Button>
      </ActionsSidebarBottomBtns>
    </SidebarWrapper>
  );
};

export default ActionsSidebar;
