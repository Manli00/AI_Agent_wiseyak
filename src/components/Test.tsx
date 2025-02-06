import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import { FaYoutube, FaDownload, FaClock, FaPlay, FaPause, FaBackward, FaForward, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Timestamp {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

const Transcript: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [displayUrl, setDisplayUrl] = useState('');
  const [error, setError] = useState('');
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef<any>(null);
  const timeTrackingIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        if (displayUrl) {
          const videoId = getYouTubeId(displayUrl);
          if (videoId) initializePlayer(videoId);
        }
      };
    } else if (displayUrl) {
      const videoId = getYouTubeId(displayUrl);
      if (videoId) initializePlayer(videoId);
    }

    return () => {
      if (timeTrackingIntervalRef.current) {
        clearInterval(timeTrackingIntervalRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [displayUrl]);

  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const initializePlayer = (videoId: string) => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }
    
    playerRef.current = new window.YT.Player('youtube-player', {
      videoId,
      events: {
        onStateChange: onPlayerStateChange,
        onReady: (event: any) => {
          setDuration(event.target.getDuration());
        },
        onError: (event: any) => {
          setError('Error loading video. Please check the URL and try again.');
        }
      }
    });
  };

  const startTimeTracking = () => {
    if (timeTrackingIntervalRef.current) {
      clearInterval(timeTrackingIntervalRef.current);
    }
    
    timeTrackingIntervalRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 100);
  };

  const stopTimeTracking = () => {
    if (timeTrackingIntervalRef.current) {
      clearInterval(timeTrackingIntervalRef.current);
    }
  };

  const handleUrlSubmit = () => {
    if (!videoUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    const youtubeId = getYouTubeId(videoUrl);
    if (youtubeId) {
      setDisplayUrl(`https://www.youtube.com/embed/${youtubeId}`);
      setError('');
      // Mock timestamps - replace with actual API call
      setTimestamps([
        {
          id: 1,
          startTime: 4.446,
          endTime: 4.966,
          text: "Just like"
        },
        {
          id: 2,
          startTime: 5.120,
          endTime: 6.300,
          text: "Like a scene from a dream"
        }
      ]);
    } else {
      setError('Invalid YouTube URL');
    }
  };

  const handleDownload = () => {
    const transcript = timestamps
      .map(t => `[${formatTime(t.startTime)} - ${formatTime(t.endTime)}] ${t.text}`)
      .join('\n');
    
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const jumpToTimestamp = (startTime: number) => {
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(startTime);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <div className="flex flex-col justify-center items-start p-6 bg-white rounded-lg shadow-lg max-w-[90%] mx-auto mt-5">
        <div className="flex items-center space-x-4 mb-6">
          <FaYoutube size={64} className="text-red-600" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">YouTube Transcript Generator</h2>
            <p className="text-gray-600 text-base">Generate a formatted transcript for a YouTube video</p>
          </div>
        </div>

        <div className="w-full mb-4">
          <label htmlFor="youtube-url" className="block text-sm font-bold text-gray-700 mb-2">
            Enter the YouTube URL
          </label>
          <input
            id="youtube-url"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Paste YouTube URL here..."
          />
          <div className="my-4">
            <button 
              onClick={handleUrlSubmit}
              className="px-3 bg-red-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Load Video
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>

      {displayUrl && (
        <div className="max-w-[90%] mx-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                <div id="youtube-player" className="w-full aspect-video"></div>
                
                <div className="p-4 border-t border-gray-100">
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) => playerRef.current?.seekTo(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{`formatDuration(currentTime)`}</span>
                      <span>{`formatDuration(duration)`}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleSeek(-10)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <FaBackward className="text-gray-700" />
                      </button>
                      
                      <button
                        onClick={handlePlayPause}
                        className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </button>
                      
                      <button
                        onClick={() => handleSeek(10)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <FaForward className="text-gray-700" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleMute}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        {isMuted ? <FaVolumeMute className="text-gray-700" /> : <FaVolumeUp className="text-gray-700" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Transcript</h3>
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FaDownload /> Download
                </button>
              </div>
              <div className="max-h-[600px] overflow-y-auto space-y-2">
                {timestamps.map((timestamp) => (
                  <div
                    key={timestamp.id}
                    onClick={() => jumpToTimestamp(timestamp.startTime)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentTime >= timestamp.startTime && currentTime <= timestamp.endTime
                        ? 'bg-red-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                      <FaClock />
                      {formatTime(timestamp.startTime)} - {formatTime(timestamp.endTime)}
                    </div>
                    <p className="text-gray-800">{timestamp.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcript;