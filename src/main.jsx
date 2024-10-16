import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DataWrapper } from "./context/Data.context.jsx";
import { AuthWrapper } from "./context/auth.context"
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <BrowserRouter>
      <DataWrapper>
        <App />
      </DataWrapper>
    </BrowserRouter>
  </AuthWrapper>
);
