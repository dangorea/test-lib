import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { TitleInput } from "./styles";
import { updateImage } from "../../../../../../store/images/actions";
import { useDispatch } from "react-redux";

type Props = {
  currentTitle: string;
  imageId: string;
  setIsEditingTitle: (val: boolean) => void;
};

const ImageTitleInput: FC<Props> = ({
  currentTitle,
  imageId,
  setIsEditingTitle,
}) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const updateTitle = useCallback(() => {
    if (newTitle === currentTitle) {
      setIsEditingTitle(false);
      return;
    }

    dispatch(
      updateImage(imageId, { title: newTitle }, () => setIsEditingTitle(false))
    );
  }, [currentTitle, dispatch, imageId, newTitle, setIsEditingTitle]);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <TitleInput
      ref={inputRef}
      value={newTitle}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => setNewTitle(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          updateTitle();
        }
        if (e.key === "Escape") {
          setIsEditingTitle(false);
          setNewTitle(currentTitle);
        }
      }}
    />
  );
};

export default ImageTitleInput;
