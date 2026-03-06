import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home";
import { Pricing } from "./screens/Pricing";
import { Dashboard } from "./screens/Dashboard";
import { CreatePlan } from "./screens/CreatePlan";
import { AssetRegistry } from "./screens/AssetRegistry";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/asset-registry" element={<AssetRegistry />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
