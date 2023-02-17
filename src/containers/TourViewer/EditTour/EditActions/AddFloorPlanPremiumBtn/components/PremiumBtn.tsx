import React, { FC, ReactElement } from "react";
import { PremiumBtnWrapper } from "./style";
import premium from "../../../../../../assets/icons/premium.svg";
import { redirectOpenBillingPage } from "../../../../../../utils/premium";

type Props = {
  icon: ReactElement;
};

const PremiumBtn: FC<Props> = ({ icon }) => {
  return (
    <>
      <PremiumBtnWrapper onClick={redirectOpenBillingPage}>
        <img src={premium} alt="move" width="20px" height="20px" />
        {icon}
      </PremiumBtnWrapper>
    </>
  );
};

export default PremiumBtn;
