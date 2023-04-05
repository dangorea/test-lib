import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { getViewerTourMode } from "../../../../store/viewer/selectors";
import { TOUR_MODES } from "../../../../store/viewer/constants";

import useOpen from "../../../../utils/hooks/useOpen";

import AddInfospot from "./AddInfospot";
import AddHotspot from "./AddHotspot";
import AddLink from "./AddLink";
import UpdateTourStartingPoint from "./UpdateTourStartingPoint";
import UpdateCover from "./UpdateCover";

import { EditActionsWrapper } from "./styles";
import AddProducts from "./AddProducts";
import AddProductsPremiumBtn from "./AddProductsPremiumBtn";
import { CONFIG } from "../../../../utils/config";
import AddFloorPlan from "./AddFloorPlan";
import AddFloorPlanPremiumBtn from "./AddFloorPlanPremiumBtn";
import AddFlatImage from "./AddFlatImage";

const EditActions: FC = () => {
  const [toggleAnimation, setToggleAnimation] = useState(true);
  const tourMode = useSelector(getViewerTourMode());

  const {
    open: openProducts,
    handleOpen: handleOpenProducts,
    handleClose: handleCloseProducts,
  } = useOpen();

  const {
    open: openHot,
    handleOpen: handleOpenHot,
    handleClose: handleHotClose,
  } = useOpen();

  const {
    open: openInfo,
    handleOpen: handleOpenInfo,
    handleClose: handleCloseInfo,
  } = useOpen();

  const {
    open: openLink,
    handleOpen: handleOpenLink,
    handleClose: handleCloseLink,
  } = useOpen();

  const {
    open: openFlat,
    handleOpen: handleOpenFlat,
    handleClose: handleCloseFlat,
  } = useOpen();

  const {
    open: openFloorPlan,
    handleOpen: handleOpenFloorPlan,
    handleClose: handleCloseFloorPlan,
  } = useOpen();

  const {
    open: openUpdateCover,
    handleOpen: handleOpenUpdateCover,
    handleClose: handleCloseUpdateCover,
  } = useOpen();

  useEffect(() => {
    if (tourMode === TOUR_MODES.PREVIEW) {
      setToggleAnimation(false);
    }
  }, [toggleAnimation, tourMode]);
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={toggleAnimation}
      timeout={200}
      appear
      classNames="my-node"
      nodeRef={nodeRef}
    >
      <EditActionsWrapper ref={nodeRef}>
        {CONFIG.subscriptionPlan.features.includes("ECOMMERCE") ? (
          <AddProducts
            open={openProducts}
            handleOpen={() => {
              handleHotClose();
              handleCloseLink();
              handleCloseInfo();
              handleCloseFlat();
              handleCloseFloorPlan();
              handleCloseUpdateCover();
              handleOpenProducts();
            }}
            handleClose={handleCloseProducts}
          />
        ) : (
          <AddProductsPremiumBtn />
        )}
        <AddHotspot
          open={openHot}
          handleOpen={() => {
            handleCloseLink();
            handleCloseInfo();
            handleCloseProducts();
            handleCloseFlat();
            handleCloseFloorPlan();
            handleCloseUpdateCover();
            handleOpenHot();
          }}
          handleClose={handleHotClose}
        />
        <AddFlatImage
          open={openFlat}
          handleOpen={() => {
            handleCloseLink();
            handleCloseInfo();
            handleCloseProducts();
            handleHotClose();
            handleCloseFloorPlan();
            handleCloseUpdateCover();
            handleOpenFlat();
          }}
          handleClose={handleCloseFlat}
        />
        <AddInfospot
          open={openInfo}
          handleOpen={() => {
            handleCloseLink();
            handleHotClose();
            handleCloseProducts();
            handleCloseFlat();
            handleCloseFloorPlan();
            handleCloseUpdateCover();
            handleOpenInfo();
          }}
          handleClose={handleCloseInfo}
        />
        <AddLink
          open={openLink}
          handleOpen={() => {
            handleCloseInfo();
            handleHotClose();
            handleCloseProducts();
            handleCloseFloorPlan();
            handleCloseFlat();
            handleCloseUpdateCover();
            handleOpenLink();
          }}
          handleClose={handleCloseLink}
        />
        <UpdateCover
          open={openUpdateCover}
          handleOpen={() => {
            handleCloseInfo();
            handleHotClose();
            handleCloseProducts();
            handleCloseFloorPlan();
            handleCloseFlat();
            handleCloseLink();
            handleOpenUpdateCover();
          }}
          handleClose={handleCloseUpdateCover}
        />
        <UpdateTourStartingPoint />
        {CONFIG.subscriptionPlan.features.includes("FLOOR_PLAN") ? (
          <AddFloorPlan
            open={openFloorPlan}
            handleOpen={() => {
              handleCloseInfo();
              handleHotClose();
              handleCloseProducts();
              handleCloseFlat();
              handleCloseUpdateCover();
              handleOpenFloorPlan();
            }}
            handleClose={handleCloseFloorPlan}
          />
        ) : (
          <AddFloorPlanPremiumBtn />
        )}
      </EditActionsWrapper>
    </CSSTransition>
  );
};

export default EditActions;
