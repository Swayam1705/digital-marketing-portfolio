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
      <GlobalImmersiveCanvas />
      <GlobalAmbientAudio />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <ImmersiveContent />
    </div>
  );
}
