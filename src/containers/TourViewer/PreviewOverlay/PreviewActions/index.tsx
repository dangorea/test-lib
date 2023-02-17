import React, { FC, useCallback } from "react";
import { Button, PreviewActionsWrapper } from "./styles";
import UpgradeButton from "../../../UpgradeButton/index";
// import { Button } from "wix-style-react";
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
    // window.location.replace("/dashboard/mytours"); /*Dumb way to resolve the issue*/
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
