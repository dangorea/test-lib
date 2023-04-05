import React, { useState } from "react";
import PropTypes from "prop-types";
import { EditorState, RichUtils } from "draft-js";
import Italic from "../toolbarIcons/Italic";
import { ToolbarBtnWrapper } from "./styles";

type Props = {
  editorState?: EditorState;
  onChange?: (arg: EditorState) => void;
};

const ItalicOption = ({ editorState, onChange }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const toggleBold = () => {
    if (editorState) {
      const newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
      if (newState) {
        onChange?.(newState);
        setActive((prevState) => !prevState);
      }
    }
  };

  return (
    <ToolbarBtnWrapper className={active ? "active" : ""} onClick={toggleBold}>
      <Italic />
    </ToolbarBtnWrapper>
  );
};

ItalicOption.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  modalHandler: PropTypes.object,
  config: PropTypes.object,
  translations: PropTypes.object,
};

export default ItalicOption;
