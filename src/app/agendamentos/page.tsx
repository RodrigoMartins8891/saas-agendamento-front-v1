"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

interface Agendamento {
  id_agendamento: number;
  data_hora: string;
  status: string; // O status está aqui na interface
  paciente_nome: string;
  id_paciente: number;
  medico_nome: string; 
}

export default function AgendaMedicoPage({ searchParams }: { searchParams: Promise<{ medico?: string }> }) {
  const params = use(searchParams);
  const nomeMedico = params.medico;

  const [consultas, setConsultas] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nomeMedico) {
      setLoading(true);
      fetch(`http://localhost:3001/agendamentos?nomeMedico=${encodeURIComponent(nomeMedico)}`)
        .then((res) => res.json())
        .then((data) => {
          setConsultas(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar agenda:", err);
          setLoading(false);
        });
    }
  }, [nomeMedico]);

  if (loading) return <div className="p-10 text-center font-sans italic text-slate-500">Buscando agenda do Dr(a). {nomeMedico}...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans text-slate-800">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-1 tracking-tight">Agenda de Consultas</h1>
          <p className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
            Médico: {nomeMedico || "Não selecionado"}
          </p>
        </div>
        <Link href="/dashboard" className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold transition-all">
          ← Painel
        </Link>
      </div>

      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="p-5 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Horário / Data</th>
              <th className="p-5 font-bold text-slate-400 uppercase text-[10px] tracking-widest">Paciente</th>
              <th className="p-5 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Status</th>
              <th className="p-5 font-bold text-slate-400 uppercase text-[10px] tracking-widest text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((item) => {
              const dataObj = item.data_hora ? new Date(item.data_hora) : null;
              const horaFormatada = dataObj ? dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : "--:--";
              const dataFormatada = dataObj ? dataObj.toLocaleDateString('pt-BR') : "Data N/A";

              return (
                <tr key={item.id_agendamento} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="text-indigo-700 font-black text-lg">
                        {horaFormatada}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {dataFormatada}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 font-bold text-slate-700 text-lg">
                    {item.paciente_nome}
                  </td>
                  
                  {/* COLUNA DE STATUS REINTEGRADA */}
                  <td className="p-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'Confirmado' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-amber-100 text-amber-600'
                    }`}>
                      {item.status || 'Pendente'}
                    </span>
                  </td>

                  <td className="p-5 text-center">
                    <Link
                      href={`/prontuario?id=${item.id_paciente}`}
                      className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black uppercase tracking-tighter py-3 px-6 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    >
                      Ver Prontuário
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {consultas.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-slate-300 text-lg italic font-medium">Nenhuma consulta para "{nomeMedico}".</p>
          </div>
        )}
      </div>
    </div>
  );
}