import {
  ImageInput,
  ImageTitleLabel,
  InputContainer,
  InputWrapper,
} from "./styles";
import React, { FC, useCallback, useEffect, useState } from "react";
import { FileUpload, Loader } from "wix-style-react";
import {
  BottomBtnsWrapper,
  SaveBtn,
  UploadBtn,
} from "../../TourViewer/EditTour/EditActions/AddFloorPlan/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addFloorPlanDotsToLink,
  addFloorPlanLevel,
  updateFloorPlanLevel,
} from "../../../store/tours/actions";
import { getTourId } from "../../../store/viewer/selectors";
import { errorNotification } from "../../../store/notifications/actions";
// import downloadIcon from "../../../assets/icons/downloadIcon.svg";
// import saveIcon from "../../../assets/icons/saveIcon.svg";
import ImageContainer from "../../TourViewer/EditTour/EditActions/AddFloorPlan/ActionModal/ImageContainer";
// import ImageIcon from "../../../assets/icons/img-icon.svg";
import type { Level, Link } from "../../../store/types";
import ImageCarousel from "./components/index";
import { CONFIG } from "../../../utils/config";
import CheckboxButton from "../../TourViewer/EditTour/EditActions/AddFloorPlan/components/CheckboxBtn";
import { getLevels } from "../../../store/tours/selectors";
import { v4 as uuid } from "uuid";

type Props = {
  open: boolean;
  uploadedImage: FileList | Level[] | null;
  setUploadedImage: React.Dispatch<
    React.SetStateAction<FileList | Level[] | null>
  >;
};

const FloorPlanInput: FC<Props> = ({
  open,
  uploadedImage,
  setUploadedImage,
}) => {
  const tourId = useSelector(getTourId()) as string;
  const [selectedImage, setSelectedImage] = useState<File | Level | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [savedPosition, setSavedPosition] = useState<Link[]>([]);
  const [uploadAction, setUploadAction] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<{
    title: string;
    edited: boolean;
  }>();

  const levels = useSelector(getLevels());
  const dispatch = useDispatch();

  const uploadFiles = useCallback(
    async (files: FileList, title: string) => {
      await Promise.all(
        Array.from(files).map(async (file) => {
          if ("url" in file) {
            return;
          }

          const isImage =
            file.type === "image/png" ||
            file.type === "image/jpeg" ||
            file.type === "image/jpg";

          if (!isImage) {
            dispatch(errorNotification("File type should be JPG, PNG"));
            return;
          }

          if (!title) {
            dispatch(errorNotification("Image title required"));
            return;
          }
          setUploadAction(true);
          await dispatch(
            addFloorPlanLevel(
              tourId,
              file,
              title,
              setUploadedImage,
              setUploadAction
            )
          );
        })
      );
    },
    [dispatch]
  );

  const saveDots = useCallback(
    async (data: Array<Link>, selected: Level) => {
      for (const dot of Array.from(data)) {
        if (!selected.hasOwnProperty("id")) {
          dispatch(errorNotification("Save image first"));
          return;
        }

        if (!dot.toUpload) {
          continue;
        }

        setUploadAction(true);

        await dispatch(
          addFloorPlanDotsToLink(tourId, selected, dot, setUploadAction)
        );
      }
    },
    [dispatch]
  );

  const modifyTitle = (
    newTitle: { title: string; edited: boolean },
    selectedImageId: string
  ) => {
    if (newTitle.edited) {
      setUploadAction(true);
      dispatch(
        updateFloorPlanLevel(
          tourId,
          selectedImageId,
          newTitle.title,
          setUploadAction
        )
      );
    }
  };

  useEffect(() => {
    if (!!uploadedImage?.length && !uploadAction) {
      setSelectedImage(uploadedImage[0]);
    } else if (!!uploadedImage?.length && uploadAction) {
      setSelectedImage(uploadedImage[uploadedImage.length - 1]);
      setUploadAction(false);
    } else {
      setSelectedImage(null);
      setSavedPosition([]);
      setTitleInput({ title: "", edited: false });
    }
  }, [dispatch, uploadedImage, open]);

  useEffect(() => {
    levels &&
      setUploadedImage(
        levels?.map((level) => ({
          ...level,
          url: `${CONFIG.storageUrl}/media/${level.id}/${level.name}`,
        }))
      );
  }, [open, levels]);

  useEffect(() => {
    const selected: Level = selectedImage as Level;
    const fetchedData = uploadedImage as Array<Level>;
    if (fetchedData) {
      for (const data of Array.from(fetchedData)) {
        if (data.id === selected?.id) {
          if (data?.title) {
            setTitleInput({ title: data?.title, edited: false });
          } else {
            setTitleInput({ title: "", edited: false });
          }
          if (data.links?.length) {
            setSavedPosition(data?.links);
          } else {
            setSavedPosition([]);
          }
        }
      }
    } else {
      setTitleInput({ title: "", edited: false });
      setSavedPosition([]);
    }
  }, [selectedImage]);

  if (!open) {
    return null;
  }

  return (
    <>
      <ImageContainer
        key={uuid().slice(0, 8)}
        selectedImage={selectedImage}
        savedPosition={savedPosition}
        setSavedPosition={setSavedPosition}
        toggle={toggle}
      />
      <InputContainer>
        <InputWrapper>
          <ImageTitleLabel>Add image title</ImageTitleLabel>
          <ImageInput
            image={"ImageIcon"}
            value={titleInput?.title}
            onChange={(e) =>
              setTitleInput({ title: e.target.value, edited: true })
            }
            type="text"
            required
            placeholder={"ex. Ground floor plan"}
          />
        </InputWrapper>
        {!!uploadedImage?.length && (
          <>
            <div>
              <CheckboxButton
                id="toggle"
                onChange={() => setToggle(!toggle)}
                label="Show hotspot titles"
                checked={toggle}
              />
              <ImageCarousel
                key={uuid().slice(0, 8)}
                image={uploadedImage}
                setImage={setUploadedImage}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                savedPosition={savedPosition}
                setSavedPosition={setSavedPosition}
              />
            </div>
          </>
        )}
        <BottomBtnsWrapper>
          <FileUpload
            onChange={(e) => (
              !!uploadedImage?.length
                ? // @ts-ignore
                  setUploadedImage?.([...uploadedImage, ...e])
                : setUploadedImage?.(e),
              setUploadAction(true)
            )}
            accept=".jpeg,.jpg,.png"
          >
            {({ openFileUploadDialog }) => (
              <UploadBtn onClick={openFileUploadDialog}>
                <img src={"downloadIcon"} alt="error"></img>
                <span>Upload</span>
              </UploadBtn>
            )}
          </FileUpload>
          {!!uploadedImage?.length && (
            <SaveBtn
              onClick={() => {
                if (titleInput?.title != null && !!uploadedImage?.length) {
                  uploadFiles(uploadedImage as FileList, titleInput?.title);
                }
                if (
                  titleInput?.edited &&
                  selectedImage &&
                  "id" in selectedImage
                ) {
                  modifyTitle(titleInput, selectedImage?.id);
                }
                if (selectedImage?.hasOwnProperty("id")) {
                  saveDots(savedPosition, selectedImage as Level);
                }
              }}
            >
              {uploadAction ? (
                <Loader size="small" />
              ) : (
                <>
                  <img src={"saveIcon"} alt="" />
                  <span>Save</span>
                </>
              )}
            </SaveBtn>
          )}
        </BottomBtnsWrapper>
      </InputContainer>
    </>
  );
};

export default FloorPlanInput;
