import React, { FC, useEffect, useState } from "react";
import Actionbar from "./Actionbar";
import { Page } from "./styles";
import { requestMyImages } from "../../store/images/actions";
import { useDispatch, useSelector } from "react-redux";
import ImageGrid from "./ImageGrid";
import {
  getImagesMetadata,
  getIsImagesLoading,
  getMyImages,
} from "../../store/images/selector";
import { requestMyTours } from "../../store/tours/actions";
import { isPremium } from "../../utils/premium";
import Pagination from "../../components/Pagination";
import PageLoader from "../../components/PageLoader/index";
import { getTourId, getViewerImageId } from "../../store/viewer/selectors";
import ImageViewer from "./ImageViewer";
import TourViewer from "../TourViewer";
import { CONFIG } from "../../utils/config";
import useOpen from "../../utils/hooks/useOpen";

const MyImages: FC = () => {
  const dispatch = useDispatch();
  const images = useSelector(getMyImages());
  const imagesMeta = useSelector(getImagesMetadata());
  const isLoading = useSelector(getIsImagesLoading());
  const viewerImageId = useSelector(getViewerImageId());
  const tourId = useSelector(getTourId());

  const [selected, setSelected] = useState<string[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const { open, handleClose, handleOpen } = useOpen();
  const selectedCount = selected.length;

  useEffect(() => {
    if (!isPremium(CONFIG.subscriptionPlan.id)) {
      dispatch(requestMyTours());
    }
  }, [dispatch]);

  return (
    <>
      {/*// @ts-ignore*/}
      <Page minWidth={300}>
        <Page.Header
          title="My 360° Images"
          actionsBar={
            <Actionbar
              images={images}
              selected={selected}
              setDeletedIds={setDeletedIds}
              handleOpen={handleOpen}
              selectedCount={selectedCount}
              setSelected={setSelected}
            />
          }
        />
        <Page.Content>
          {isLoading && !images.length ? (
            <PageLoader />
          ) : (
            <ImageGrid
              images={images}
              selected={selected}
              setSelected={setSelected}
              deletedIds={deletedIds}
              setDeletedIds={setDeletedIds}
              open={open}
              handleClose={handleClose}
              handleOpen={handleOpen}
              selectedCount={selectedCount}
            />
          )}
          <Pagination requestHandler={requestMyImages} metadata={imagesMeta} />
        </Page.Content>
      </Page>
      {tourId && <TourViewer id={tourId} />}
      {viewerImageId && !tourId && <ImageViewer id={viewerImageId} />}
    </>
  );
};

export default MyImages;
