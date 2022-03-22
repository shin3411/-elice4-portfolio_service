import React from "react";
import { createGlobalStyle } from "styled-components";
import { useRecoilValue } from "recoil";
import { modeState } from "../atom/themeState";
<style>
  @import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
</style>;

const GlobalStyle = createGlobalStyle`
  body, div.card-body,  div.modal-content {
  // props 로 받은 색 적용 
  color : ${(currentTheme) => currentTheme.textColor};
  background-color : ${(currentTheme) => currentTheme.bgColor};
  transition: 0.3s;
  font-family: 'Nunito', sans-serif;
}
  div.card-body {
    border: 1px solid #C7C8D2;
  box-sizing: border-box;
  border-radius: 8px;
  }

  span.navbar-brand {
    font-weight: 700;
  }
 
  a {
    font-size: 17px;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
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
