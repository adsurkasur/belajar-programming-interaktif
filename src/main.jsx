import React from "react";
import { createRoot } from "react-dom/client";
import Pretest from "../pretest-webdev.jsx";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Pretest />
  </React.StrictMode>,
);
