"use client";

import React from 'react';
import Image from "next/image";
import { Github, Linkedin, Mail, Code2, Cpu, ExternalLink, Sparkles, FileText, Download } from "lucide-react";
import { motion } from "framer-motion";
import Terminal from '@/components/Terminal';
import ChatBot from '@/components/ChatBot'; 
import { GITHUB_URL, LINKEDIN_URL, CV_URL, GMAIL_COMPOSE_URL } from '@/lib/constants';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 p-6 md:p-12 font-sans selection:bg-blue-500/30 relative">
      
      {/* 1. NAVIGATION */}
      <nav className="max-w-6xl mx-auto flex justify-between items-center mb-16">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform">
            <Code2 size={24} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase">Soukaye KANE</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            GitHub
          </a>
          <button
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full transition-all border border-slate-700"
            aria-label="Ouvrir les options de contact"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* 2. BENTO GRID CONTAINER */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        
        {/* BLOC 1 : HERO (2x2) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-2 md:row-span-2 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-end relative overflow-hidden group"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-600/30 transition-colors" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-400 mb-4 font-mono text-sm">
              <Sparkles size={18} />
              <span className="font-semibold uppercase tracking-widest">Génie Informatique</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight text-white">
              Hello, je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Soukaye KANE.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-[90%] leading-relaxed">
              Développeur Full-Stack passionné par le web moderne, l'IA et l'automatisation.
            </p>
          </div>
        </motion.div>

        {/* BLOC 2 : PHOTO */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-slate-800 border border-slate-700 rounded-[2rem] overflow-hidden group relative"
        >
          <Image
            src="/soukayekane.jpeg"
            alt="Portrait de Soukaye Kane"
            fill
            sizes="(min-width: 768px) 25vw, 100vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            priority
          />
        </motion.div>

        {/* BLOC 3 : LINKEDIN */}
        <motion.a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -5 }}
          className="bg-[#0077b5] rounded-[2rem] p-6 flex flex-col justify-between group cursor-pointer"
          aria-label="Voir le profil LinkedIn de Soukaye"
        >
          <Linkedin size={32} className="text-white" />
          <div>
            <p className="text-white font-bold text-lg leading-tight">LinkedIn</p>
            <p className="text-blue-100 text-[10px] uppercase font-bold tracking-widest mt-1 italic flex items-center gap-1">Connect <ExternalLink size={10}/></p>
          </div>
        </motion.a>

        {/* BLOC 4 : GITHUB */}
        <motion.a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -5 }}
          className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-6 flex flex-col justify-between hover:border-slate-600 transition-all cursor-pointer group"
          aria-label="Voir le profil GitHub de Soukaye"
        >
          <Github size={32} className="group-hover:text-blue-400 transition-colors" />
          <p className="text-2xl font-bold text-white tracking-tight italic underline decoration-blue-500">GitHub</p>
        </motion.a>

        {/* BLOC 5 : CV */}
        <motion.a
          href={CV_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 0.98 }}
          className="bg-white rounded-[2rem] p-6 flex flex-col justify-between group cursor-pointer"
          aria-label="Télécharger le CV de Soukaye Kane"
        >
          <div className="bg-slate-100 h-10 w-10 rounded-lg flex items-center justify-center text-slate-900"><FileText size={24} /></div>
          <div>
            <p className="text-slate-900 font-bold text-lg">Mon CV</p>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1">Télécharger <Download size={12} /></p>
          </div>
        </motion.a>

        {/* BLOC 6 : TERMINAL */}
        <div className="md:col-span-2 md:row-span-2 bg-black border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-800">
            <div className="flex gap-1.5 text-slate-500 font-mono text-[10px] ml-2">bash — soukaye-portfolio</div>
          </div>
          <div className="h-[calc(100%-32px)]"> 
            <Terminal />
          </div>
        </div>

        

        {/* BLOC 8 : GMAIL */}
        <motion.a
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 0.98 }}
          className="bg-blue-600 rounded-[2rem] p-6 flex flex-col justify-between cursor-pointer"
          aria-label="Envoyer un email à Soukaye via Gmail"
        >
          <Mail size={32} className="text-white" />
          <p className="text-white font-bold text-lg leading-tight">Me contacter via Gmail</p>
        </motion.a>

      </div>

      {/* 3. CHATBOT : Placé en dehors de la grille Bento pour ne rien décaler */}
      <ChatBot />
      
    </main>
  );
}