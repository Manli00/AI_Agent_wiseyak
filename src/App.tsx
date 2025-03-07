import "@fortawesome/fontawesome-free/css/all.min.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Transcript from "./components/YoutubeTranscript";
import VideoSection from "./components/Test";
import AudioWaveform from "./components/Waveform";


function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/youtube-transcript"  element={<Transcript />} />
        <Route path="/video" element={<VideoSection/>} />
        <Route path="/waveform" element={<AudioWaveform/>} />
       



      </Routes>
    </div>
  
  )
}

export default App
