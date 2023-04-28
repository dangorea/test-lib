import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import {
  AddSelectedBtn,
  CancelBtn,
  CloseBtn,
  SelectedCount,
  SidebarActions,
  SidebarActionsWrapper,
  SidebarWrapper,
} from "./styles";
import { Dismiss } from "wix-ui-icons-common";
import AddImagesGrid from "./AddImagesGrid";
import { useDispatch, useSelector } from "react-redux";
import { manageSpheres } from "../../../../../store/tours/actions";
import { getKrpanoInterface } from "../../../../../store/viewer/selectors";
import { TOUR_ACTIONS } from "../../../../../store/tours/constants";
import type { Krpano } from "../../../../../utils/config";
import { generateInitialTourXml } from "../../../../../utils/xml";
import UploadDrawer from "../../../../../components/UploadDrawer";
import { getCurrentTourId } from "../../../../../store/tours/selectors";

type Props = {
  open: boolean;
  handleClose: () => void;
  isFromEditBar?: boolean;
  selectedIds?: string[];
  setIds?: Dispatch<SetStateAction<string[]>>;
  setSelectedIds?: Dispatch<SetStateAction<string[]>>;
};

const AddImagesSidebar: FC<Props> = ({
  open,
  handleClose,
  isFromEditBar = false,
  setIds,
  selectedIds,
  setSelectedIds,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedIds ?? []);
  const tourId = useSelector(getCurrentTourId()) as string;
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const dispatch = useDispatch();

  const setSelectedFiles = useCallback(() => {
    setIds?.(selected);
    setSelectedIds?.(selected);
    handleClose();
  }, [handleClose, selected, setIds, setSelectedIds]);

  const addSelected = useCallback(() => {
    dispatch(
      // @ts-ignore
      manageSpheres(tourId, selected, TOUR_ACTIONS.ADD, (updatedTour) => {
        setSelected([]);
        krpano.call(`loadxml(${generateInitialTourXml(updatedTour)})`);
        handleClose();
      })
    );
  }, [dispatch, handleClose, krpano, selected, tourId]);

  return (
    <SidebarWrapper open={open}>
      <CloseBtn onClick={handleClose}>
        <Dismiss />
      </CloseBtn>
      <SidebarActions>
        <CancelBtn onClick={handleClose}>Cancel</CancelBtn>
        <AddSelectedBtn
          onClick={isFromEditBar ? addSelected : setSelectedFiles}
          disabled={!selected.length}
        >
          {isFromEditBar ? "Add Selected" : "Select"}
          {!!selected.length && (
            <SelectedCount>{selected.length}</SelectedCount>
          )}
        </AddSelectedBtn>
      </SidebarActions>
      <AddImagesGrid selected={selected} setSelected={setSelected} />
      <SidebarActionsWrapper>
        {isFromEditBar && <UploadDrawer btnText="Upload More" />}
      </SidebarActionsWrapper>
    </SidebarWrapper>
  );
};

export default AddImagesSidebar;
