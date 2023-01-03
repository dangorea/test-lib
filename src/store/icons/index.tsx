import React, { FC, useCallback } from "react";
import type { Icon } from "../types";
import { MessageModalLayout, Modal, Text } from "wix-style-react";
import { VIEWER_CONFIG } from "../../utils/config";
import { deleteIcon } from "./actions";
import { successNotification } from "../notifications/actions";
import { useDispatch } from "react-redux";

type Props = {
  icon: Icon | null;
  handleClose: () => void;
};

const IconUnlinkModal: FC<Props> = ({ icon, handleClose }) => {
  const dispatch = useDispatch();
  const unlink = useCallback(() => {
    if (icon?.id) {
      dispatch(successNotification("File successfully deleted"));
      void deleteIcon(icon.id);
    }
    handleClose();
  }, [dispatch, handleClose, icon?.id]);

  return (
    // @ts-ignore
    <Modal
      isOpen={!!icon}
      shouldCloseOnOverlayClick
      onRequestClose={handleClose}
      parentSelector={() =>
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as HTMLElement
      }
    >
      {/*@ts-ignore*/}
      <MessageModalLayout
        theme={"destructive"}
        onCloseButtonClick={handleClose}
        primaryButtonText="Unlink"
        primaryButtonOnClick={unlink}
        secondaryButtonText="Cancel"
        secondaryButtonOnClick={handleClose}
        title="Unlink Icons"
      >
        <Text>{`Are you sure you want to unlink following icon: `}</Text>
        <Text weight="bold">{icon?.name}</Text>
      </MessageModalLayout>
    </Modal>
  );
};

export default IconUnlinkModal;
