import axios from "axios";
import Evaporate from "evaporate";
import { CONFIG, EVAPORATE_CONFIG } from "../../utils/config";
import { IMAGE_STATUSES } from "../constants/images";
import {
  errorNotification,
  successNotification,
} from "../notifications/actions";
import type { Dispatch } from "redux";
import type { Icon } from "../types";
import type React from "react";

const BASE_ENDPOINT = "media";

export const uploadIcons =
  (
    file: File,
    afterCreate?: (img: Icon) => void,
    onComplete?: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      onComplete?.(true);
      const { data } = await axios.post<Icon>(`${BASE_ENDPOINT}`, {
        name: file.name,
      });

      afterCreate?.(data);

      const { id } = data;

      const evaporate = await Evaporate.create(EVAPORATE_CONFIG);

      const addConfig: Evaporate.AddConfig = {
        name: file.name,
        file: file,
        progress: (value) => value,
      };

      const overrides = {
        bucket: `${CONFIG.awsBucket}/media/${id}`,
      };

      await evaporate.add(addConfig, overrides);

      const interval = setInterval(() => {
        void axios
          .get(`${BASE_ENDPOINT}/${id}`)
          .then(({ data: newImageData }) => {
            if (newImageData.status === IMAGE_STATUSES.FAILED) {
              dispatch(errorNotification(`Failed to add image`));
              clearInterval(interval);
              onComplete?.(false);
            }
            if ([IMAGE_STATUSES.CREATED].includes(newImageData.status)) {
              clearInterval(interval);
              dispatch(successNotification("File successfully uploaded"));
              onComplete?.(false);
            }
          });
      }, 2000);
    } catch (err) {
      if (err instanceof Error) {
        dispatch(errorNotification(`${err.message}`));
      }
    }
  };

export const deleteIcon = async (id: string): Promise<void> => {
  await axios.delete<Icon>(`${BASE_ENDPOINT}/${id}`);
};

export function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
