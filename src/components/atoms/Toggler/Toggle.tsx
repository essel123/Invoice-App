import { useEffect } from "react";
import Icon from "../Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../../State/hooks";
import { setDarkMode } from "../../../State/stateSlice";

function Toggle() {
  const htmlElement = document.documentElement;
  const controller = useAppDispatch();

  const isDarkMode = useAppSelector(state => state.pageState.isDarkMode);
  useEffect(
    () => {
      const currentTheme =
        localStorage.getItem("theme") ||
        htmlElement.getAttribute("data-theme") ||
        "light";
      htmlElement.setAttribute("data-theme", currentTheme);
      controller(setDarkMode(currentTheme === "dark"));
    },
    [controller, htmlElement]
  );

  function handleMode() {
    const newTheme = isDarkMode ? "light" : "dark";
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    controller(setDarkMode(!isDarkMode));
  }

  return (
    <Icon
      size="sm"
      src={
        isDarkMode
          ? "../assets/icon-sun.svg"
          : "../assets/icon-moon.svg"
      }
      alt={isDarkMode ? "image of sun" : "image of moon"}
      onClick={handleMode}
    />
  );
}

export default Toggle;
