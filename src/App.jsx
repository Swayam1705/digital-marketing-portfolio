import React from "react";
import GlobalImmersiveCanvas from "./components/GlobalImmersiveCanvas";
import CustomCursor from "./components/CustomCursor";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar";
import ImmersiveContent from "./components/ImmersiveContent";
import "./styles/immersive.css";

export default function App() {
  return (
    <div className="site-shell">
      {/* 1. Ultra-optimized Background Canvas */}
      <GlobalImmersiveCanvas />

      {/* 2. Interactive Cursor (Desktop only) */}
      <CustomCursor />

      {/* 3. Reading Progress Bar */}
      <ScrollProgressBar />

      {/* 4. Top Navigation */}
      <Navbar />

      {/* 5. Main Portfolio Content */}
      <ImmersiveContent />
    </div>
  );
}
