import React, { FC, useCallback } from "react";
import type { Image360 } from "../../../../../../../store/types";
import {
  isFullAccess,
  redirectOpenBillingPage,
} from "../../../../../../../utils/premium";
import { CONFIG } from "../../../../../../../utils/config";
import { getPreviewSrc } from "../../../../../../../utils/image";
import PreviewItem from "../../../../../../../components/PreviewItem/index";
import { Title, UpgradeOverlay } from "../styles";
import {
  DeleteBtn,
  LoaderWrapper,
  ProgressBarWrapper,
  Select,
} from "../../../../../../MyImages/ImageGrid/ImageItem/styles";
import { Checkbox, LinearProgressBar, Loader } from "wix-style-react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTour } from "../../../../../../../store/tours/selectors";
import { getUploadProgress } from "../../../../../../../store/images/selector";
import { deleteImage } from "../../../../../../../store/images/actions";

type Handler = (prev: string[]) => string[];

type Props = {
  image: Image360;
  selected: string[];
  setSelected: (handler: Handler) => void;
};

const AddImagesGridItem: FC<Props> = ({ image, selected, setSelected }) => {
  const spheresCount =
    (useSelector(getCurrentTour())?.spheres.length as number) ?? 0;
  const uploadProgress = useSelector(getUploadProgress(image.id));

  const isSelected = selected.includes(image.id);
  const showUpgradeOverlay =
    !isFullAccess(CONFIG.subscriptionPlan.id) &&
    !isSelected &&
    selected.length + spheresCount >=
      CONFIG.subscriptionPlan.sphereLimitPerTour &&
    CONFIG.subscriptionPlan.sphereLimitPerTour !== -1;
  const previewSrc = getPreviewSrc(image);

  const dispatch = useDispatch();

  const onDelete = useCallback(
    (e: any) => {
      e.stopPropagation();
      dispatch(deleteImage(image.id));
      setSelected((selected) => selected.filter((id) => id !== image.id));
    },
    [dispatch, image.id, setSelected]
  );

  return (
    <PreviewItem
      key={image.id}
      src={previewSrc}
      isLoading={!previewSrc}
      isSelected={isSelected}
      withoutLaunchIcon
      onClick={() => {
        setSelected((selected) =>
          isSelected
            ? selected.filter((id) => id !== image.id)
            : [...selected, image.id]
        );
      }}
    >
      {showUpgradeOverlay && (
        <UpgradeOverlay
          onClick={(e) => {
            e.stopPropagation();
            redirectOpenBillingPage();
          }}
        >
          Upgrade to Premium
        </UpgradeOverlay>
      )}
      {previewSrc ? (
        <>
          <Select>
            <Checkbox checked={selected.includes(image.id)} size="medium" />
          </Select>
          <Title>{image.title || image.name}</Title>
        </>
      ) : (
        <>
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
          <ProgressBarWrapper>
            <LinearProgressBar value={uploadProgress} />
          </ProgressBarWrapper>
          <DeleteBtn onClick={onDelete} dark />
          <Title loading={!previewSrc}>{image.title || image.name}</Title>
        </>
      )}
    </PreviewItem>
  );
};

export default AddImagesGridItem;
