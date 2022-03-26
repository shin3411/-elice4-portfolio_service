import { atom } from "recoil";

const loginIdState = atom({
  key: "loginIdState",
  default: "",
});

export default loginIdState;
