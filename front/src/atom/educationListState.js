import { atom } from "recoil";

const educationListState = atom({
  key: "education",
  default: [],
});

export default educationListState;
