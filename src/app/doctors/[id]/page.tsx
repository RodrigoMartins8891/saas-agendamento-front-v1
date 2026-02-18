"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// 1. Interface exata conforme o seu banco de dados
interface Doctor {
    id_medico: number;
    nome: string;
    especialidade: string;
    crm: string;
    valor_consulta: string | number;
    dias_atendimento: string;
    foto_url: string;
}

export default function DoctorDetails() {
    const params = useParams();
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (params.id) {
            // Importante: Porta 3001 onde está o seu Back-end
            fetch(`http://localhost:3001/medicos/${params.id}`)
                .then((res) => {
                    if (!res.ok) throw new Error();
                    return res.json();
                })
                .then((data) => setDoctor(data))
                .catch(() => setError(true));
        }
    }, [params.id]);

    if (error) return <p className="text-center p-10 text-red-500">Médico não encontrado.</p>;
    if (!doctor) return <p className="text-center p-10">Carregando detalhes...</p>;

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">

                {/* Foto do Médico  */}
                <div className="h-80 bg-slate-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={doctor.foto_url || "https://via.placeholder.com/600x400?text=Medico+Sem+Foto"}
                        alt={doctor.nome}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-slate-800">{doctor.nome}</h1>
                        <p className="text-blue-600 text-lg font-medium">{doctor.especialidade}</p>
                    </div>

                    <div className="space-y-4 border-t border-slate-100 pt-6 text-slate-600">
                        <div className="flex justify-between">
                            <span className="font-semibold text-slate-700">CRM:</span>
                            <span>{doctor.crm}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold text-slate-700">Dias de Atendimento:</span>
                            <span>{doctor.dias_atendimento}</span>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <span className="font-semibold text-slate-700 text-lg">Valor da Consulta:</span>
                            <span className="text-2xl text-green-600 font-bold">
                                {/* Solução definitiva para o toFixed no TypeScript */}
                                R$ {Number(doctor.valor_consulta).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Botão Ver Agenda (Dashboard Admin) */}
                    <Link href={`/agendamentos?medico=${doctor.nome}`} className="w-full">
                        <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 cursor-pointer active:scale-95 flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Ver Agenda Médico</span>
                        </button>
                    </Link>

                    {/* Botão Voltar */}
                    <button
                        onClick={() => window.history.back()}
                        className="w-full mt-3 text-slate-400 text-sm hover:text-slate-600 hover:underline cursor-pointer transition-colors"
                    >
                        Voltar para a lista
                    </button>
                </div>
            </div>
        </div>
    );
}