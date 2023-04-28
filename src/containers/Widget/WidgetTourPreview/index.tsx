import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentTour,
  getCoverImageTitle,
} from "../../../store/tours/selectors";
import {
  getWidgetBorder,
  getWidgetImageTitleSettings,
  getWidgetTourTitleSettings,
} from "../../../store/widget/selectors";
import TourStartIcon from "../../../assets/icons/TourStartIcon";
import {
  ImageTitle,
  ImageTitleContainer,
  TourName,
} from "../../TourViewer/PreviewOverlay/PreviewBottomBar/styles";
import {
  WidgetPreviewOverlay,
  TitleContainer,
  WixTextButton,
  SpaceBlock,
} from "./styles";

type Props = {
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  tourId: string;
  coverUrl: string;
};

const WidgetTourPreview: FC<Props> = ({ setIsPreview, tourId, coverUrl }) => {
  const tour = useSelector(getCurrentTour());
  const coverImageTitle = useSelector(getCoverImageTitle());
  const borderStyle = useSelector(getWidgetBorder());
  const widgetTourName = useSelector(getWidgetTourTitleSettings());
  const widgetImageName = useSelector(getWidgetImageTitleSettings());

  return (
    <WidgetPreviewOverlay
      borderStyle={borderStyle}
      tourId={tourId}
      onClick={() => setIsPreview(false)}
      coverUrl={coverUrl}
    >
      <SpaceBlock />
      <WixTextButton>
        <TourStartIcon />
      </WixTextButton>
      <div>
        <ImageTitleContainer>
          {widgetImageName.spt && (
            <ImageTitle {...widgetImageName}>{coverImageTitle}</ImageTitle>
          )}
        </ImageTitleContainer>
        <TitleContainer>
          {widgetTourName.showTitle && (
            <TourName {...widgetTourName}>{tour?.title}</TourName>
          )}
        </TitleContainer>
      </div>
    </WidgetPreviewOverlay>
  );
};

export default WidgetTourPreview;
