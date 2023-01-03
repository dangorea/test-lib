import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Tooltip } from "wix-style-react";

import { getMyTours } from "../../../../store/tours/selectors";

import {
  isFullAccess,
  redirectOpenBillingPage,
  sphereLimiter,
} from "../../../../utils/premium";

import { ActionsWrapper, CreateTourBtn } from "./styles";

import type { Image360 } from "../../../../store/types";
import { CONFIG } from "../../../../utils/config";
import UploadDrawer from "../../Actionbar/UploadDrawer";

type Props = {
  images: Image360[];
  selected: string[];
  setSelected: (selected: string[]) => void;
  handleDeleteSelected: () => void;
  selectedCount: number;
};

const ImageGridActions: FC<Props> = ({
  selected,
  selectedCount,
  handleDeleteSelected,
}) => {
  const history = useHistory();
  // @ts-ignore
  const allowedMoreTours =
    // @ts-ignore
    useSelector(getMyTours())?.length < CONFIG.subscriptionPlan.tourLimit;

  const allowedCreateTours =
    isFullAccess(CONFIG.subscriptionPlan.id) ||
    (allowedMoreTours &&
      sphereLimiter(CONFIG.subscriptionPlan.id, selected.length));

  return (
    <ActionsWrapper>
      {!!selectedCount && (
        <>
          <Button
            priority="secondary"
            skin="destructive"
            onClick={handleDeleteSelected}
          >
            Delete
          </Button>
        </>
      )}
      <Tooltip
        disabled={allowedCreateTours}
        content={
          !allowedMoreTours
            ? "Want to create another tour? Upgrade App"
            : `${CONFIG.subscriptionPlan.sphereLimitPerTour} images max per tour. Want to add more images? Upgrade App`
        }
      >
        <CreateTourBtn
          disabled={!selectedCount}
          priority="secondary"
          skin={allowedCreateTours ? "standard" : "premium"}
          onClick={() => {
            allowedCreateTours
              ? history.push("/dashboard/create-tour", {
                  selectedImgIds: selected,
                })
              : redirectOpenBillingPage();
          }}
        >
          Create Tour
        </CreateTourBtn>
      </Tooltip>
      <UploadDrawer />
    </ActionsWrapper>
  );
};

export default ImageGridActions;
