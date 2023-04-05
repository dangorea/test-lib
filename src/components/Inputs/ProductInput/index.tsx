import React, { FC, useEffect, useState } from "react";
import { useField } from "formik";
import FormField from "../FormField";
import Wix from "wix-sdk";
import type { Product } from "../../../store/types";
import { DropDown, DropDownItem, ItemText } from "./styles";
import { requestWixProducts } from "../../../store/tours/actions";
import { useDebounce } from "use-debounce";

type Props = {
  name: string;
  identifier: string;
  required: boolean;
} & Partial<any>;

const ProductInput: FC<Props> = ({
  label,
  name,
  identifier,
  required = false,
  eventHandler,
  ...props
}) => {
  const [field, _meta, helpers] = useField(name);
  const [_fieldId, _metaId, helpersId] = useField(identifier);
  const [productField, _productMeta, productHelper] = useField("product");
  const [openDropDown, setOpenDropdown] = useState<boolean>(false);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const instanceId = Wix.Utils.getInstanceId();
  const [debouncedValue] = useDebounce(field.value, 300);

  useEffect(() => {
    if (
      instanceId &&
      debouncedValue &&
      field.value !== productField.value?.name
    ) {
      requestWixProducts(instanceId, debouncedValue).then((data) => {
        setProductsData(data);
        setOpenDropdown(true);
      });
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!field.value || field.value !== productField.value?.name) {
      setOpenDropdown(false);
      helpersId.setValue(null);
      productHelper.setValue(null);
    }
  }, [field.value]);

  return (
    <>
      <FormField
        placeholder="Add your product name here"
        label={label}
        name={name}
        required={required}
        {...props}
      />
      <DropDown open={openDropDown}>
        {productsData.map((prod) => (
          <DropDownItem
            key={prod.id}
            onClick={() => {
              helpers.setValue(prod?.name);
              helpersId.setValue(prod?.id);
              productHelper.setValue(prod);
              setProductsData([]);
              setOpenDropdown(false);
            }}
          >
            <ItemText>{prod?.name}</ItemText>
          </DropDownItem>
        ))}
      </DropDown>
    </>
  );
};

export default ProductInput;
