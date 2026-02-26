import type { PersonalInfo } from '@/types';
import { MapPin, ChevronDown } from 'lucide-react';

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3.5s' }} />
      </div>
      
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative z-10 text-center px-4">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white bg-[length:200%_auto] animate-gradient">
            {personalInfo.name}
          </h1>
          <h2 className="text-2xl md:text-4xl mb-2 font-light">{personalInfo.role}</h2>
          <p className="text-xl md:text-2xl flex items-center justify-center gap-2">
            <MapPin size={24} />
            {personalInfo.location}
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#portfolio"
              className="group relative bg-white text-primary px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View My Work</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              className="group relative border-2 border-white px-8 py-3 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Contact Me</span>
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="text-white" size={24} strokeWidth={2} />
      </div>
    </div>
  );
}
