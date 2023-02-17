import React, { useState, useRef, FC } from 'react';
import {
  AccordionContent,
  AccordionIcon,
  AccordionWrap,
  AccordionSection,
  AccordionTitle,
} from './styles';

type Props = {
  title: string;
  content: any;
  icon?: any;
  isImage?: boolean;
};

const Accordion: FC<Props> = ({ title, content, icon, isImage }) => {
  const [setActive, setActiveState] = useState<string>('');
  const [setHeight, setHeightState] = useState<string>('0px');
  const [setRotate, setRotateState] = useState<string>('accordion__icon');
  const selectedContent = useRef<any>(null);

  return (
    <AccordionSection>
      <AccordionWrap
        className={`${setActive}`}
        onClick={() => {
          setActiveState(setActive === '' ? 'active' : '');
          setHeightState(setActive === 'active' ? '0px' : `550px`);
          setRotateState(
            setActive === 'active'
              ? 'accordion__icon'
              : 'accordion__icon rotate'
          );
        }}
      >
        <AccordionTitle isImage={isImage} className={`${setActive}`}>
          {title}
        </AccordionTitle>
        <AccordionIcon className={`${setRotate}`}>{icon}</AccordionIcon>
      </AccordionWrap>
      <AccordionContent
        isImage={isImage}
        ref={selectedContent}
        style={{ maxHeight: `${setHeight}` }}
      >
        {content}
      </AccordionContent>
    </AccordionSection>
  );
};

export default Accordion;
