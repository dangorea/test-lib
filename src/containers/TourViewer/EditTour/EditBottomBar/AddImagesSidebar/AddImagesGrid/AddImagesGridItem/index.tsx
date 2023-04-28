import React, { FC, useCallback } from "react";
import type { Image360 } from "../../../../../../../store/types";
import {
  isFullAccess,
  redirectOpenBillingPage,
} from "../../../../../../../utils/premium";
import { getPreviewSrc } from "../../../../../../../utils/image";
import PreviewItem from "../../../../../../PreviewItem/index";
import { Title, UpgradeOverlay } from "../styles";
import { DeleteBtn, LoaderWrapper, Select, ProgressBarWrapper } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTour } from "../../../../../../../store/tours/selectors";
import { getUploadProgress } from "../../../../../../../store/images/selector";
import { deleteImage } from "../../../../../../../store/images/actions";
import Checkbox from "../../../../../../../components/Checkbox";
import Loader from "../../../../../../../components/Loader";
import ProgressBar from "../../../../../../../components/ProgressBar";
import { getUserConfig } from "../../../../../../../store/config/selectors";

type Handler = (prev: string[]) => string[];

type Props = {
  image: Image360;
  selected: string[];
  setSelected: (handler: Handler) => void;
};

const AddImagesGridItem: FC<Props> = ({ image, selected, setSelected }) => {
  const spheresCount =
    (useSelector(getCurrentTour())?.spheres.length as number) ?? 0;
  const userConfig = useSelector(getUserConfig());
  const uploadProgress = useSelector(getUploadProgress(image.id));
  const isSelected = selected.includes(image.id);
  const showUpgradeOverlay =
    !isFullAccess(userConfig.id) &&
    !isSelected &&
    selected.length + spheresCount >= userConfig.sphereLimitPerTour &&
    userConfig.sphereLimitPerTour !== -1;
  const previewSrc = getPreviewSrc(image);
  const fileName = (image.title || image.name).substring(0, 10);

  const dispatch = useDispatch();

  const onDelete = useCallback(
    (e: any) => {
      e.stopPropagation();
      dispatch(
        // @ts-ignore
        deleteImage(image.id)
      );
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
            <Checkbox checked={selected.includes(image.id)} />
          </Select>
          <Title>{fileName}</Title>
        </>
      ) : (
        <>
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
          <ProgressBarWrapper>
            <ProgressBar value={uploadProgress} />
          </ProgressBarWrapper>
          <DeleteBtn onClick={onDelete} dark />
          <Title loading={!previewSrc ? "black" : "white"}>{fileName}</Title>
        </>
      )}
    </PreviewItem>
  );
};

export default AddImagesGridItem;
