"use client";

import { useEffect, useState } from "react";
import { DoctorCard } from "../../components/DoctorCard";

interface DoctorFromDB {
  id_medico: number;
  nome: string;
  especialidade: string;
  valor_consulta: string | number;
  dias_atendimento: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  price: number;
  availableDays: string[];
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/medicos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados do servidor");
        return res.json();
      })
      .then((data: DoctorFromDB[]) => {
        const formattedDoctors: Doctor[] = data.map((d) => ({
          id: d.id_medico ? d.id_medico.toString() : "0",
          name: d.nome,
          specialty: d.especialidade,
          price: typeof d.valor_consulta === 'string' 
            ? parseFloat(d.valor_consulta) 
            : d.valor_consulta,
          availableDays: d.dias_atendimento 
            ? d.dias_atendimento.split(", ") 
            : [],
        }));

        setDoctors(formattedDoctors);
        setLoading(false);
      })
      .catch((err) => {
        setError("Não foi possível carregar a lista de médicos.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Buscando especialistas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-10 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-3xl inline-block border border-red-100">
          <p className="font-bold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
            Corpo Clínico
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Selecione um profissional para gerenciar horários e consultas.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            /* Se o seu DoctorCard interno ainda não estiver estilizado, 
               avise-me para te mandar o código do componente DoctorCard também!
            */
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {doctors.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg font-medium">Nenhum médico encontrado no sistema.</p>
          </div>
        )}
      </div>
    </div>
  );
}