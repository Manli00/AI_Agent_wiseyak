import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import { FaYoutube, FaDownload, FaClock } from 'react-icons/fa';


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
  const playerRef = useRef<any>(null);
  const timeTrackingIntervalRef = useRef<number | null>(null);

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
        onError: () => {
          setError('Error loading video. Please check the URL and try again.');
        }
      }
    });
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      startTimeTracking();
    } else if (event.data === window.YT.PlayerState.PAUSED || 
               event.data === window.YT.PlayerState.ENDED) {
      stopTimeTracking();
    }
  };

  const startTimeTracking = () => {
    if (timeTrackingIntervalRef.current) {
      clearInterval(timeTrackingIntervalRef.current);
    }
    
    timeTrackingIntervalRef.current = window.setInterval(() => {
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
      setTimestamps([
        {
          id: 1,
          startTime: 4.446,
          endTime: 4.966,
          text: "Just like"
        },
        {
          id: 2,
          startTime: 15.120,
          endTime: 16.300,
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
      
      <div className="max-w-[80%] mx-auto mt-5">
        <div className="flex items-center space-x-4 mb-6">
          <FaYoutube size={64} className="text-red-600" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">YouTube Transcript Generator</h2>
            <p className="text-gray-600 text-base">Generate a formatted transcript for a YouTube video</p>
          </div>
        </div>

        <div className="mb-10 flex justify-start items-end">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-100 p-2 border border-gray-300 rounded-md mr-5"
            placeholder="Paste YouTube URL here..."
          />
          <button onClick={handleUrlSubmit} className="mt-3 px-3 bg-red-600 text-white py-2 rounded-md">
            Load Video
          </button>
        </div>
      </div>

      {displayUrl && (
        <div className="max-w-[80%] mx-auto mt-6 flex flex-col md:flex-row gap-6">
          {/* Video Section */}
          <div className="flex-1 bg-white rounded-xl shadow-lg">
            <div id="youtube-player" className="w-full aspect-video"></div>
          </div>

          {/* Transcript Section */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Transcript</h3>
              <button onClick={handleDownload} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
                <FaDownload /> Download
              </button>
            </div>

            <div className="h-[400px] overflow-y-auto space-y-2">
              {timestamps.map((t) => (
                <div key={t.id} onClick={() => jumpToTimestamp(t.startTime)} className="cursor-pointer p-3 rounded-lg hover:bg-gray-100">
                  <div className="text-sm text-gray-500"><FaClock /> {formatTime(t.startTime)} - {formatTime(t.endTime)}</div>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcript;
