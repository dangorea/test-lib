import React, { FC, useEffect, useState } from "react";
import { useField } from "formik";
import { Label, RequiredField } from "../FormField/styles";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { RichEditorWrapper } from "./styles";
import BoldOption from "./Options/BoldOption";
import ItalicOption from "./Options/ItalicOption";
import UnderlineOption from "./Options/UnderlineOption";
import LinkOption from "./Options/LinkOption";
import UnorderedOption from "./Options/UnorderedOption";
import OrderedOption from "./Options/OrderedOption";

type Props = {
  label: string;
  name: string;
  placeholder: string;
  setValueCondition?: boolean;
  newValue: any;
  required?: boolean;
};

// Reset default Toolbar components
const ToolbarConfig = {
  options: ["link"],
  inline: {},
  link: {
    inDropdown: false,
    className: undefined,
    component: LinkOption,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: false,
    defaultTargetOption: "_blank",
    options: ["link"],
    link: { className: undefined },
    linkCallback: undefined,
  },
  list: {},
};

const RichTextInput: FC<Props> = ({
  label,
  name,
  placeholder,
  setValueCondition,
  newValue,
  required = false,
}) => {
  const [field, _meta, helpers] = useField(name);
  const [initialContentLoaded, setInitialContentLoaded] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (newValue === field.value) {
      setInitialContentLoaded(true);
    }
  }, [field.value]);

  useEffect(() => {
    if (field.value && initialContentLoaded) {
      setEditorState(EditorState.createWithContent(stateFromHTML(field.value)));
      setInitialContentLoaded(false);
    } else if (!field.value) {
      setEditorState(EditorState.createWithContent(stateFromHTML(`<p></p>`)));
    }
  }, [field.value, initialContentLoaded, newValue, setValueCondition]);

  const onEditorStateChange = function (editorState: EditorState) {
    setEditorState(editorState);
    helpers.setValue(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <RichEditorWrapper>
      <Label id={name}>
        <span>{label}</span>
        {required && <RequiredField>*</RequiredField>}
      </Label>
      <Editor
        editorState={editorState}
        wrapperClassName="wrapperClassName"
        toolbarClassName="toolbarClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        placeholder={placeholder}
        toolbarCustomButtons={[
          <BoldOption />,
          <ItalicOption />,
          <UnderlineOption />,
          <UnorderedOption />,
          <OrderedOption />,
        ]}
        toolbar={ToolbarConfig}
      />
    </RichEditorWrapper>
  );
};

export default RichTextInput;
