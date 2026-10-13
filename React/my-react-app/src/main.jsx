import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";

const clientId = "198585843015-1mehd6q9pgk4i4n9vf570je8050pp3uc.apps.googleusercontent.com"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);