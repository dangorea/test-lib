import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useField } from "formik";
import { CONFIG, VIEWER_CONFIG } from "../../utils/config";
import { ChevronDown, Dismiss, InfoCircle } from "wix-ui-icons-common";
import {
  CurrentIcon,
  CurrentIconWrapper,
  DropDownList,
  DropDownListContainer,
  IconDeleteElement,
  IconItem,
  IconSelectWrapper,
  Label,
  IconModalWrapper,
  UnlinkBtn,
  UploadBtnWrapper,
  LoadingSpinner,
  UploadIconBtn,
  InfoIconWrapper,
  RotateChevron,
} from "./styles";
import useOpen from "../../utils/hooks/useOpen";
import type { Icon } from "../../store/types";
import {
  deleteIcon,
  isJsonString,
  uploadIcons,
} from "../../store/tours/actions";
import Tooltip from "../Tooltip";
import UnlinkModal from "../UnlinkModal";
import { useDispatch, useSelector } from "react-redux";
import { getIcons } from "../../store/tours/selectors";
import { errorNotification } from "../../store/notifications/actions";
import { createPortal } from "react-dom";
import useOutsideAction from "../../utils/hooks/useOutsideAction";
import _ from "lodash";
// import { FormField as WixFormField, Popover, Text } from "wix-style-react";

type Props = {
  label: string;
  name: string;
  iconNames: string[];
  setCurrentStyle?: (arg: string) => void;
};

const BASE_ENDPOINT = "media";

const getIconSrc = (icon: string) => {
  if (isJsonString(icon)) {
    const iconData: Icon = JSON.parse(icon);
    return `${CONFIG.storageUrl}/${BASE_ENDPOINT}/${iconData.id}/media.png?v=${iconData.createdAt}`;
  }
  return `${CONFIG.apiUrl}icon/${icon}.svg?color=ffffff&blur=15`;
};

