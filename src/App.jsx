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
      <GlobalImmersiveCanvas />
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <ImmersiveContent />
    </div>
  );
}
