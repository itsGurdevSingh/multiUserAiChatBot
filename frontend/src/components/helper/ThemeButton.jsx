import { useDispatch, useSelector } from "react-redux";
import { ToggleTheme } from "../../store/reducers/uiSlice";

function ThemeButton() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  return (
    <button
      onClick={() => dispatch(ToggleTheme())}
      style={{ margin: "1rem", padding: "0.5rem 1rem" }}
    >
      Theme: {theme}
    </button>
  );
}

export default ThemeButton;
