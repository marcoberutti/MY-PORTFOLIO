'use client';

import { useEffect } from 'react';
import type { PersonalInfo } from '@/types';
import { Github, Linkedin, Phone, Mail, Phone as PhoneIcon } from 'lucide-react';

interface FooterProps {
  personalInfo: PersonalInfo;
}

export default function Footer({ personalInfo }: FooterProps) {
  useEffect(() => {
    // Load Credly script only on client-side to avoid hydration errors
    const script = document.createElement('script');
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <footer className="bg-gradient-to-r from-primary-dark to-primary-light text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Marco Berutti</h3>
            <p className="text-gray-200">{personalInfo.role}</p>
            <p className="text-gray-200">{personalInfo.location}</p>
          </div>

          {/* Center Column - Badges */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-200 mb-4">Certifications</p>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <div 
                data-iframe-width="180" 
                data-iframe-height="270" 
                data-share-badge-id="79ffee15-e508-43ae-85a0-e05b6761ff3f" 
                data-share-badge-host="https://www.credly.com"
              />
              <div 
                data-iframe-width="180" 
                data-iframe-height="270" 
                data-share-badge-id="40a059fd-088d-497e-b8f5-fd0e0337ddf7" 
                data-share-badge-host="https://www.credly.com"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-200">
              <p className="flex items-center gap-2 justify-center md:justify-end">
                <PhoneIcon size={16} />
                {personalInfo.phone}
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-end">
                <Mail size={16} />
                {personalInfo.email}
              </p>
              <div className="flex gap-4 mt-4 justify-center md:justify-end">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Github size={24} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Linkedin size={24} />
                </a>
                <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                  <Phone size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-400 text-center text-gray-200 text-sm">
          <p>&copy; {new Date().getFullYear()} Marco Berutti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