const IconSelect: FC<Props> = ({ label, name, iconNames, setCurrentStyle }) => {
  const [field, _, helpers] = useField(name);
  const [icons, setIcons] = useState<Array<string>>([""]);
  const [unlinkIcon, setUnlinkIcon] = useState<Icon | null>(null);
  const [uploadAction, setUploadAction] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const { open, handleToggle, handleClose } = useOpen();
  useOutsideAction(wrapperRef, handleClose);
  const userIcons = useSelector(getIcons());
  const dispatch = useDispatch();

  useEffect(() => {
    setIcons([...iconNames, ...userIcons.map((icon) => JSON.stringify(icon))]);
  }, [iconNames, unlinkIcon, handleToggle, userIcons]);

  const uploadFiles = useCallback(
    (files: FileList) => {
      Array.from(files).forEach((file) => {
        if (
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg"
        ) {
          if (file.size <= 500000) {
            setUploadAction(true);
            dispatch(uploadIcons(file, setUploadAction));
          } else {
            dispatch(
              errorNotification(
                "File size should be less or equal to 500 Kilobytes"
              )
            );
          }
        } else {
          dispatch(errorNotification("File type should be JPG, PNG"));
        }
      });
    },
    [dispatch]
  );

  const handleUnlink = useCallback(() => {
    dispatch(deleteIcon(unlinkIcon.id, setUnlinkIcon(null)));
    handleClose();
  }, [dispatch, handleClose, unlinkIcon?.id]);

  // const handleClick = () => {
  //   hiddenFileInput.current?.click();
  // };
  // const handleChange = (event: { target: { files: any } }) => {
  //   const fileUploaded = event.target.files;
  //   console.log(fileUploaded);
  // };

  return (
    <IconSelectWrapper ref={wrapperRef}>
      <Label id={name}>
        <span>{label}</span>
      </Label>
      <IconModalWrapper>
        <CurrentIconWrapper onClick={handleToggle}>
          <CurrentIcon src={getIconSrc(field.value)} alt="" />
          <RotateChevron open={open}>
            <ChevronDown />
          </RotateChevron>
        </CurrentIconWrapper>
        <UploadBtnWrapper>
          <Tooltip
            title="Icons must have a maximum size of 150x150 pixels."
            position="left"
            styles={{ top: "-15px" }}
          >
            <InfoIconWrapper>
              <InfoCircle width={25} height={25} />
            </InfoIconWrapper>
          </Tooltip>
          <UploadIconBtn
            onClick={(e) => {
              e.preventDefault();
              hiddenFileInput.current?.click();
            }}
          >
            {!uploadAction ? "Upload a Icon" : <LoadingSpinner />}
          </UploadIconBtn>
          <input
            ref={hiddenFileInput}
            type="file"
            onChange={(e) => uploadFiles(e.target.files as FileList)}
            multiple
            accept=".jpeg,.jpg,.png"
            style={{ display: "none" }}
          />
        </UploadBtnWrapper>
      </IconModalWrapper>
      {/*<FileUpload*/}
      {/*  onChange={uploadFiles}*/}
      {/*  multiple*/}
      {/*  accept=".jpeg,.jpg,.png"*/}
      {/*>*/}
      {/*  {({ openFileUploadDialog }) => (*/}
      {/*<UploadBtnWrapper>*/}
      {/*<Button onClick={openFileUploadDialog}>*/}
      {/*  {!uploadAction ? "Upload a Icon" : <LoadingSpinner />}*/}
      {/*</Button>*/}
      {/*</UploadBtnWrapper>*/}
      {/*  )}*/}
      {/*</FileUpload>*/}
      {/*</IconSelectWrapper>*/}
      <DropDownListContainer open={open}>
        <DropDownList>
          {icons.map((icon) => (
            <div key={icon} style={{ position: "relative" }}>
              {isJsonString(icon) && (
                <IconDeleteElement
                  onClick={() => {
                    setUnlinkIcon(JSON.parse(icon));
                  }}
                >
                  <UnlinkBtn>
                    <Dismiss />
                  </UnlinkBtn>
                </IconDeleteElement>
              )}
              <IconItem
                key={icon}
                src={getIconSrc(icon)}
                alt=""
                selected={field.value === icon}
                onClick={() => {
                  helpers.setValue(icon);
                  setCurrentStyle?.(icon);
                  handleClose();
                }}
              />
            </div>
          ))}
        </DropDownList>
      </DropDownListContainer>
      {createPortal(
        <UnlinkModal
          open={!!unlinkIcon}
          headerLabel="Unlink Icons"
          errorMessage="Are you sure you want to unlink following icon:"
          fileName={unlinkIcon?.name as string}
          handleClose={() => setUnlinkIcon(null)}
          handleUnlink={handleUnlink}
        />,
        document.getElementById(VIEWER_CONFIG.MAIN_VIEWER_ID) as Element
      )}
    </IconSelectWrapper>

    // TODO fix here
    // <WixFormField label={<Text light>{label}</Text>} id={name}>
    //   <Popover
    //     showArrow
    //     shown={open}
    //     onClickOutside={handleClose}
    //     appendTo="parent"
    //     placement="bottom-start"
    //   >
    //     <Popover.Element>
    //       <CurrentIconWrapper onClick={handleToggle}>
    //         <CurrentIcon src={getIconSrc(field.value)} alt="" />
    //         <ChevronDown />
    //       </CurrentIconWrapper>
    //     </Popover.Element>
    //     <Popover.Content>
    //       <IconsSelectGrid>
    //         {iconNames.map((icon) => {
    //           return (
    //             <div key={icon} style={{ position: "relative" }}>
    //               {isJsonString(icon) && (
    //                 <IconDeleteElement
    //                   onClick={() => {
    //                     setUnlinkIcon(JSON.parse(icon));
    //                   }}
    //                 >
    //                   <UnlinkBtn>
    //                     <Dismiss />
    //                   </UnlinkBtn>
    //                 </IconDeleteElement>
    //               )}
    //               <IconItem
    //                 key={icon}
    //                 src={getIconSrc(icon)}
    //                 alt={""}
    //                 selected={field.value === icon}
    //                 onClick={() => {
    //                   helpers.setValue(icon);
    //                   setCurrentStyle?.(icon);
    //                   handleClose();
    //                 }}
    //               />
    //             </div>
    //           );
    //         })}
    //       </IconsSelectGrid>
    //     </Popover.Content>
    //   </Popover>
    // </WixFormField>
  );
};

export default IconSelect;
