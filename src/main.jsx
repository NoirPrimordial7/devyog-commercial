import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/manrope";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MotionConfig>,
);
