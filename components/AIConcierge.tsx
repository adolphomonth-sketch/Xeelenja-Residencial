
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIConcierge: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: "Sea bienvenido a la vanguardia inmobiliaria del Caribe Mexicano. Soy su asistente AI de Fullnessland. ¿Cómo puedo orientar hoy su inversión hacia la plenitud y plusvalía?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isTyping) return;

    const userText = trimmedInput;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      // Re-initialize Gemini client per interaction ensuring correct environment usage
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: "Eres el Concierge AI de Fullnessland. Tono: Lujoso, experto en real estate del Caribe Mexicano, visionario y cordial. Tu objetivo es explicar las bondades de invertir en Cancún, la plusvalía de nuestros proyectos con entrega en 2026 y el estilo de vida exclusivo. Hablas un español sofisticado."
        }
      });

      const aiResponse = response.text || "Disculpe, mis sistemas están procesando datos del mercado marino. Un segundo...";
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: "Mis servidores están experimentando una marea alta. Por favor, reintente en unos instantes para continuar su asesoría." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full bg-white/5 border border-white/25 rounded-[55px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col h-[750px] backdrop-blur-3xl relative">
      <div className="p-12 bg-white/5 border-b border-white/20 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-[#219EBC] via-[#005F73] to-[#001f26] flex items-center justify-center border border-white/40 shadow-2xl">
            <Bot className="w-11 h-11 text-white drop-shadow-lg" />
          </div>
          <div>
            <h4 className="font-bold text-white text-2xl uppercase tracking-[0.5em] drop-shadow-2xl">Fullness Concierge AI</h4>
            <div className="flex items-center gap-4 mt-2">
              <span className="w-4 h-4 bg-[#219EBC] rounded-full animate-pulse shadow-[0_0_20px_#219EBC]" />
              <span className="text-[12px] uppercase tracking-[0.6em] text-[#8ECAE6] font-bold">Sistemas Online</span>
            </div>
          </div>
        </div>
        <Sparkles className="w-10 h-10 text-[#219EBC] opacity-90 drop-shadow-[0_0_15px_#219EBC]" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-12 space-y-12 scroll-smooth bg-gradient-to-b from-transparent to-[#005F73]/30">
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: m.role === 'user' ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-8 rounded-[35px] text-xl leading-relaxed shadow-2xl ${
              m.role === 'user' 
                ? 'bg-[#219EBC] text-[#001f26] rounded-tr-none font-bold' 
                : 'bg-white/10 text-white rounded-tl-none border border-white/15 backdrop-blur-2xl shadow-inner'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-7 rounded-[30px] flex gap-4 border border-white/10 backdrop-blur-2xl shadow-lg">
              {[0, 0.2, 0.4].map(d => (
                <div key={d} className="w-3.5 h-3.5 bg-[#219EBC] rounded-full animate-bounce shadow-[0_0_15px_#219EBC]" style={{ animationDelay: `${d}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-10 bg-white/5 border-t border-white/20 backdrop-blur-3xl">
        <div className="relative max-w-5xl mx-auto">
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Consulte sobre tipologías, plusvalía o estilo de vida..."
            className="w-full bg-white/10 border border-white/25 rounded-[35px] py-8 pl-12 pr-24 text-white text-2xl placeholder:text-white/30 focus:outline-none focus:border-[#219EBC] focus:bg-white/15 transition-all duration-700 shadow-2xl"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-4 top-4 p-5 bg-[#219EBC] hover:bg-white transition-all duration-700 rounded-[25px] text-[#001f26] shadow-2xl disabled:opacity-50 group hover:scale-105 active:scale-95"
          >
            <Send className="w-9 h-9 transition-transform group-hover:rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConcierge;
