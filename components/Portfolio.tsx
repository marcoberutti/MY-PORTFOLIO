'use client';

import type { GitHubRepo } from '@/types';
import { isRepoNew } from '@/lib/github';
import { Star, GitBranch, ExternalLink, Github, Calendar, Code2, Database, Box, Braces } from 'lucide-react';

interface PortfolioProps {
  repos: GitHubRepo[];
}

// Map programming languages to lucide-react icons
const getLanguageIcon = (language: string | null) => {
  if (!language) return <Code2 size={16} />;
  
  const lang = language.toLowerCase();
  
  // Map common languages to icons
  if (lang.includes('python')) return '🐍';
  if (lang.includes('javascript') || lang.includes('js')) return '⚡';
  if (lang.includes('typescript') || lang.includes('ts')) return '💙';
  if (lang.includes('java')) return '☕';
  if (lang.includes('php')) return '🐘';
  if (lang.includes('c++') || lang.includes('cpp')) return '⚙️';
  if (lang.includes('c#') || lang.includes('csharp')) return '🎯';
  if (lang.includes('go')) return '🐹';
  if (lang.includes('rust')) return '🦀';
  if (lang.includes('ruby')) return '💎';
  if (lang.includes('swift')) return '🕊️';
  if (lang.includes('kotlin')) return '🅺';
  if (lang.includes('html')) return '🌐';
  if (lang.includes('css')) return '🎨';
  if (lang.includes('shell') || lang.includes('bash')) return '🖥️';
  if (lang.includes('sql')) return <Database size={16} />;
  if (lang.includes('docker')) return <Box size={16} />;
  
  // Default icon
  return <Code2 size={16} />;
};

export default function Portfolio({ repos }: PortfolioProps) {
  if (repos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-4">Unable to load repositories</h3>
        <p className="text-gray-600 mb-4">Visit my GitHub profile to see my projects:</p>
        <a 
          href="https://github.com/marcoberutti?tab=repositories" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition"
        >
          View GitHub →
        </a>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {repos.map((repo) => {
        const createdDate = new Date(repo.created_at);
        const formattedDate = createdDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        return (
          <div 
            key={repo.id} 
            className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/30 hover:translate-y-[-4px]"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6">
              {/* NEW Badge */}
              {isRepoNew(repo.created_at) && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg animate-pulse">
                  NEW
                </span>
              )}

              {/* Repo name */}
              <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                <Github className="text-gray-600 group-hover:text-primary transition-colors" size={20} />
                {repo.name.replace(/-/g, ' ').replace(/\s+/g, ' ')}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 min-h-[3rem] text-sm line-clamp-3">
                {repo.description || 'No description yet...'}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="flex items-center justify-center">{getLanguageIcon(repo.language)}</span>
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} /> {repo.stargazers_count}
                </span>
                {repo.forks_count > 0 && (
                  <span className="flex items-center gap-1 hover:text-primary transition-colors">
                    <GitBranch size={14} /> {repo.forks_count}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                <Calendar size={12} />
                {formattedDate}
              </p>

              {/* Link to repo */}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative block bg-primary text-white px-4 py-2 rounded-lg text-center font-medium overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Repository <ExternalLink className="group-hover/btn:translate-x-1 transition-transform" size={14} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
