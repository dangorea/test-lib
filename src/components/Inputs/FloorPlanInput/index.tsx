import React, { ChangeEvent, FC, useEffect, useRef } from "react";
import { useField } from "formik";
import { FileInput, UploadBtn, SaveBtn, BtnsWrapper } from "./styles";
import DownloadIcon from "../../../assets/icons/downloadIcon";
import { useSelector } from "react-redux";
import { getLevels } from "../../../store/tours/selectors";
import ImageCarousel from "../../../components/ImageCarousel";
import saveIcon from "../../../assets/icons/saveIcon.svg";

type Props = {
  name: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: /*(title: string, imageId: string) => void;*/ () => void;
};

const FloorPlanInput: FC<Props> = ({ name, handleChange, handleSubmit }) => {
  const [field, _meta, helpers] = useField(name);
  const [_titleField, _titleMeta, titleHelpers] = useField("title");
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const level = useSelector(getLevels());

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  useEffect(() => {
    titleHelpers.setValue(field.value?.title || field.value?.name);
  }, [field.value]);

  return (
    <>
      <ImageCarousel
        selectedImage={field.value}
        setSelectedImage={helpers.setValue}
        setLabel={titleHelpers.setValue}
      />
      <BtnsWrapper>
        <UploadBtn type="button" onClick={handleClick}>
          <DownloadIcon />
          <span>Upload</span>
          <FileInput
            ref={hiddenFileInput}
            type="file"
            accept=".jpeg,.jpg,.png"
            onChange={handleChange}
            multiple={false}
          />
        </UploadBtn>
        {level.length ? (
          <SaveBtn type="button" onClick={handleSubmit}>
            {/*{uploadAction ? (*/}
            {/*  // <Loader size="small" />*/}
            {/*  <>Loading</>*/}
            {/*// ) : (*/}
            {/*//   <>*/}
            <img src={saveIcon} alt="" />
            <span>Save</span>
            {/*  // </>*/}
            {/*// )}*/}
          </SaveBtn>
        ) : null}
      </BtnsWrapper>
    </>
  );
};

export default FloorPlanInput;
