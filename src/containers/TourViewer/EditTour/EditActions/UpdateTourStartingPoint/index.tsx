import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { IconButton, Tooltip } from "wix-style-react";

import {
  getKrpanoInterface,
  getTourId,
  getViewerImageId,
} from "../../../../../store/viewer/selectors";
import { updateTourStartingPoint } from "../../../../../store/tours/actions";
import { setStartingPoint } from "../../../../../store/images/actions";

import type { Krpano } from "../../../../../utils/config";

import TourStartingPointIcon from "../TourStartingPointIcon";

import { SvgIconHover } from "./styles";
import { ActionBtn } from "../UpdateCover/styles";
import Tooltip from "../../../../../components/Tooltip";
import CoverIcon from "../CoverIcon";

const UpdateTourStartingPoint: FC = () => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const sphereId = useSelector(getViewerImageId()) as string;
  const tourId = useSelector(getTourId()) as string;

  const dispatch = useDispatch();

  const updateStartingPoint = useCallback(() => {
    dispatch(
      updateTourStartingPoint(tourId, {
        sphereId,
        fov: +krpano.get("view.fov"),
        ath: +krpano.get("view.hlookat"),
        atv: +krpano.get("view.vlookat"),
      })
    );
    dispatch(
      setStartingPoint(
        {
          sphereId,
          fov: krpano.get("view.fov"),
          ath: krpano.get("view.hlookat"),
          atv: krpano.get("view.vlookat"),
        },
        undefined,
        true
      )
    );
  }, [dispatch, krpano, sphereId, tourId]);

  return (
    <SvgIconHover>
      <ActionBtn onClick={updateStartingPoint}>
        <Tooltip
          title="Set this view as your tour's starting point."
          position="right"
          styles={{
            top: "-10px",
            left: "35px",
          }}
        >
          <TourStartingPointIcon />
        </Tooltip>
      </ActionBtn>
    </SvgIconHover>
  );
};

export default UpdateTourStartingPoint;
