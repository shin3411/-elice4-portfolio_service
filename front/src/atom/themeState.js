import { atom } from "recoil";

// Light 모드일 때 mode 이름과 색상값 저장
export const LightState = atom({
  key: "light",
  default: {
    mode: "light",
    bgColor: "white",
    textColor: "#31302E",
  },
});

// Dark 모드일 때 mode 이름과 색상값 저장
export const DarkState = atom({
  key: "dark",
  default: {
    mode: "dark",
    // bgColor: "#383737",
    bgColor: "#1E1E22",
    textColor: "white",
  },
});

export const getTheme = () => {
  const theme = localStorage.getItem("mode");
  return theme === "dark" ? DarkState : LightState;
};

// 현재 모드를 저장하는 modeState
export const modeState = atom({
  key: "isMode",
  default: getTheme(),
});
