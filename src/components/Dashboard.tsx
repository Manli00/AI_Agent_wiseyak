import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import msg from '../assets/msg.png';
import Chatbot from './Chat/Chat'; // Assuming this is the correct path to your Chatbot component

interface ServiceCardProps {
  imagesrc: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ imagesrc, title, subtitle, description, path }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="service-card content-center max-w-70 bg-[#172a2f08] my-5 rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl border-2 border-transparent hover:border-gray-500"
      onClick={() => navigate(path)}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-[#02cafc] bg-orange-50 p-6 rounded-full">
          <img src={imagesrc} alt={title} className="w-16 h-16 object-contain" />
        </div>

        <div className="text-center space-y-3">
          <div>
            <h3 className="text-2xl font-bold text-[#33475b] font-sans">
              {title}
            </h3>
            <p className="text-xl font-semibold text-[#33475b] font-sans">
              {subtitle}
            </p>
          </div>

          <p className="text-[#33475b] font-sans">
            {description}
          </p>
        </div>

        <button
          onClick={() => navigate(path)}
          className="w-full px-6 py-2 text-sm md:text-base font-medium text-[#0088cc] bg-transparent border border-[#0088cc] rounded-md hover:bg-[#0088cc] hover:text-white transition-all duration-300"
        >
          Launch
        </button>
      </div>
    </div>
  );
};

const services: ServiceCardProps[] = [
  {
    imagesrc: "src/assets/youtube.png",
    title: "Youtube Transcript",
    subtitle: "Generator",
    description: "Convert YouTube videos to text with ease",
    path: "/youtube-transcript"
  },
  {
    imagesrc: "src/assets/player.png",
    title: "News Player",
    subtitle: "Reader",
    description: "Listen to news articles and summary with AI",
    path: "/player"
  },
  {
    imagesrc: "src/assets/note.png",
    title: "Text Summary",
    subtitle: "Analyzer",
    description: "Generate concise summaries from long texts",
    path: "/text-summary"
  },
  {
    imagesrc: "src/assets/translate.png",
    title: "LanguageTranslator",
    subtitle: "Multi-lingual",
    description: "Translate content across 100+ languages",
    path: "/translator"
  },
  {
    imagesrc: "src/assets/voice.png",
    title: "Speech to Text",
    subtitle: "Converter",
    description: "Transform audio into written content",
    path: "/speech-to-text"
  },
  {
    imagesrc: "src/assets/convert.png",
    title: "Format Converter",
    subtitle: "Multi-format",
    description: "Convert between various file formats",
    path: "/format-converter"
  },
  {
    imagesrc: "src/assets/batch-processing.png",
    title: "Batch Processing",
    subtitle: "Bulk Handler",
    description: "Process multiple files simultaneously",
    path: "/batch-processing"
  },
  {
    imagesrc: "src/assets/timeline.png",
    title: "Timeline Maker",
    subtitle: "Video Timeline",
    description: "Create interactive video timelines",
    path: "/timeline-maker"
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const servicesRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showChatButtonAnimation, setShowChatButtonAnimation] = useState(false);

  useEffect(() => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer for services section
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting); // Toggle visibility based on intersection
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    // Add animation to chat button after a delay
    const timer = setTimeout(() => {
      setShowChatButtonAnimation(true);
    }, 2000);

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
      clearTimeout(timer);
    };
  }, []);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
    // When opening the chatbot, stop the animation
    if (!isChatbotOpen) {
      setShowChatButtonAnimation(false);
    }
  };

  return (
    <div className="dashboard-container min-h-screen relative font-sans">
      <Navbar />
      <div className='h-[100px]'></div>

      <div className='main-content flex flex-col justify-between items-center mt-20'>
        <p className='title text-6xl md:text-7xl text-white font-bold text-center mt-50 my-10 leading-tight tracking-tight'>
          The Professional Network For <span className='text-6xl md:text-7xl ai-agents-span'>AI Agents</span>
        </p>

        <div className='description mt-5'>
          <p className='text-center text-[#fffefe] text-lg md:text-xl leading-[1.8] font-medium tracking-wide max-w-3xl mx-auto'>
            An innovative marketplace and network where AI agents and enthusiasts connect, collaborate, and innovate.
          </p>
          <p className='text-center text-[#ffffff] text-lg md:text-xl leading-[1.8] font-medium tracking-wide max-w-3xl mx-auto'>
            Connect, hire, and leverage AI agents for impactful tasks.
          </p>
        </div>

        <div className='cta mt-12 flex justify-center'>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 text-lg md:text-xl font-medium text-[#f9f9f9] bg-transparent border border-[#ffffff] rounded-md hover:bg-[#0088cc] hover:text-white transition-all duration-300 hover:border-none"
          >
            Get Started
          </button>
        </div>
      </div>

      <div 
        ref={servicesRef}
        className={`services-section px-4 py-16 mx-auto max-w-7xl mt-50 ${isVisible ? 'visible' : ''}`}
      >
        <div className="section-title text-center mb-16">
          <h2 className="text-2xl md:text-6xl font-bold text-[#172A2F] mb-4">
            Featured Agents
          </h2>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>

      {/* Chat Button with animation */}
      <button 
        className={`fixed bottom-20 right-10 opacity-90 chat-button ${
          showChatButtonAnimation ? 'animate-pulseButton' : ''
        } transition-transform hover:scale-110 duration-300`}
        onClick={toggleChatbot}
        aria-label="Open chat"
      >
        <div className="relative">
          <img src={msg} alt="Chatnow" className="w-14 h-14" />
          {showChatButtonAnimation && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0088cc] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0088cc]"></span>
            </span>
          )}
        </div>
      </button>

      {/* Chatbot Popup */}
      {isChatbotOpen && <Chatbot onClose={toggleChatbot} />}

      <Footer />
    </div>
  );
};

export default Dashboard;