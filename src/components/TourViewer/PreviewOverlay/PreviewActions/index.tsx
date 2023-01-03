import React, { FC, useCallback } from "react";
import { PreviewActionsWrapper } from "./styles";
import UpgradeButton from "../../../../components/UpgradeButton/index";
import { Button } from "wix-style-react";
import {
  closeTourViewer,
  setViewerTourMode,
} from "../../../../store/viewer/actions";
import { useDispatch } from "react-redux";
import { TOUR_MODES } from "../../../../store/viewer/constants";

const PreviewActions: FC = () => {
  const dispatch = useDispatch();

  const close = useCallback(() => {
    dispatch(closeTourViewer());
  }, [dispatch]);

  const edit = useCallback(() => {
    dispatch(setViewerTourMode(TOUR_MODES.EDIT));
  }, [dispatch]);

  return (
    <PreviewActionsWrapper>
      <UpgradeButton />
      <Button onClick={close} skin="light">
        Close
      </Button>
      <Button onClick={edit} skin="light">
        Edit
      </Button>
    </PreviewActionsWrapper>
  );
};

export default PreviewActions;
