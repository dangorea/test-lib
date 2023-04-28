import React, { FC, useCallback } from "react";
import { Button, PreviewActionsWrapper } from "./styles";
import UpgradeButton from "../../../UpgradeButton/index";
import {
  closeTourViewer,
  setViewerTourMode,
} from "../../../../store/viewer/actions";
import { useDispatch, useSelector } from "react-redux";
import { TOUR_MODES } from "../../../../store/viewer/constants";
import { getOnClose } from "../../../../store/config/selectors";

const PreviewActions: FC = () => {
  const dispatch = useDispatch();
  const onClose = useSelector(getOnClose());

  const close = useCallback(() => {
    onClose();
    dispatch(
      // @ts-ignore
      closeTourViewer()
    );
  }, [dispatch]);

  const edit = useCallback(() => {
    dispatch(setViewerTourMode(TOUR_MODES.EDIT));
  }, [dispatch]);

  return (
    <PreviewActionsWrapper>
      <UpgradeButton />
      <Button onClick={close}>Close</Button>
      <Button onClick={edit}>Edit</Button>
    </PreviewActionsWrapper>
  );
};

export default PreviewActions;
