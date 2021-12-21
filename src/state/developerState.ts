import { atom, atomFamily } from "recoil";
import TodoContent from "../types/todoContent";
import Developer from "../types/developer";

export const developerContentState = atom<Developer[]>({
  key: "todoContents",
  default: [],
});

export const todoContentState = atom<TodoContent[]>({
  key: "todoContents",
  default: [],
});

export const todoCompleteState = atomFamily<boolean, string>({
  key: "todoCompleteState",
  default: false,
});
