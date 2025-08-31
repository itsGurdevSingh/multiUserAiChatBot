import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./reducers/chatSlice";
import authSlice from "./reducers/authSlice";
import uiSlice from "./reducers/uiSlice";

export const store = configureStore({
    reducer: {
        chat: chatSlice,
        auth: authSlice,
        ui:uiSlice
    },

})