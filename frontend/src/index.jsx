import React from "react";
import "./index.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import reportWebVitals from "./reportWebVitals";
import ScrollerPage from "./components/ScrollerPage";
import AppBarComponent from "./components/AppBar";
import ViewImage from "./components/ViewImage";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "##90caf9",
    },
    secondary: {
      main: "#90caf9",
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppBarComponent />
          <Routes>
            <Route path="/" Component={ScrollerPage} />
            <Route path="/view/:imageId" Component={ViewImage} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
