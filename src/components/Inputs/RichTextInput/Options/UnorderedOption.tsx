import React, { useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import { ToolbarBtnWrapper } from "./styles";
import Unordered from "../toolbarIcons/Unordered";
import PropTypes from "prop-types";

type Props = {
  editorState?: EditorState;
  onChange?: (arg: EditorState) => void;
};

const UnorderedOption = ({ editorState, onChange }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const toggleUnordered = () => {
    if (editorState) {
      const newState = RichUtils.toggleBlockType(
        editorState,
        "unordered-list-item"
      );
      if (newState) {
        onChange?.(newState);
        setActive((prevState) => !prevState);
      }
    }
  };

  return (
    <ToolbarBtnWrapper
      className={`unordered ${active ? "active" : ""}`}
      onClick={toggleUnordered}
    >
      <Unordered />
    </ToolbarBtnWrapper>
  );
};

UnorderedOption.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  modalHandler: PropTypes.object,
  config: PropTypes.object,
  translations: PropTypes.object,
};

export default UnorderedOption;
