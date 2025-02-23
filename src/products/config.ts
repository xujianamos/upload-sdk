import { commonWebUploader, commonMacUploader } from "./common";

export const products = {
  "common-web": commonWebUploader,
  "common-mac": commonMacUploader,
} as const;

export type ProductType = keyof typeof products;