import { useRecoilState, useRecoilValue } from "recoil";
import { LightState, DarkState, modeState } from "../atom/themeState";
import styled from "styled-components";

// 왼쪽 아래에 나타나는 다크모드 토글 버튼
const ThemeToggle = () => {
  const lightMode = useRecoilValue(LightState);
  const darkMode = useRecoilValue(DarkState);
  const [ModeState, setModeState] = useRecoilState(modeState);
  console.log(ModeState);
  return (
    <ToggleWrapper
      ModeState={ModeState}
      onClick={(e) => {
        e.preventDefault();
        window.localStorage.setItem("mode", ModeState.mode);
        setModeState((cur) => (cur === lightMode ? darkMode : lightMode));
      }}
    >
      {ModeState.mode === "light" ? "🌝" : "🌚"}
    </ToggleWrapper>
  );
};

export default ThemeToggle;

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 4%;
  left: 3%;

  font-size: 25px;

  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30%;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s linear;
  }
`;
