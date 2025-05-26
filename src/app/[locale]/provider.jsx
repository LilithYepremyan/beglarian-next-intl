"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/store/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import ContactUs from "@/components/ContactUs";

const store = makeStore();
export function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <ContactUs />
        {children}
      </Provider>
    </ThemeProvider>
  );
}
