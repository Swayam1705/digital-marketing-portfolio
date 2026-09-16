import React from "react";
import GlobalImmersiveCanvas from "./components/GlobalImmersiveCanvas";
import GlobalAmbientAudio from "./components/GlobalAmbientAudio";
import CustomCursor from "./components/CustomCursor";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar";
import ImmersiveContent from "./components/ImmersiveContent";
import "./styles/immersive.css";

export default function App() {
  return (
    <div className="site-shell">
      {/* 1. Global Visual Canvas */}
      <GlobalImmersiveCanvas />

      {/* 2. Seamless Ambient Audio (No buttons) */}
      <GlobalAmbientAudio />

      {/* 3. Interactive Cursor */}
      <CustomCursor />

      {/* 4. Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 5. Navigation */}
      <Navbar />

      {/* 6. Page Content */}
      <ImmersiveContent />
    </div>
  );
}
