import React, { FC } from "react";
import { AccordionContentWrapper, PreviewFPWrapper } from "./styles";
import Accordion from "./components/Accordion";
import { useSelector } from "react-redux";
import { getLevels } from "../../../../store/tours/selectors";
import { CONFIG } from "../../../../utils/config";
import Chevron from "./components/Chevron";
import ImageContainer from "../../EditTour/EditActions/AddFloorPlan/ActionModal/ImageContainer";
import { getTypeOfView } from "../../../../store/viewer/selectors";

const PreviewFloorPlan: FC = () => {
  const levels = useSelector(getLevels());
  const isWidget = useSelector(getTypeOfView());

  return (!!levels?.length && (
    <PreviewFPWrapper isWidget={isWidget}>
      <Accordion
        title={"Floor Plan"}
        icon={<Chevron width={10} fill={"#777"} />}
        content={levels.map((level) => {
          return (
            <Accordion
              key={level.id}
              title={level.title || level.name}
              isImage={true}
              // content={
              //   <AccordionContentWrapper>
              //     <ImageContainer
              //       selectedImage={{
              //         ...level,
              //         url: `${CONFIG.storageUrl}/media/${level.id}/${level.name}`,
              //       }}
              //       toggle={false}
              //       disabled
              //       savedPosition={level.links}
              //     />
              //   </AccordionContentWrapper>
              // }
            />
          );
        })}
      />
    </PreviewFPWrapper>
  )) as JSX.Element;
};

export default PreviewFloorPlan;
