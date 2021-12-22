import { atom, atomFamily } from "recoil";
import Developer from "../types/developer";

export const developerContentState = atom<Developer[]>({
  key: "todoContents",
  default: [],
});
