import React, { FC, useEffect, useState } from "react";
import { useField } from "formik";
import { FormField as WixFormField, Popover, Text } from "wix-style-react";
import { CONFIG } from "../../../../../utils/config";
import { ChevronDown, Dismiss } from "wix-ui-icons-common";
import {
  CurrentIcon,
  CurrentIconWrapper,
  IconDeleteElement,
  IconItem,
  IconsSelectGrid,
  UnlinkBtn,
} from "./styles";
import useOpen from "../../../../../utils/hooks/useOpen";
import axios, { AxiosResponse } from "axios";
import type { Icon } from "../../../../../store/types";
import { isJsonString } from "../../../../../store/icons/actions";
import IconUnlinkModal from "../../../../../store/icons";

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
    return `${CONFIG.storageUrl}/${BASE_ENDPOINT}/${iconData.id}/${iconData.name}`;
  }
  return `${CONFIG.apiUrl}icon/${icon}.svg?color=ffffff&blur=15`;
};

const IconSelect: FC<Props> = ({ label, name, iconNames, setCurrentStyle }) => {
  const [field, _, helpers] = useField(name);
  const [icons, setIcons] = useState<Array<string>>([""]);
  const [unlinkIcon, setUnlinkIcon] = useState<Icon | null>(null);
  const { open, handleToggle, handleClose } = useOpen();

  useEffect(() => {
    void axios.get(`${BASE_ENDPOINT}`).then((res: AxiosResponse<Icon[]>) => {
      setIcons([
        ...iconNames,
        ...res.data.map((icon: Icon) => JSON.stringify(icon)),
      ]);
    });
  }, [iconNames, unlinkIcon, handleToggle]);

  return (
    <>
      <WixFormField label={<Text light>{label}</Text>} id={name}>
        {/*// @ts-ignore*/}
        <Popover
          showArrow
          shown={open}
          onClickOutside={handleClose}
          appendTo="parent"
          placement="bottom-start"
        >
          <Popover.Element>
            <CurrentIconWrapper onClick={handleToggle}>
              <CurrentIcon src={getIconSrc(field.value)} alt="" />
              <ChevronDown />
            </CurrentIconWrapper>
          </Popover.Element>
          <Popover.Content>
            <IconsSelectGrid>
              {icons.map((icon) => {
                return (
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
                      alt={""}
                      selected={field.value === icon}
                      onClick={() => {
                        helpers.setValue(icon);
                        setCurrentStyle?.(icon);
                        handleClose();
                      }}
                    />
                  </div>
                );
              })}
            </IconsSelectGrid>
          </Popover.Content>
        </Popover>
      </WixFormField>
      <IconUnlinkModal
        icon={unlinkIcon}
        handleClose={() => setUnlinkIcon(null)}
      />
    </>
  );
};

export default IconSelect;
