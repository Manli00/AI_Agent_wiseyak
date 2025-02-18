import React, { useState, useRef, useEffect } from 'react';

import { FaYoutube, FaDownload, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import MediaWaveform from './Waveform';

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
  text1: string;
  text2: string;

}

const Transcript: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [displayUrl, setDisplayUrl] = useState('');
  const [error, setError] = useState('');
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<{ index: number; field: string } | null>(null);
  const playerRef = useRef<any>(null);
  const timeTrackingIntervalRef = useRef<number | null>(null);

  const [language, setLanguage] = useState("en");
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'textbox' | 'translate'>('translate')
  const [videoLoaded , setvideoLoaded] = useState<boolean>(false);
  const [sidebarOpened, setSidebarOpened] = useState<boolean>(false);

  const languages = {
    en: "English",
    de: "Deutsch",
    fr: "Français",
    es: "Español",
  };

  const navigate = useNavigate();

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

  useEffect(() => {
 
    const currentIndex = timestamps.findIndex(
      t => currentTime >= t.startTime && currentTime <= t.endTime
    );
    setActiveIndex(currentIndex !== -1 ? currentIndex : null);
  }, [currentTime, timestamps]);

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
      // Your existing timestamps data remains the same
      setTimestamps(
        [
          {
            "id": 1,
            "startTime": 0.500,
            "endTime": 2.000,
            "text1": "In the beginning",
            "text2": "Am Anfang"
          },
          {
            "id": 2,
            "startTime": 2.300,
            "endTime": 3.500,
            "text1": "A whisper in the wind",
            "text2": "Ein Flüstern im Wind"
          },
          {
            "id": 3,
            "startTime": 4.446,
            "endTime": 4.966,
            "text1": "Just like",
            "text2": "Genau wie"
          },
          {
            "id": 4,
            "startTime": 5.500,
            "endTime": 7.000,
            "text1": "The stars align",
            "text2": "Die Sterne richten sich aus"
          },
          {
            "id": 5,
            "startTime": 8.120,
            "endTime": 10.300,
            "text1": "Like a scene from a dream",
            "text2": "Wie eine Szene aus einem Traum"
          },
          {
            "id": 6,
            "startTime": 11.000,
            "endTime": 12.500,
            "text1": "Lost in time",
            "text2": "Verloren in der Zeit"
          },
          {
            "id": 7,
            "startTime": 13.200,
            "endTime": 15.400,
            "text1": "A melody plays",
            "text2": "Eine Melodie erklingt"
          },
          {
            "id": 8,
            "startTime": 16.000,
            "endTime": 17.800,
            "text1": "Soft and serene",
            "text2": "Sanft und heiter"
          },
          {
            "id": 9,
            "startTime": 18.500,
            "endTime": 20.000,
            "text1": "Carried by echoes",
            "text2": "Getragen von Echos"
          },
          {
            "id": 10,
            "startTime": 21.300,
            "endTime": 23.000,
            "text1": "Through endless skies",
            "text2": "Durch endlose Himmel"
          },
          {
            "id": 11,
            "startTime": 24.000,
            "endTime": 25.500,
            "text1": "Floating away",
            "text2": "Davonschwebend"
          },
          {
            "id": 12,
            "startTime": 26.200,
            "endTime": 28.300,
            "text1": "Like a distant memory",
            "text2": "Wie eine ferne Erinnerung"
          },
          {
            "id": 13,
            "startTime": 29.500,
            "endTime": 31.200,
            "text1": "Fading into the night",
            "text2": "Verschwindet in der Nacht"
          },
          {
            "id": 14,
            "startTime": 32.000,
            "endTime": 34.000,
            "text1": "Guided by moonlight",
            "text2": "Vom Mondlicht geführt"
          },
          {
            "id": 15,
            "startTime": 35.500,
            "endTime": 37.100,
            "text1": "Dreams take flight",
            "text2": "Träume erheben sich"
          },
          {
            "id": 16,
            "startTime": 38.500,
            "endTime": 40.000,
            "text1": "In silent wonder",
            "text2": "In stiller Verwunderung"
          },
          {
            "id": 17,
            "startTime": 41.200,
            "endTime": 43.000,
            "text1": "A story untold",
            "text2": "Eine ungesagte Geschichte"
          },
          {
            "id": 18,
            "startTime": 44.500,
            "endTime": 46.300,
            "text1": "Drifting apart",
            "text2": "Treiben auseinander"
          },
          {
            "id": 19,
            "startTime": 47.000,
            "endTime": 49.200,
            "text1": "Yet never alone",
            "text2": "Doch niemals allein"
          },
          {
            "id": 20,
            "startTime": 50.000,
            "endTime": 51.500,
            "text1": "Time stands still",
            "text2": "Die Zeit bleibt stehen"
          },
          {
            "id": 21,
            "startTime": 52.300,
            "endTime": 54.000,
            "text1": "Under starlit skies",
            "text2": "Unter sternenklaren Himmeln"
          },
          {
            "id": 22,
            "startTime": 55.500,
            "endTime": 57.300,
            "text1": "A whisper calls",
            "text2": "Ein Flüstern ruft"
          },
          {
            "id": 23,
            "startTime": 58.000,
            "endTime": 60.000,
            "text1": "To the heart",
            "text2": "Zum Herzen"
          },
          {
            "id": 24,
            "startTime": 61.200,
            "endTime": 63.500,
            "text1": "Guiding the way",
            "text2": "Den Weg weisen"
          },
          {
            "id": 25,
            "startTime": 64.000,
            "endTime": 66.500,
            "text1": "To forevermore",
            "text2": "Bis in alle Ewigkeit"
          }
        ]
        
        
      );
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
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const handleTimestampUpdate = (index: number, field: keyof Timestamp, value: string) => {
    const updatedTimestamps = [...timestamps];
    const timestamp = updatedTimestamps[index];

    if (field === 'text1' || field === 'text2') {
      timestamp[field] = value;
    } else {
      const timeInSeconds = parseTimeString(value);
      if (timeInSeconds !== null) {
        timestamp[field] = timeInSeconds;
      }
    }

    setTimestamps(updatedTimestamps);
  };

  const parseTimeString = (timeStr: string): number | null => {
    // Handle HH:MM:SS.MS format
    const match = timeStr.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{2})$/);
    if (match) {
      const [_, hours, minutes, seconds, milliseconds] = match;
      return parseInt(hours) * 3600 + 
             parseInt(minutes) * 60 + 
             parseInt(seconds) + 
             parseInt(milliseconds) / 100;
    }
    return null;
  };

  const handleTextClick = (index: number, field: string) => {
    setEditingField({ index, field });
    };
    
  const handleTextBlur = () => {
    setEditingField(null);
    };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
    setEditingField(null);
    }
    };


  return (
    <div className="min-h-screen bg-gray-900">
      <div className='h-[75px] flex justify-between items-center bg-slate-700 pl-4 py-2'>
          <div>
            {!videoLoaded ? (
              <div>
                   <span className='text-4xl font-bold text-white'>wiseagent.ai</span>
              </div>
             
            ) :
            (<div className="flex items-center space-x-4 mb-6 mt-5">
              <FaYoutube size={48} className="text-red-600" />
              <div>
                <h2 className="text-2xl font-semibold text-white">YouTube Transcript Generator</h2>
                <p className="text-gray-400">Generate a formatted transcript for a YouTube video</p>
              </div>
            </div> )}
          </div> 

          <div className='flex gap-6 mr-5'>
              <button 
              onClick={() => navigate('/login')}
              className='py-1 px-6 text-lg font-bold bg-[#ff7a59] rounded-sm text-white'>
                  Log In
              </button>

              <button 
              onClick={() => navigate('/signup')}
              className='py-1 px-5 text-lg font-bold bg-[#ff7a59] rounded-sm text-white'>
                  Sign Up
              </button>
          </div>
          
      </div>


      
   <div className="max-w-full mx-auto p-4 flex gap-4">

      <div className="relative h-[calc(100vh - 75px)]">
        <div
          className={`
            fixed top-[75px] left-0 h-full bg-gray-800 text-white
            transition-all duration-300 ease-in-out
            ${sidebarOpened ? 'w-50' : 'w-8'}
          `}
          >
        
          <div className="p-4">
            <div className={`${sidebarOpened ? 'block' : 'hidden'}`}>
              <nav>
                <ul className="space-y-2">
                  <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Home</li>
                  <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Profile</li>
                  <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Agents</li>
                  <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">Help</li>
                  <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">FAQ</li>

                </ul>
              </nav>
            </div>
          </div>

          
          <button
            onClick={() => setSidebarOpened(!sidebarOpened)}
            className="absolute top-2/5 -right-4 bg-gray-800 rounded-full p-1 
                      hover:bg-gray-700 transition-colors duration-200"
          >
            {sidebarOpened ? 
              <ChevronLeft className="w-6 h-6 text-white" /> : 
              <ChevronRight className="w-6 h-6 text-white" />
            }
          </button>
        </div>
      </div>
      

      <div className={`transition-all duration-300 ease-in-out 
        ${sidebarOpened ? 'ml-50' : 'ml-8'}`}>
        {!videoLoaded && ( <div className="mb-6 max-w-3xl flex gap-4">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-md"
            placeholder="Paste YouTube URL here..."
          />
          <button 
            onClick={() => { handleUrlSubmit();
              setvideoLoaded(true);
            }}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Load Video
          </button>
        </div> )}
      



        {displayUrl && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-4">
              <div id="youtube-player" className="w-full h-[70%] aspect-video"></div>
            </div>
  
            <div className="bg-gray-900 p-4">
            <div className="flex justify-between items-center mb-4">
           
            <div>
              <button
              onClick={() => setActiveTab('translate')}
              className={`px-4 py-2 rounded-l-lg 
                ${activeTab === 'translate' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-white'}

              `}
              >
                Transcript
              </button>

              <button
              onClick={() => setActiveTab('textbox')}
              className={`px-4 py-2 rounded-r-lg 
                ${activeTab === 'textbox' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-white'}

              `}
              >
                Description
              </button>
            </div>

            <div className='flex gap-6'>
              <div className='relative'>
               
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                   {languages[language]} ▼
                </button>
                
                {isOpen && (
                  <div className="absolute left-0 mt-2 w-32 bg-gray-600 border border-gray-700 rounded shadow-lg">
                    {Object.entries(languages).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code);
                          setIsOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-700"
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                <FaDownload />
                Download
              </button>
            </div>
          </div>

          {activeTab === 'translate' && ( 
            <div className="h-[calc(100vh-300px)] overflow-y-auto">
              {timestamps.map((t, index) => (
              <div
                key={t.id}
                className={`flex items-start  border-b border-gray-700 transition-colors ${
                  activeIndex === index ? 'bg-gray-700' : ''
                }`}
                >
                <div className="w-32 h-full flex-shrink-0 border-r border-gray-500 py-6">
                  <div className="flex items-center text-gray-400 text-sm">
                    <span className="mr-2">⬆</span>
                    <span 
                      onClick={() => handleTextClick(index, 'startTime')}
                      className="cursor-text"
                    >
                      {editingField?.index === index && editingField.field === 'startTime' ? (
                        <input
                          type="text"
                          value={formatTime(t.startTime)}
                          onChange={(e) => handleTimestampUpdate(index, 'startTime', e.target.value)}
                          onBlur={handleTextBlur}
                          onKeyDown={handleTextKeyDown}
                          className="w-24 bg-gray-800 text-white px-1 rounded"
                          autoFocus
                        />
                      ) : (
                        formatTime(t.startTime)
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <span className="mr-2">⬇</span>
                    <span 
                      onClick={() => handleTextClick(index, 'endTime')}
                      className="cursor-text"
                    >
                      {editingField?.index === index && editingField.field === 'endTime' ? (
                        <input
                          type="text"
                          value={formatTime(t.endTime)}
                          onChange={(e) => handleTimestampUpdate(index, 'endTime', e.target.value)}
                          onBlur={handleTextBlur}
                          onKeyDown={handleTextKeyDown}
                          className="w-24 bg-gray-800 text-white px-1 rounded"
                          autoFocus
                        />
                      ) : (
                        formatTime(t.endTime)
                      )}
                    </span>
                  </div>
                  <div className='flex items-center text-gray-400 gap-3 text-sm'>
                    <FaClock />
                    <span>{formatTime(t.endTime-t.startTime)}</span>
                  </div>
                  <div>
                    <span className='text-gray-400'><span className='font-bold'>#</span>{t.id}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className='flex flex-col w-full'>
              
                      <div 
                        className="w-full  text-white cursor-text p-5 rounded border-b border-gray-500 hover:bg-gray-800"
                        onClick={() => handleTextClick(index, 'text1')}
                        >
                        {editingField?.index === index && editingField.field === 'text1' ? (
                          <input
                            type="text"
                            value={t.text1}
                            onChange={(e) => handleTimestampUpdate(index, 'text1', e.target.value)}
                            onBlur={handleTextBlur}
                            onKeyDown={handleTextKeyDown}
                            className="w-full text-white rounded border-none focus:ring-0 outline-none"
                            autoFocus
                          />
                        ) : (
                          <div
                          className='w-full'
                          onClick={() => jumpToTimestamp(t.startTime)}>
                            {t.text1}
                          </div>
                        )}
                      </div>
                      <div 
                        className="w-full text-white cursor-text p-4 rounded hover:bg-gray-800"
                        onClick={() => handleTextClick(index, 'text2')}
                        >
                        {editingField?.index === index && editingField.field === 'text2' ? (
                          <input
                            type="text"
                            value={t.text2}
                            onChange={(e) => handleTimestampUpdate(index, 'text2', e.target.value)}
                            onBlur={handleTextBlur}
                            onKeyDown={handleTextKeyDown}
                            className="w-full text-white rounded border-none focus:ring-0 outline-none"
                            autoFocus
                          />
                        ) : (
                          <div 
                          className='w-full'
                          onClick={() => jumpToTimestamp(t.startTime)}>
                            {t.text2}
                          </div>
                        )}
                      </div>
                        
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
          {activeTab === 'textbox' && (
            <div className="h-[calc(100vh-300px)] overflow-y-auto">
              <span className='text-white'>text box here</span>
            </div>
          )}
        </div>
      </div>
      
      )}
      </div>
    
    </div>
    <MediaWaveform />
  </div>

  );
};

export default Transcript;