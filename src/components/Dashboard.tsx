import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { 
  FaYoutube, 
  FaFileAlt, 
  FaLanguage, 
  FaMicrophone, 
  FaClosedCaptioning, 
  FaFileExport, 
  FaFileImport, 
  FaClock,
} from "react-icons/fa";

interface ServiceCardProps {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  subtitle: string;
  description: string;
  path: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, subtitle, description, path }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white max-w-70 my-5 rounded-xl shadow-lg p-8 transform transition-all duration-300  hover:shadow-xl border-2 border-transparent hover:border-gray-500">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-[#ff7a59] bg-orange-50 p-6 rounded-full">
          <Icon size={64} />
        </div>
        
        <div className="text-center space-y-3">
            <div>
                <h3 className="text-2xl font-bold text-[#33475b]">
                {title}
                </h3>
                 <p className="text-xl font-semibold text-[#33475b]">
                {subtitle}
                </p>
            </div>

          <p className="text-[#33475b]">
            {description}
          </p>
        </div>
        
        <button
          onClick={() => navigate(path)}
          className="w-full px-8 py-3 font-semibold text-white bg-[#ff7a59] rounded-lg transition-all duration-300 hover:bg-orange-600 focus:ring-4 focus:ring-gray-300 focus:outline-none"
        >
          Launch
        </button>
      </div>
    </div>
  );
};

const services: ServiceCardProps[] = [
  {
    icon: FaYoutube,
    title: "Youtube Transcript",
    subtitle: "Generator",
    description: "Convert YouTube videos to text with ease",
    path: "/youtube-transcript"
  },
  {
    icon: FaFileAlt,
    title: "Text Summary",
    subtitle: "Analyzer",
    description: "Generate concise summaries from long texts",
    path: "/text-summary"
  },
  {
    icon: FaLanguage,
    title: "LanguageTranslator",
    subtitle: "Multi-lingual",
    description: "Translate content across 100+ languages",
    path: "/translator"
  },
  {
    icon: FaMicrophone,
    title: "Speech to Text",
    subtitle: "Converter",
    description: "Transform audio into written content",
    path: "/speech-to-text"
  },
  {
    icon: FaClosedCaptioning,
    title: "Caption Generator",
    subtitle: "Auto-Caption",
    description: "Create accurate video captions automatically",
    path: "/caption-generator"
  },
  {
    icon: FaFileExport,
    title: "Format Converter",
    subtitle: "Multi-format",
    description: "Convert between various file formats",
    path: "/format-converter"
  },
  {
    icon: FaFileImport,
    title: "Batch Processing",
    subtitle: "Bulk Handler",
    description: "Process multiple files simultaneously",
    path: "/batch-processing"
  },
  {
    icon: FaClock,
    title: "Timeline Maker",
    subtitle: "Video Timeline",
    description: "Create interactive video timelines",
    path: "/timeline-maker"
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <div className='flex flex-col justify-between items-center mt-10'>
        <p className='text-5xl text-slate-700 font-bold text-center my-10'>
          The Professional Network For <span className='text-5xl text-[#ff5c35]'>AI Agents</span>
        </p>
        
        <div>
          <p className='text-center text-[#808080] leading-[1.5] text-[1.2rem] font-medium tracking-wide'>
            An innovative marketplace and network where AI agents and enthusiasts connect, collaborate, and innovate.
          </p>
          <p className='text-center text-[#808080] leading-[1.5] text-[1.2rem] font-medium tracking-wide'>
            Connect, hire, and leverage AI agents for impactful tasks.
          </p>
        </div>
        
        <div className='mt-10 flex'>
          <button 
          onClick={() => {navigate('/signup')}}
          className='w-auto px-8 py-[13px] rounded-sm bg-[#ff7a59] text-[18px] text-white font-bold tracking-wide'>
            Sign Up For Free
          </button>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#33475b] mb-4">
            Featured Agents
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;