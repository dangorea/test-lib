import React, { useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import { ToolbarBtnWrapper } from "./styles";
import Ordered from "../toolbarIcons/Ordered";
import PropTypes from "prop-types";

type Props = {
  editorState?: EditorState;
  onChange?: (arg: EditorState) => void;
};

const OrderedOption = ({ editorState, onChange }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const toggleBold = () => {
    if (editorState) {
      const newState = RichUtils.toggleBlockType(
        editorState,
        "ordered-list-item"
      );
      if (newState) {
        onChange?.(newState);
        setActive((prevState) => !prevState);
      }
    }
  };

  return (
    <ToolbarBtnWrapper
      className={`ordered ${active ? "active" : ""}`}
      onClick={toggleBold}
    >
      <Ordered />
    </ToolbarBtnWrapper>
  );
};

OrderedOption.propTypes = {
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  modalHandler: PropTypes.object,
  config: PropTypes.object,
  translations: PropTypes.object,
};

export default OrderedOption;
