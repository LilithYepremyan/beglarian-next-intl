import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import mailingsPageReducer from "./slices/mailingsPageSlice";
import utmReducer from "./slices/utmSlice";
import userReducer from "./slices/userSlice";
import fabricsPageReducer from "./slices/fabricsPageSlice";
import mailingPageReducer from "./slices/mailingPageSlice";
import fabricPageReducer from "./slices/fabricPageSlice";
import authReducer from "./slices/authSlice";
import supportReducer from "./slices/supportSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      mailingsPage: mailingsPageReducer,
      mailingPage: mailingPageReducer,
      fabricsPage: fabricsPageReducer,
      fabricPage: fabricPageReducer,
      // wishlistPage: wishlistPageReducer,
      // cart: cartReducer,
      auth: authReducer,
      support: supportReducer,
      utm: utmReducer,
    },
  });

export const wrapper = createWrapper(makeStore);
