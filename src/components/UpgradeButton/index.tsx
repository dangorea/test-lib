import React, { FC } from "react";
import { Button } from "wix-style-react";
import { CONFIG } from "../../utils/config";
import { isFullAccess, redirectOpenBillingPage } from "../../utils/premium";

const UpgradeButton: FC = () => {
  if (isFullAccess(CONFIG.subscriptionPlan.id)) {
    return null;
  }

  return (
    <Button onClick={redirectOpenBillingPage} skin="premium">
      Upgrade
    </Button>
  );
};

export default UpgradeButton;
