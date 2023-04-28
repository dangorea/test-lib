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
import { PROJECT } from "../../../../utils/config";
import AddFloorPlan from "./AddFloorPlan";
import AddFloorPlanPremiumBtn from "./AddFloorPlanPremiumBtn";
import AddFlatImage from "./AddFlatImage";
import { getSource, getUserConfig } from "../../../../store/config/selectors";
import EmbedTour from "./EmbedTour";

const EditActions: FC = () => {
  const [toggleAnimation, setToggleAnimation] = useState(true);
  const tourMode = useSelector(getViewerTourMode());
  const nodeRef = useRef(null);
  const source = useSelector(getSource());
  const userConfig = useSelector(getUserConfig());

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

  const {
    open: openEmbed,
    handleOpen: handleOpenEmbed,
    handleClose: handleCloseEmbed,
  } = useOpen();

  useEffect(() => {
    if (tourMode === TOUR_MODES.PREVIEW) {
      setToggleAnimation(false);
    }
  }, [toggleAnimation, tourMode]);

  return (
    <CSSTransition
      in={toggleAnimation}
      timeout={200}
      appear
      classNames="my-node"
      nodeRef={nodeRef}
    >
      <EditActionsWrapper ref={nodeRef}>
        {/*{source === PROJECT.WIX &&*/}
        {/*  (userConfig.features.includes("ECOMMERCE") ? (*/}
        {/*    <AddProducts*/}
        {/*      open={openProducts}*/}
        {/*      handleOpen={() => {*/}
        {/*        handleHotClose();*/}
        {/*        handleCloseLink();*/}
        {/*        handleCloseInfo();*/}
        {/*        handleCloseFlat();*/}
        {/*        handleCloseFloorPlan();*/}
        {/*        handleCloseUpdateCover();*/}
        {/*        handleCloseEmbed();*/}
        {/*        handleOpenProducts();*/}
        {/*      }}*/}
        {/*      handleClose={handleCloseProducts}*/}
        {/*    />*/}
        {/*  ) : (*/}
        {/*    <AddProductsPremiumBtn />*/}
        {/*  ))}*/}
        <AddHotspot
          open={openHot}
          handleOpen={() => {
            handleCloseLink();
            handleCloseInfo();
            handleCloseProducts();
            handleCloseFlat();
            handleCloseFloorPlan();
            handleCloseUpdateCover();
            handleCloseEmbed();
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
            handleCloseEmbed();
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
            handleCloseEmbed();
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
            handleCloseEmbed();
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
            handleCloseEmbed();
            handleOpenUpdateCover();
          }}
          handleClose={handleCloseUpdateCover}
        />
        <UpdateTourStartingPoint />
        {source === PROJECT.WIX &&
          (userConfig.features.includes("FLOOR_PLAN") ? (
            <AddFloorPlan
              open={openFloorPlan}
              handleOpen={() => {
                handleCloseInfo();
                handleHotClose();
                handleCloseProducts();
                handleCloseFlat();
                handleCloseUpdateCover();
                handleCloseEmbed();
                handleOpenFloorPlan();
              }}
              handleClose={handleCloseFloorPlan}
            />
          ) : (
            <AddFloorPlanPremiumBtn />
          ))}
        {source === PROJECT.VIAR_LIVE && (
          <EmbedTour
            open={openEmbed}
            handleOpen={() => {
              handleCloseInfo();
              handleHotClose();
              handleCloseProducts();
              handleCloseFlat();
              handleCloseUpdateCover();
              handleCloseFloorPlan();
              handleOpenEmbed();
            }}
            handleClose={handleCloseEmbed}
          />
        )}
      </EditActionsWrapper>
    </CSSTransition>
  );
};

export default EditActions;
