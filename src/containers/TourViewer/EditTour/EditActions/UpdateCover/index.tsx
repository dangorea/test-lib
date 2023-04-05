import React, { FC, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "react-tiny-popover";
import {
  getKrpanoInterface,
  getTourId,
  getViewerImageId,
} from "../../../../../store/viewer/selectors";
import { updateTourCover } from "../../../../../store/tours/actions";
import { setStartingPoint } from "../../../../../store/images/actions";
import CoverIcon from "../CoverIcon";
import type { Krpano } from "../../../../../utils/config";
import Tooltip from "../../../../../components/Tooltip";
import {
  ActionBtn,
  PopoverBtn,
  SvgIconHover,
  UpdateCoverWrapper,
} from "./styles";

type Props = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const UpdateCover: FC<Props> = ({ open, handleOpen, handleClose }) => {
  // const [showModal, setShowModal] = useState<boolean>(false);
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const sphereId = useSelector(getViewerImageId()) as string;
  const tourId = useSelector(getTourId()) as string;
  const PopoverRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const updateThumb = useCallback(() => {
    dispatch(
      setStartingPoint({
        sphereId,
        fov: krpano.get("view.fov"),
        ath: krpano.get("view.hlookat"),
        atv: krpano.get("view.vlookat"),
      })
    );
    handleClose();
  }, [dispatch, krpano, sphereId]);

  const updateCover = useCallback(() => {
    dispatch(
      updateTourCover(tourId, {
        sphereId,
        fov: +krpano.get("view.fov"),
        ath: +krpano.get("view.hlookat"),
        atv: +krpano.get("view.vlookat"),
      })
    );
    handleClose();
  }, [dispatch, krpano, sphereId, tourId]);

  return (
    <Popover
      isOpen={open}
      onClickOutside={handleClose}
      positions={["right"]}
      content={
        <UpdateCoverWrapper ref={PopoverRef} open={open}>
          <PopoverBtn onClick={updateThumb}>
            Set this view as your image's thumbnail.
          </PopoverBtn>
          <PopoverBtn onClick={updateCover}>
            Set this view as your tour's cover image.
          </PopoverBtn>
        </UpdateCoverWrapper>
      }
      containerStyle={{
        left: "5px",
      }}
    >
      <SvgIconHover>
        <ActionBtn onClick={handleOpen}>
          <Tooltip
            title="Click to set your tour's thumbnail and cover image"
            position="right"
            styles={{
              top: "-20px",
              left: "35px",
            }}
          >
            <CoverIcon />
          </Tooltip>
        </ActionBtn>
      </SvgIconHover>
    </Popover>
  );
};

export default UpdateCover;
