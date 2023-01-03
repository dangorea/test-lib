import React, { FC, useCallback, useState } from "react";
import { Button, IconButton, Tooltip } from "wix-style-react";
import { Image, Edit } from "wix-ui-icons-common";
import { Actions, RenameWrapper, Title, TitleInput } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { closeViewer } from "../../../../store/viewer/actions";
import {
  setStartingPoint,
  updateImage,
} from "../../../../store/images/actions";
import {
  getKrpanoInterface,
  getViewerImageId,
} from "../../../../store/viewer/selectors";
import type { Krpano } from "../../../../utils/config";
import { getImageTitles } from "../../../../store/images/selector";

const ImageViewerActions: FC = () => {
  const krpano = useSelector(getKrpanoInterface()) as Krpano;
  const id = useSelector(getViewerImageId()) as string;
  const [title] = useSelector(getImageTitles([id])) as string[];
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const dispatch = useDispatch();

  const updateStartingPoint = useCallback(() => {
    dispatch(
      setStartingPoint({
        sphereId: id,
        fov: krpano.get("view.fov"),
        ath: krpano.get("view.hlookat"),
        atv: krpano.get("view.vlookat"),
      })
    );
  }, [dispatch, id, krpano]);

  const updateTitle = useCallback(() => {
    if (newTitle === title) {
      setIsEditing(false);
      return;
    }

    dispatch(updateImage(id, { title: newTitle }));
    setIsEditing(false);
  }, [dispatch, id, newTitle, title]);

  return (
    <Actions>
      <RenameWrapper
        focused={isFocused}
        onClick={() => {
          if (!isEditing) {
            setIsEditing(true);
          }
        }}
      >
        {isEditing ? (
          <>
            <TitleInput
              border={isFocused ? "round" : "bottomLine"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button onClick={updateTitle} size="small">
              Save
            </Button>
            <Button
              skin="transparent"
              size="small"
              onClick={() => {
                setIsEditing(false);
                setNewTitle(title);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Title>{title}</Title>
            <Edit />
          </>
        )}
      </RenameWrapper>
      <Tooltip content="Update thumbnail" placement="bottom" size="small">
        <IconButton onClick={updateStartingPoint} skin="inverted">
          <Image />
        </IconButton>
      </Tooltip>
      <Button
        priority="secondary"
        skin="inverted"
        onClick={() => dispatch(closeViewer())}
      >
        Done
      </Button>
    </Actions>
  );
};

export default ImageViewerActions;
