"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Doctor {
  id_medico: number;
  nome: string;
  especialidade: string;
  valor_consulta: number;
}

export default function Dashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ajuste para a sua rota que lista os médicos
    fetch("http://localhost:3001/medicos")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium">Bem-vindo ao sistema de gestão clínica.</p>
        </div>
        
        <div className="flex gap-4">
            <Link href="/agendamentos/novo" className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                + Novo Agendamento
            </Link>
        </div>
      </header>

      {/* Cards de Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Médicos</p>
          <h2 className="text-3xl font-black text-slate-800">{doctors.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Atendimentos Hoje</p>
          <h2 className="text-3xl font-black text-indigo-600">12</h2>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Equipe Médica</h2>

      {loading ? (
        <p>Carregando médicos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id_medico} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-4 font-black">
                {doctor.nome.charAt(0)}
              </div>
              
              <h3 className="text-xl font-black text-slate-800">{doctor.nome}</h3>
              <p className="text-indigo-500 font-bold text-sm mb-6 uppercase tracking-tighter">
                {doctor.especialidade}
              </p>

              {/* AQUI ESTÁ O BOTÃO QUE VOCÊ PRECISAVA */}
              <Link 
                href={`/agendamentos?medico=${encodeURIComponent(doctor.nome)}`} 
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Ver Agenda</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
          ))}
        </div>
      )}
    </div>
    
  );
}