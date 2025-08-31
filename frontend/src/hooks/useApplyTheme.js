import { useEffect } from "react";
import { useSelector } from "react-redux";

function useApplyTheme() {
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    let appliedTheme = theme;

    if (theme === "system") {
      appliedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    document.body.setAttribute("data-theme", appliedTheme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      document.body.setAttribute("data-theme", mq.matches ? "dark" : "light");
    };

    mq.addEventListener("change", handler);
    handler();

    return () => mq.removeEventListener("change", handler);
  }, [theme]);
}

export default useApplyTheme;
