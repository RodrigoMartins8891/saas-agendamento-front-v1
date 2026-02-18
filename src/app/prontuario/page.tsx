"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Patient {
  id_paciente: number;
  nome: string;
  data_nascimento: string;
  telefone: string;
  plano_saude?: string;
}

// Componente interno para usar o useSearchParams
function ProntuarioContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Pega o 'id' de ?id=...

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:3001/pacientes/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          setPatient(data);
          setError(false);
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (!id) return <div className="p-8">Nenhum ID de paciente fornecido na URL.</div>;
  if (loading) return <div className="p-8 animate-pulse">Carregando...</div>;
  if (error || !patient) return <div className="p-8 text-red-500">Erro ao carregar paciente.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-blue-600">
        <h1 className="text-3xl font-bold text-slate-800">{patient.nome}</h1>
        <p className="text-slate-500 mb-4">ID: #{patient.id_paciente}</p>
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Telefone</p>
            <p className="text-slate-700">{patient.telefone}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Nascimento</p>
            <p className="text-slate-700">
              {new Date(patient.data_nascimento).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// O Next.js exige Suspense para usar useSearchParams em Client Components
export default function ProntuarioPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProntuarioContent />
    </Suspense>
  );
}