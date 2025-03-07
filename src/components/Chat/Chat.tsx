import React, { useState, useRef, useEffect } from 'react';
import bgimg from '../../assets/bgimg.png'; // Ensure this path is correct
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa'; // Import icons from react-icons

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [animationClass, setAnimationClass] = useState('animate-bounceInChat'); // Default animation

  useEffect(() => {
    // Auto-focus the input field when the chatbot opens
    const timer = setTimeout(() => {
      const textArea = document.getElementById('chat-input');
      if (textArea) {
        textArea.focus();
      }
    }, 500); // Wait for animation to complete

    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { type: 'user', content: inputMessage }]);
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: 'Hi! How can I assist you today?' 
        }]);
      }, 500);
      setInputMessage('');
      // Scroll to bottom after message is sent
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const services = [
    'Youtube Transcript Summarizer',
    'News Reader',
    'Text Summarizer',
    'Language Translator',
  ];

  // Convert the imported image to a URL for use in style
  const backgroundImageUrl = `url(${bgimg})`;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with animation duration
  };

  return (
    <div className={`fixed bottom-[75px] right-5 w-[500px] h-[800px] bg-white rounded-2xl flex flex-col z-[1000] transition-shadow duration-300 ${
      isClosing 
        ? 'animate-slideOutChat shadow-md' 
        : animationClass + ' shadow-xl'
    }`}>
      {/* Header with slight pulse animation on first load */}
      <div className="bg-[#172A2F] text-white p-2.5 rounded-t-2xl flex justify-between items-center">
        <h3 className="m-0 text-base font-belleza">WiseYak.ai</h3>
        <button 
          className="bg-transparent border-none text-white text-xl cursor-pointer p-0 w-6 h-6 leading-6 text-center hover:text-[#f0f0f0] transition-colors"
          onClick={handleClose}
          aria-label="Close chatbot"
        >
          ×
        </button>
      </div>

      {/* Chat Area with Cover Background */}
      <div className="flex-1 flex flex-col overflow-hidden relative rounded-b-2xl">
        {/* Body with Background Image */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-4 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: backgroundImageUrl }}
        >
          {/* Welcome Message with fade-in animation */}
          <div className="text-center animate-fadeIn">
            <p className="text-gray-600 mt-1">
              Do you want help with any of these services?
            </p>
          </div>

          {/* Services List with staggered animation effect */}
          <div className="grid grid-cols-2 gap-2">
            {services.map((service, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 p-2 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-left text-sm text-gray-800 hover:text-[#1E5631] transition-colors transform hover:scale-[1.02] transition-transform duration-150 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span>{service}</span>
              </button>
            ))}
          </div>

          {/* Messages Container with fade-in for new messages */}
          <div className={`flex-1 p-4 space-y-4 pb-24 ${messages.length === 0 ? 'overflow-hidden' : 'overflow-y-auto'}`}>
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4 animate-fadeIn" style={{ animationDelay: '300ms' }}>
                  <p className="text-gray-500">How may I help you today?</p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  style={{ animationDelay: '100ms' }}
                >
                  <div className={`max-w-[80%] rounded-xl p-3 ${
                    message.type === 'user' 
                      ? 'bg-[#172A2F] text-white' 
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area with subtle float-up animation */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[calc(100%-1rem)] mx-auto bg-white p-3 rounded-2xl backdrop-filter backdrop-blur-lg bg-opacity-90 shadow-lg animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <form onSubmit={handleSend} className="flex items-center space-x-2">
              <textarea
                id="chat-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#588085] max-h-20 text-sm"
                rows={1}
              />
              {/* Voice Icon Button */}
              <button
                type="button"
                className="text-[#172A2F] p-2 rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105 transition-transform duration-150"
                onClick={() => console.log('Voice input clicked')} // Add voice input logic here
                aria-label="Voice input"
              >
                <FaMicrophone size={20} />
              </button>
              
              {/* Send Button with Icon */}
              <button 
                type="submit"
                className="bg-[#172A2F] text-white rounded-lg p-2 hover:bg-[#174627] transition-colors flex items-center justify-center transform hover:scale-105 transition-transform duration-150"
                aria-label="Send message"
              >
                <FaPaperPlane size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;