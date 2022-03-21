import React from "react";
import { createGlobalStyle } from "styled-components";
import { useRecoilValue } from "recoil";
import { modeState } from "../atom/themeState";

const GlobalStyle = createGlobalStyle`
  body, div, html,img,a,p {
  // props 로 받은 색 적용 
  color : ${(currentTheme) => currentTheme.textColor};
  background-color : ${(currentTheme) => currentTheme.bgColor};
  transition: 0.3s  
}
`;

const GlobalCss = () => {
  const current = useRecoilValue(modeState);
  const bgColor = current.bgColor;
  const textColor = current.textColor;
  return <GlobalStyle bgColor={bgColor} textColor={textColor} />;
};

export default GlobalCss;
