import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Transcript from "./components/YoutubeTranscript";
import VideoSection from "./components/Test";

function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/youtube-transcript"  element={<Transcript />} />
        <Route path="/video" element={<VideoSection/>} />

      </Routes>
    </div>
  
  )
}

export default App
