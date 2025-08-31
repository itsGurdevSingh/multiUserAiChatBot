import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "system", // "dark" | "light" | "system"
  sidebarVisibility: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    ToggleSidebarVisibility: (state) => {
      state.sidebarVisibility = !state.sidebarVisibility;
    },
    ToggleTheme: (state) => {
      // cycle dark → light → system
      if (state.theme === "dark") state.theme = "light";
      else if (state.theme === "light") state.theme = "system";
      else state.theme = "dark";
    },
    SetTheme: (state, action) => {
      state.theme = action.payload; // directly set theme
    },
  },
});

export const { ToggleSidebarVisibility, ToggleTheme, SetTheme } = uiSlice.actions;
export default uiSlice.reducer;
