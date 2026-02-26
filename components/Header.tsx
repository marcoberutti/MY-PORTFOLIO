'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Phone, Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = section === 'home' 
          ? document.body 
          : document.getElementById(section);
        
        if (element) {
          const offsetTop = section === 'home' ? 0 : element.offsetTop;
          const offsetBottom = offsetTop + (section === 'home' ? window.innerHeight : element.offsetHeight);
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#', label: 'Home', id: 'home' },
    { href: '#portfolio', label: 'Portfolio', id: 'portfolio' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-primary-dark to-primary-light text-white shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                href={item.href} 
                className="relative py-2 transition-all duration-300 group"
              >
                <span className="relative z-10">{item.label}</span>
                {/* Gradient animated underline */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full transition-all duration-300 ease-out ${
                  activeSection === item.id 
                    ? 'w-full opacity-100' 
                    : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`} />
                {/* Glow effect on hover */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-yellow-400 blur-sm transition-all duration-300 ${
                  activeSection === item.id
                    ? 'w-full opacity-50'
                    : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a href="https://github.com/marcoberutti" target="_blank" rel="noopener noreferrer" className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 group">
              <Github size={20} />
              <span className="absolute inset-0 rounded-lg bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/marco-berutti-b960512a3" target="_blank" rel="noopener noreferrer" className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 group">
              <Linkedin size={20} />
              <span className="absolute inset-0 rounded-lg bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=393801208036" target="_blank" rel="noopener noreferrer" className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110 group">
              <Phone size={20} />
              <span className="absolute inset-0 rounded-lg bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Mobile Navigation with animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="pb-4 pt-2 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                href={item.href} 
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  activeSection === item.id ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
