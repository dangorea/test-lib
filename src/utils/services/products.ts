import axios, { AxiosResponse } from "axios";
import type { Product } from "../../store/types";

export const getProductById = ({
  instanceId,
  wixProductId,
}: {
  instanceId: string;
  wixProductId: string;
}): Promise<Product | void> => {
  return axios
    .get(`https://api.wix.viar.live/api/v1/app/wix/get-product`, {
      params: { instanceId, wixProductId },
    })
    .then((res: AxiosResponse<{ product: Product }>) => {
      return res.data.product;
    })
    .catch((error) => console.log(error));
};

export const requestWixProducts = ({
  instanceId,
  name,
}: {
  instanceId: string;
  name: string;
}): Promise<Product | void> => {
  return axios
    .post(
      `https://api.wix.viar.live/api/v1/app/wix/get-products?instanceId=${instanceId}`,
      { name }
    )
    .then((res: AxiosResponse<{ products: Product }>) => {
      return res.data.products;
    })
    .catch((error) => console.log(error));
};
