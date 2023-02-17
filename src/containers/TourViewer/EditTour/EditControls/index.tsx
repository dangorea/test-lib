import React, { FC, useCallback } from "react";
import { EditActionsWrapper, Button } from "./styles";
import UpgradeButton from "../../../UpgradeButton";
// import { Button } from "wix-style-react";
import { setViewerTourMode } from "../../../../store/viewer/actions";
import { TOUR_MODES } from "../../../../store/viewer/constants";
import { useDispatch } from "react-redux";

const EditControls: FC = () => {
  const dispatch = useDispatch();
  const preview = useCallback(() => {
    dispatch(setViewerTourMode(TOUR_MODES.PREVIEW));
  }, [dispatch]);
  return (
    <EditActionsWrapper>
      <UpgradeButton />
      <Button onClick={preview}>Preview</Button>
    </EditActionsWrapper>
  );
};

export default EditControls;
