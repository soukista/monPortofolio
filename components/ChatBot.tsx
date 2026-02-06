"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles } from 'lucide-react';
import { useAutoScroll } from '@/hooks/useAutoScroll';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hello ! Je suis l'IA de Soukaye. Pose-moi une question sur son parcours." }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useAutoScroll(scrollRef, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, j'ai un petit souci technique." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-6 w-80 md:w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-blue-500/30 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-blue-600 to-cyan-500 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Assistant Soukaye</p>
                  <p className="text-[10px] text-blue-100 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" /> En ligne
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform"
                aria-label="Fermer le chatbot"
              >
                <X size={20}/>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center text-slate-500 text-xs italic">
                  <Sparkles size={12} className="animate-spin" /> L’IA réfléchit...
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-slate-800/50 border-t border-slate-700 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button type="submit" className="bg-blue-600 p-2 rounded-xl text-white hover:bg-blue-500 transition-all">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LE PETIT BONHOMME QUI FLOTTE (Trigger) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -12, 0],
          rotate: [0, 5, -5, 0] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-20 w-20 flex items-center justify-center group"
        aria-label={isOpen ? "Fermer le chatbot" : "Ouvrir le chatbot"}
      >
        {/* Halo lumineux derrière le bonhomme */}
        <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full group-hover:bg-blue-500/50 transition-colors" />
        
        {/* Corps du bonhomme */}
        <div className="relative h-16 w-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-xl flex items-center justify-center border-2 border-white/20">
           {isOpen ? (
             <X size={32} className="text-white" />
           ) : (
             <div className="relative">
                <Bot size={35} className="text-white" />
                {/* Petit point lumineux (yeux ou antenne) */}
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 border-2 border-blue-600 rounded-full" />
             </div>
           )}
        </div>
        
        {/* Bulle "Ask me" au survol */}
        {!isOpen && (
          <div className="absolute -left-24 bg-white text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Besoin d’aide ?
          </div>
        )}
      </motion.button>
    </div>
  );
}