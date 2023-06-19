import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import Demo from './demo';
import Createarea from "./CreateArea";
import Note from "./note";
import { useState } from "react";
import App from "./App";




ReactDOM.createRoot(document.querySelector("#root")).render(

  
  <React.StrictMode>
  <App />
  </React.StrictMode>
);