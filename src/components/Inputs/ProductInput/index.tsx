import React, { FC, useEffect, useState } from "react";
import { useField } from "formik";
// import { DropdownLayout } from "wix-style-react";
import FormField from "../FormField";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import { ProductInfo } from "../../../containers/TourViewer/EditTour/EditActions/AddProducts/components/ProductInfo";
import Wix from "wix-sdk";
import {
  getProductById,
  requestWixProducts,
} from "../../../utils/services/products";
import type { Product } from "../../../store/types";
import {
  SearchSpinner,
  SearchSpinnerBlock,
} from "../../../containers/TourViewer/EditTour/EditActions/AddProducts/components/styles";
import Loader from "../../Loader";

type Props = {
  name: string;
  required: boolean;
} & Partial<any>;
1;

const Index: FC<Props> = ({
  label,
  name,
  required = false,
  eventHandler,
  ...props
}) => {
  const [_field, _meta, helpers] = useField(name);
  const [searchItem, setSearchItem] = useState("");
  const [input, setInput] = useState("");
  const [displayState, setDisplayState] = useState(false);
  const [productsData, setProductsData] = useState<Array<Product>>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [selectedHotspot, setSelectedHotspot] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  // const instanceId = Wix.Utils.getInstanceId();
  const debounce = useDebounce(searchItem, 300);
  const productId: string = props.currentHotspot.target;

  useEffect(() => {
    eventHandler &&
      (setInput(""),
      setSearchItem(""),
      setDisplayState(true),
      setSelectedHotspot({}),
      setSelectedProduct({}));
  }, [eventHandler]);

  // useEffect(() => {
  //   if (instanceId && debounce) {
  //     setProductsLoading(true);
  //     void requestWixProducts({
  //       instanceId,
  //       name: debounce,
  //     }).then((res) => {
  //       if (res) {
  //         setProductsData(Object.assign([], { ...res }));
  //         setDisplayState(true);
  //         setSelectedProduct({});
  //         setSelectedHotspot({});
  //       }
  //       setProductsLoading(false);
  //     });
  //   } else {
  //     setProductsData([]);
  //     setProductsLoading(false);
  //   }
  // }, [instanceId, debounce]);
  //
  // useEffect(() => {
  //   if (instanceId && productId) {
  //     setIsLoading(true);
  //     void getProductById({
  //       instanceId,
  //       wixProductId: productId,
  //     })
  //       .then((res) => {
  //         if (res) {
  //           setSelectedHotspot(res);
  //           setIsLoading(false);
  //         }
  //       })
  //       .catch(() => {
  //         setIsLoading(false);
  //       });
  //   }
  // }, [instanceId, productId]);
  // TODO Fix here
  return (
    <>
      <FormField
        placeholder="Add your product name here"
        label={label}
        name={name}
        // placeholder="Type here"
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        //   setInput("");
        //   setSearchItem(e.target.value);
        //   setIsLoading(false);
        //   setSelectedProduct({});
        /*}}*/
        // value={input === "" ? searchItem : input}
        required={required}
        {...props}
      />
      {productsLoading ? (
        <>
          <SearchSpinnerBlock>
            <SearchSpinner />
          </SearchSpinnerBlock>
        </>
      ) : (
        displayState && (
          <>
            {/*TODO fix here*/}
            {/*<DropdownLayout*/}
            {/*  options={productsData.map((product: any) => {*/}
            {/*    return { ...product, value: product?.name };*/}
            {/*  })}*/}
            {/*  visible*/}
            {/*  onSelect={(el) => {*/}
            {/*    setSelectedProduct(el);*/}
            {/*    setDisplayState(!displayState);*/}
            {/*    setInput(el.value as string);*/}
            {/*    setSearchItem("");*/}
            {/*    setProductsData([]);*/}
            {/*    helpers.setValue(el.id);*/}
            {/*    setIsLoading(false);*/}
            {/*    setSelectedHotspot({});*/}
            {/*  }}*/}
            {/*  inContainer*/}
            {/*/>*/}
          </>
        )
      )}
      {!displayState && (
        <ProductInfo key={selectedProduct.id} product={selectedProduct} />
      )}
      {props.currentHotspot.target === selectedHotspot.id &&
        displayState &&
        input === "" &&
        searchItem === "" &&
        productsData && (
          <ProductInfo key={selectedHotspot.id} product={selectedHotspot} />
        )}
      {isLoading && <Loader />}
    </>
  );
};

export default Index;
