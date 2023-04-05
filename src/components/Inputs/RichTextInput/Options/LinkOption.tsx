import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  AddBtn,
  BtnWrapper,
  CancelBtn,
  LayoutWrapper,
  LinkInput,
  LinkInputWrapper,
  ToolbarBtnWrapper,
} from "./styles";
import Link from "../toolbarIcons/Link";
import Dismiss from "images/dismiss";
import Confirm from "images/confirm";

const LinkOption = (props: {
  onChange: any;
  expanded: boolean;
  onExpandEvent: any;
  doCollapse: () => void;
}) => {
  const { onChange, expanded, onExpandEvent, doCollapse } = props;
  const [linkTarget, setLinkTarget] = useState<string>("");
  const [linkTitle, setLinkTitle] = useState<string>("");
  const urlPattern =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[A-Z, a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  const [validInfo, setValidInfo] = useState<boolean>(false);

  useEffect(() => {
    if (linkTitle && linkTarget.match(urlPattern)) {
      setValidInfo(false);
    } else {
      setValidInfo(true);
    }
  }, [linkTitle, linkTarget]);

  const stopPropagation = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const addLink = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (expanded && !validInfo) {
      onChange("link", linkTitle, linkTarget, "_blank");
      setLinkTitle("");
      setLinkTarget("");
    }
  };

  const closeModal = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLinkTitle("");
    setLinkTarget("");
    doCollapse();
  };

  const renderModal = () => (
    <LayoutWrapper onClick={stopPropagation}>
      <LinkInputWrapper>
        <LinkInput
          id="linkTitle"
          name="linkTitle"
          placeholder="Text to display"
          value={linkTitle}
          onChange={(e) => setLinkTitle(e.target.value)}
        />
      </LinkInputWrapper>
      <LinkInputWrapper>
        <LinkInput
          id="linkTarget"
          name="linkTarget"
          placeholder="URL this link should go"
          value={linkTarget}
          onChange={(e) => setLinkTarget(e.target.value)}
        />
      </LinkInputWrapper>
      <BtnWrapper>
        <CancelBtn onClick={closeModal}>
          <Dismiss />
        </CancelBtn>
        <AddBtn onClick={addLink} disabled={validInfo}>
          <Confirm />
        </AddBtn>
      </BtnWrapper>
    </LayoutWrapper>
  );

  return (
    <ToolbarBtnWrapper
      className={`linkOption ${expanded ? "active" : ""}`}
      aria-haspopup="true"
      aria-expanded={expanded}
      onClick={onExpandEvent}
    >
      <Link />
      {expanded ? renderModal() : undefined}
    </ToolbarBtnWrapper>
  );
};

LinkOption.propTypes = {
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  modalHandler: PropTypes.object,
  config: PropTypes.object,
  translations: PropTypes.object,
};

export default LinkOption;
