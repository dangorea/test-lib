import * as React from "react";
import {
  Colors,
  ColorsContainer,
  DescriptionBlock,
  HeadContainer,
  HeaderSection,
  ImageSection,
  ImgContainer,
  PriceContainer,
  ProductInfoBlock,
} from "./Style";
import type { Product } from "../../../../../../store/types";

export const ProductInfo = ({ product }: { product: Product }): any => {
  return (
    Object.keys(product).length !== 0 && (
      <>
        <ProductInfoBlock>
          <ImgContainer>
            <ImageSection>
              <div className="some">
                <img
                  src={
                    product.media?.mainMedia?.image?.url ||
                    "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="
                  }
                  alt={""}
                />
              </div>
            </ImageSection>
          </ImgContainer>
          <ColorsContainer>
            <div className="colorsCenter">
              {product.productOptions.map(
                (item: {
                  choices: Array<{ description: string; value: string }>;
                }) => {
                  return item.choices.map(
                    (item: { description: string; value: string }) => (
                      <Colors key={item.description} color={item.value} />
                    )
                  );
                }
              )}
            </div>
          </ColorsContainer>
          <HeadContainer>
            <HeaderSection>
              {product.name.length >= 15 ? (
                <h1>{product.name.substring(0, 16)}</h1>
              ) : (
                <h1>{product.name}</h1>
              )}
            </HeaderSection>
          </HeadContainer>
          <PriceContainer>
            <h2>{product.price.formatted.price}</h2>
          </PriceContainer>
          <DescriptionBlock>
            {product.description.length !== 0 && (
              <h2>
                {product?.description?.substring(
                  0,
                  Number(product.description.indexOf(".")) + 1
                )}
              </h2>
            )}
          </DescriptionBlock>
        </ProductInfoBlock>
      </>
    )
  );
};
