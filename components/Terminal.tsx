"use client";
import React, { useState, useRef } from 'react';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { EMAIL, CV_URL } from '@/lib/constants';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [themeColor, setThemeColor] = useState('text-green-400'); // Nouveau : Gestion du thème
  const [history, setHistory] = useState([
    'System initialization...',
    'Welcome, developer. Type "help" to see available commands.'
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useAutoScroll(scrollRef, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response = "";

    // LOGIQUE CAS PAR CAS
    switch (cmd) {
      case 'help':
        response = "Available: bio, contact, cv, theme [color], clear";
        break;

      case 'bio':
        response = "🤖 Informaticien passionné par la résolution de problèmes complexes.";
        break;

      case 'contact': {
        response = "📧 Tentative d'ouverture de votre client mail...";
        const mailLink = document.createElement('a');
        mailLink.href = `mailto:${EMAIL}`;
        mailLink.click();
        break;
      }

      case 'cv':
        response = "📄 Téléchargement du CV en cours...";
        setTimeout(() => {
          window.open(CV_URL, '_blank');
        }, 1000);
        break;

      // EXERCICE : Changer la couleur du texte dynamiquement
      case 'theme red':
        setThemeColor('text-red-500');
        response = "Color theme changed to Red.";
        break;
      case 'theme green':
        setThemeColor('text-green-400');
        response = "Color theme changed to Green.";
        break;
      case 'theme blue':
        setThemeColor('text-blue-400');
        response = "Color theme changed to Blue.";
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        response = `Command not found: ${cmd}. Type "help" for help.`;
    }

    setHistory([...history, `> ${input}`, response]);
    setInput('');
  };

  return (
    <div 
      className="w-full h-full bg-black/80 font-mono text-[13px] p-5 overflow-y-auto"
      ref={scrollRef}
      onClick={() => document.getElementById('terminal-input')?.focus()}
    >
      {/* On utilise ici la variable themeColor */}
      <div className={`${themeColor} space-y-1`}>
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? "text-white opacity-70" : ""}>
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleCommand} className="flex gap-2 text-white mt-2">
        <span className={`${themeColor} font-bold`}>$</span>
        <input 
          id="terminal-input"
          autoFocus
          className="bg-transparent outline-none flex-1 border-none p-0 focus:ring-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
      </form>
    </div>
  );
}