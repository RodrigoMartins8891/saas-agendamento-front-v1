"use client";

import { useEffect, useState } from "react";

interface Agendamento {
    id_agendamento: number;
    data_hora: string;
    status: string;
    medico_nome: string;
    especialidade: string;
    valor_final: number;
    paciente_nome: string;
    paciente_telefone: string;
    plano_saude: string | null;
}

export default function AgendamentosAdmin() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [loading, setLoading] = useState(true);

    async function handleStatusChange(id: number, novoStatus: string) {
        try {
            const res = await fetch(`http://localhost:3001/agendamentos/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: novoStatus })
            });

            if (res.ok) {
                setAgendamentos(prev =>
                    prev.map(ag => ag.id_agendamento === id ? { ...ag, status: novoStatus } : ag)
                );
            }
        } catch (error) {
            alert("Erro ao atualizar status.");
        }
    }

    useEffect(() => {
        fetch("http://localhost:3001/agendamentos")
            .then((res) => res.json())
            .then((data) => {
                // Garante que 'data' é um array antes de salvar
                setAgendamentos(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar agendamentos:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Sincronizando Agenda...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                {/* Cabeçalho Padronizado */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        Gestão de Agendamentos
                    </h1>
                    <p className="text-lg text-slate-600 mt-2">
                        Monitore e atualize as consultas da clínica.
                    </p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                    {agendamentos.length} Consultas Total
                </div>
            </div>

            <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden border border-slate-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Paciente</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Médico</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Data e Hora</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {agendamentos.length > 0 ? agendamentos.map((ag) => (
                                <tr key={ag.id_agendamento} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-bold text-slate-900">{ag.paciente_nome}</div>
                                        <div className="text-xs text-slate-500">{ag.paciente_telefone}</div>
                                        {ag.plano_saude && <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block uppercase">{ag.plano_saude}</span>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-800 font-medium">{ag.medico_nome}</div>
                                        <div className="text-xs text-indigo-600 font-semibold">{ag.especialidade}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {ag.data_hora ? new Date(ag.data_hora).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "---"}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-700">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ag.valor_final || 0)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider 
                                            ${ag.status === "Confirmado" ? "bg-green-100 text-green-700" :
                                                ag.status === "Cancelado" ? "bg-red-100 text-red-700" :
                                                    ag.status === "Concluido" ? "bg-blue-100 text-blue-700" :
                                                        "bg-yellow-100 text-yellow-700"}`}>
                                            {ag.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <select
                                            value={ag.status}
                                            onChange={(e) => handleStatusChange(ag.id_agendamento, e.target.value)}
                                            className="text-xs border border-slate-300 rounded-lg p-1.5 bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer shadow-sm font-medium"
                                        >
                                            <option value="Pendente">Pendente</option>
                                            <option value="Confirmado">Confirmado</option>
                                            <option value="Cancelado">Cancelado</option>
                                            <option value="Concluido">Concluído</option>
                                        </select>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-20 text-center text-slate-400 italic">
                                        Nenhum agendamento encontrado no sistema.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}