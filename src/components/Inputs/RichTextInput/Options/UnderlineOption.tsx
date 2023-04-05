import React, { useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import Underline from "../toolbarIcons/Underline";
import { ToolbarBtnWrapper } from "./styles";
import PropTypes from "prop-types";

type Props = {
  editorState?: EditorState;
  onChange?: (arg: EditorState) => void;
};

const UnderlineOption = ({ editorState, onChange }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const toggleBold = () => {
    if (editorState) {
      const newState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
      if (newState) {
        onChange?.(newState);
        setActive((prevState) => !prevState);
      }
    }
  };

  return (
    <ToolbarBtnWrapper className={active ? "active" : ""} onClick={toggleBold}>
      <Underline />
    </ToolbarBtnWrapper>
  );
};

UnderlineOption.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  modalHandler: PropTypes.object,
  config: PropTypes.object,
  translations: PropTypes.object,
};

export default UnderlineOption;
