import React, { useState } from "react";
import PropTypes from "prop-types";
import { EditorState, RichUtils } from "draft-js";
import Bold from "../toolbarIcons/Bold";
import { ToolbarBtnWrapper } from "./styles";

type Props = {
  editorState?: EditorState;
  onChange?: (arg: EditorState) => void;
};

const BoldOption = ({ editorState, onChange }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const toggleBold = () => {
    if (editorState) {
      const newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
      if (newState) {
        onChange?.(newState);
        setActive((prevState) => !prevState);
      }
    }
  };

  return (
    <ToolbarBtnWrapper className={active ? "active" : ""} onClick={toggleBold}>
      <Bold />
    </ToolbarBtnWrapper>
  );
};

BoldOption.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  modalHandler: PropTypes.object,
  config: PropTypes.object,
  translations: PropTypes.object,
};

export default BoldOption;
