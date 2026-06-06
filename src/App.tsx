import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import LandingPage from "./LandingPage";
import Wiki from "./Wiki";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects/:projectId" element={<Wiki />} />
      </Routes>
    </AnimatePresence>
  );
}