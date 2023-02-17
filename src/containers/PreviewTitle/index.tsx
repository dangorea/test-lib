import React, { FC, useState } from "react";
import { TitleEditBtn, TitleText, TitleViewWrapper } from "./styles";
// import { Input, Tooltip } from "wix-style-react";
import { Check, Dismiss, EditSmall } from "wix-ui-icons-common";

type Props = {
  title: string;
  changeTitle: (newTitle: string) => void;
  color?: string;
  className?: string;
};

const PreviewTitle: FC<Props> = ({
  title,
  changeTitle,
  className,
  color = "black",
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      {isEditingTitle ? (
        <div className="edit">
          {/*TODO fix here*/}
          {/*<Input*/}
          {/*  value={newTitle}*/}
          {/*  onChange={({ target: { value } }) => setNewTitle(value)}*/}
          {/*/>*/}
          <TitleEditBtn
            size="tiny"
            onClick={() => {
              changeTitle(newTitle);
              setIsEditingTitle(false);
            }}
          >
            <Check />
          </TitleEditBtn>
          <TitleEditBtn
            priority="secondary"
            size="tiny"
            onClick={() => setIsEditingTitle(false)}
          >
            <Dismiss />
          </TitleEditBtn>
        </div>
      ) : (
        <TitleViewWrapper
          className="view"
          onClick={() => {
            setIsEditingTitle(true);
            setNewTitle(title);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ display: "flex" }}>
            {title.length > 15 ? (
              // TODO fix here
              // <Tooltip content={title}>
              //   <TitleText color={color}>{trimString(title, 15)}</TitleText>
              // </Tooltip>
              <></>
            ) : (
              <TitleText color={color}>{title}</TitleText>
            )}
            {isHovered && <EditSmall color={color} />}
          </div>
        </TitleViewWrapper>
      )}
    </div>
  );
};

export default PreviewTitle;
