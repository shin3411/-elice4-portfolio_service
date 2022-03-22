import React from "react";
import { createGlobalStyle } from "styled-components";
import { useRecoilValue } from "recoil";
import { modeState } from "../atom/themeState";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');
</style>;

const GlobalStyle = createGlobalStyle`
  body, div {
  // props 로 받은 색 적용 
  color : ${(currentTheme) => currentTheme.textColor};
  background-color : ${(currentTheme) => currentTheme.bgColor};
  transition: 0.3s;
  font-family: 'Nunito', sans-serif;
}
  a {
    font-size: 17px;
    font-family: 'Nunito', sans-serif;
  }

  a:hover {
    transform: scale(1.05);
    transition: 0.3s;
  }
`;

const GlobalCss = () => {
  const current = useRecoilValue(modeState);
  const bgColor = current.bgColor;
  const textColor = current.textColor;
  return <GlobalStyle bgColor={bgColor} textColor={textColor} />;
};

export default GlobalCss;
