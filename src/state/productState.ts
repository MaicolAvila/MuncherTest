import { atom, atomFamily } from "recoil";
import Product from "../types/product";

export const productContentState = atom<Product[]>({
  key: "productContents",
  default: [],
});
