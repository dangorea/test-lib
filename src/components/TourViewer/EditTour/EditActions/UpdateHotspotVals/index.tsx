import type { FC } from "react";
import { useFormikContext } from "formik";
import { useEffect } from "react";

type Props = {
  vals: any;
};

const UpdateHotspotVals: FC<Props> = ({ vals }) => {
  const { setValues } = useFormikContext();

  useEffect(() => {
    setValues(vals);
  }, [setValues, vals]);

  return null;
};

export default UpdateHotspotVals;
