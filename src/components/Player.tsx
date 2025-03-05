import React, { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SiriWave from "react-siriwave";
import { Mic } from "lucide-react";

const Player: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [smoothedAmplitude, setSmoothedAmplitude] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameId = useRef<number>();

  const smoothValue = useCallback((current: number, target: number) => {
    return current + (target - current) * 0.2;
  }, []);

  const processAudio = useCallback(() => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
    setSmoothedAmplitude((prev) => smoothValue(prev, volume / 64));
    animationFrameId.current = requestAnimationFrame(processAudio);
  }, [smoothValue]);

  const stopListening = useCallback(() => {
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (sourceRef.current) sourceRef.current.disconnect();
    if (audioContextRef.current) audioContextRef.current.close();
    setIsListening(false);
    setSmoothedAmplitude(0);
  }, []);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      analyser.fftSize = 512;
      source.connect(analyser);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      streamRef.current = stream;
      sourceRef.current = source;
      setIsListening(true);
      processAudio();
    } catch (err) {
      console.error("Audio processing error:", err);
    }
  }, [processAudio]);

  const toggleListening = useCallback(() => {
    isListening ? stopListening() : startListening();
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    return () => stopListening();
  }, [stopListening]);

  return (
    <div className="flex flex-col h-screen text-white font-roboto bg-[#000000] opacity-99 z-110">
      <Navbar />
     <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover -z-10 ">
        <source src="src\assets\66423-517408349.mp4" type="video/mp4" />
      </video> 
      

      
      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full text-center px-6 mt-60">
        <h1 className="text-6xl font-bold mb-4">What news do you want to hear?</h1>
        <p className="text-lg mt-6 mb-6 opacity-90 ">
          {isListening ? "What news do you want to hear?" : "Tap the mic to start listening"}
        </p>

        {/* Siri Wave Animation */}
        <div className="w-80 h-50 mt-40">
          <SiriWave theme="ios" amplitude={smoothedAmplitude} speed={10} frequency={5} cover={true}/>
        </div>

        {/* Mic Button */}
        <button
          onClick={toggleListening}
          className="mt-6 p-4 bg-white text-black rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
          aria-label={isListening ? "Stop Listening" : "Start Listening"}
          >
          <Mic size={32} />
        </button>
      </div>
      {/* <Footer /> */}
    </div>
    
  );
};

export default Player;