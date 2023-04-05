import * as React from "react";
import type { FC } from "react";
import {
  HeadContainer,
  ImgContainer,
  PriceContainer,
  ProductDescription,
  ProductInfoBlock,
} from "./styles";
import { useField } from "formik";
import { Label } from "../Inputs/FormField/styles";

type Props = {
  name: string;
};

const ProductPreview: FC<Props> = ({ name }) => {
  const [product, _metaProduct, _setProduct] = useField(name);

  if (!product.value) {
    return null;
  }

  return (
    <>
      <Label id={name}>
        <span>Preview</span>
      </Label>
      <ProductInfoBlock>
        <ImgContainer>
          <img
            src={
              product.value.media.mainMedia.image.url ||
              "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="
            }
            alt=""
            draggable={false}
          />
        </ImgContainer>
        <ProductDescription>
          <HeadContainer>{product.value.name.substring(0, 16)}</HeadContainer>
          <PriceContainer>{product.value.price.formatted.price}</PriceContainer>
        </ProductDescription>
      </ProductInfoBlock>
    </>
  );
};

export default ProductPreview;
