import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, PopoverMenu, Tooltip } from "wix-style-react";

import {
  getKrpanoInterface,
  getTourId,
  getViewerImageId,
} from "../../../../../store/viewer/selectors";
import { updateTourCover } from "../../../../../store/tours/actions";
import { setStartingPoint } from "../../../../../store/images/actions";

import type { Krpano } from "../../../../../utils/config";

import CoverIcon from "../CoverIcon";

import { SvgIconHover } from "./styles";

const UpdateCover: FC = () => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const sphereId = useSelector(getViewerImageId()) as string;
  const tourId = useSelector(getTourId()) as string;

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
  }, [dispatch, krpano, sphereId, tourId]);

  return (
    <PopoverMenu
      triggerElement={
        <SvgIconHover>
          <IconButton skin="inverted">
            <Tooltip
              content="Click to set your tour's thumbnail and cover image"
              placement="right"
              size="small"
            >
              <CoverIcon />
            </Tooltip>
          </IconButton>
        </SvgIconHover>
      }
      placement="right"
      textSize="small"
    >
      <PopoverMenu.MenuItem
        text="Set this view as your image’s thumbnail."
        onClick={updateThumb}
      />
      <PopoverMenu.MenuItem
        text="Set this view as your tour’s cover image."
        onClick={updateCover}
      />
    </PopoverMenu>
  );
};

export default UpdateCover;
