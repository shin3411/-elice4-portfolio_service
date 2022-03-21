import BootstrapSwitchButton from "bootstrap-switch-button-react";

const ThemeToggle = () => {
  return (
    <BootstrapSwitchButton
      checked={false}
      onlabel="Dark"
      offlabel="Light"
      onstyle="dark"
      width={80}
      height={30}
      onChange={() => {}}
    />
  );
};

export default ThemeToggle;
