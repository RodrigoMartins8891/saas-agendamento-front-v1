"use client";
import { useState, useRef, useEffect } from "react";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [mensagens, setMensagens] = useState([
    { role: 'bot', text: 'Olá! Sou o assistente do Dr. Agenda. Como posso ajudar você hoje?' }
  ]);
  
  // Referência para rolar o chat automaticamente para baixo
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [mensagens]);

  const enviarPergunta = async () => {
    if (!input.trim()) return;

    const textoUsuario = input;
    // Adiciona a pergunta do usuário na tela
    setMensagens((prev) => [...prev, { role: 'user', text: textoUsuario }]);
    setInput("");

    try {
      const res = await fetch("http://127.0.0.1:8000/perguntar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: textoUsuario }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      // Adiciona a resposta do Python na tela
      setMensagens((prev) => [...prev, { role: 'bot', text: data.resposta }]);

    } catch (error) {
      setMensagens((prev) => [...prev, { 
        role: 'bot', 
        text: "Desculpe, não consegui conectar ao meu servidor Python. Verifique se ele está rodando na porta 8000!" 
      }]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end font-sans">
      
      {/* Janela do Chat */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center shadow-inner text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">Assistente IA</h3>
                <p className="text-xs text-indigo-300 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online agora
                </p>
              </div>
            </div>
          </div>

          {/* Mensagens */}
          <div 
            ref={scrollRef}
            className="h-96 p-6 overflow-y-auto bg-slate-50 flex flex-col gap-4"
          >
            {mensagens.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                  msg.role === 'bot'
                    ? 'bg-white text-slate-800 self-start rounded-tl-none border border-slate-100'
                    : 'bg-indigo-600 text-white self-end rounded-br-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Digite sua dúvida..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && enviarPergunta()}
                className="w-full p-4 pr-12 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 transition-all shadow-inner"
              />
              <button 
                onClick={enviarPergunta}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-slate-800' : 'bg-indigo-600'} text-white p-5 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95`}
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>
    </div>
  );
}