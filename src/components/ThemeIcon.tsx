import { useEffect } from "react";
import useThemeStore from "../store/theme";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeIcon() {
  const { theme, toggle } = useThemeStore();

  useEffect(() => {
    const htmlE = document.querySelector("html");
    htmlE?.setAttribute("data-bs-theme", theme);
  }, [theme]);

  return (
    <a onClick={toggle} href="javascript:void(0)">
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </a>
  );
}
