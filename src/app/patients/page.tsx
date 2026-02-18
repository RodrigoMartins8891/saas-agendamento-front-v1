"use client";

import { useEffect, useState } from "react";
import { PacientCard } from "../../components/Patients"; // Certifique-se que o nome do arquivo/export está correto

interface PatientFromDB {
  id_paciente: number;
  nome: string;
  data_nascimento: string;
  telefone: string;
  foto_url: string;
  plano_saude?: string;
}

export default function Patients() {
  const [patients, setPatients] = useState<PatientFromDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/agendamentos/pacientes`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados do servidor");
        return res.json();
      })
      .then((data: PatientFromDB[]) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar pacientes:", err);
        setError("Não foi possível carregar a lista de pacientes.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-slate-500 font-bold animate-pulse uppercase text-xs tracking-widest">Acessando registros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-10 text-center font-sans">
        <div className="bg-red-50 text-red-600 p-6 rounded-3xl inline-block border border-red-100 shadow-sm">
          <p className="font-black uppercase text-xs tracking-tight">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Pacientes
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Gerencie o histórico e prontuários da sua base de clientes.
            </p>
          </div>
          <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl font-black text-xs uppercase tracking-widest border border-emerald-200">
            {patients.length} Cadastrados
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patients.map((patient) => (
            <PacientCard key={patient.id_paciente} patient={patient} />
          ))}
        </div>

        {patients.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-slate-200 shadow-inner">
            <p className="text-slate-300 text-xl font-bold italic">Nenhum paciente encontrado no banco de dados.</p>
          </div>
        )}
      </div>
    </div>
  );
}