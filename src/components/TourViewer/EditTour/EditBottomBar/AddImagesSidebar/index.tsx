import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import {
  CloseBtn,
  SelectedCount,
  SidebarActions,
  SidebarActionsWrapper,
  SidebarWrapper,
} from "./styles";
import { Dismiss } from "wix-ui-icons-common";
import { Button } from "wix-style-react";
import AddImagesGrid from "./AddImagesGrid";
import { useDispatch, useSelector } from "react-redux";
import {
  manageSpheres,
  requestFullTour,
} from "../../../../../store/tours/actions";
import {
  getKrpanoInterface,
  getTourId,
} from "../../../../../store/viewer/selectors";
import { TOUR_ACTIONS } from "../../../../../store/tours/constants";
import type { Krpano } from "../../../../../utils/config";
import { generateInitialTourXml } from "../../../../../utils/xml";
import UploadDrawer from "../../../../MyImages/Actionbar/UploadDrawer";

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
  const tourId = useSelector(getTourId()) as string;
  const krpano = useSelector(getKrpanoInterface()) as Krpano;

  const dispatch = useDispatch();

  const setSelectedFiles = useCallback(() => {
    setIds?.(selected);
    setSelectedIds?.(selected);
    handleClose();
  }, [handleClose, selected, setIds, setSelectedIds]);

  const addSelected = useCallback(() => {
    dispatch(
      manageSpheres(tourId, selected, TOUR_ACTIONS.ADD, (updatedTour) => {
        setSelected([]);
        //TODO need to change update-state logic in [MANAGE_SPHERES_SUCCESS] to avoid this request
        dispatch(requestFullTour(updatedTour.id));
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
        <Button skin="inverted" onClick={handleClose}>
          Cancel
        </Button>

        <Button
          style={{ color: !selected.length ? "#a49fa3" : "" }}
          onClick={isFromEditBar ? addSelected : setSelectedFiles}
          disabled={!selected.length}
          skin={!selected.length ? "premium-light" : "standard"}
        >
          {isFromEditBar ? "Add Selected" : "Select"}
          {!!selected.length && (
            <SelectedCount>{selected.length}</SelectedCount>
          )}
        </Button>
      </SidebarActions>
      <AddImagesGrid selected={selected} setSelected={setSelected} />
      <SidebarActionsWrapper>
        {isFromEditBar ? (
          <UploadDrawer btnText="Upload More" btnProps={{ fullWidth: true }} />
        ) : (
          ""
        )}
      </SidebarActionsWrapper>
    </SidebarWrapper>
  );
};

export default AddImagesSidebar;
