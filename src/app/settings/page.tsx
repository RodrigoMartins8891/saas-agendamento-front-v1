"use client";
import { useState } from "react";

export default function Configuracoes() {
  // Estados para o Médico
  const [medico, setMedico] = useState({ nome: "", especialidade: "", valor: "" });
  // Estados para o Paciente
  const [paciente, setPaciente] = useState({ nome: "", plano: "Particular" });

  const handleSalvarMedico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/medicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medico),
      });
      if (res.ok) {
        alert("Médico cadastrado com sucesso!");
        setMedico({ nome: "", especialidade: "", valor: "" }); // Limpa o form
      }
    } catch (err) {
      console.error("Erro ao salvar médico:", err);
    }
  };

  const handleSalvarPaciente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente),
      });
      if (res.ok) {
        alert("Paciente cadastrado com sucesso!");
        setPaciente({ nome: "", plano: "Particular" });
      }
    } catch (err) {
      console.error("Erro ao salvar paciente:", err);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      {/* Título com estilo "Corpo Clínico" */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Configurações
        </h1>
        <p className="text-lg text-slate-600 mt-2">
          Gerencie médicos, pacientes e permissões do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card Médico */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Cadastrar Novo Médico</h2>
          <form onSubmit={handleSalvarMedico} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
              <input 
                type="text" 
                value={medico.nome}
                onChange={(e) => setMedico({...medico, nome: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" 
                placeholder="Ex: Dra. Helena Silva" 
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Especialidade</label>
                <input 
                  type="text" 
                  value={medico.especialidade}
                  onChange={(e) => setMedico({...medico, especialidade: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200" 
                  placeholder="Ex: Pediatria" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Valor</label>
                <input 
                  type="text" 
                  value={medico.valor}
                  onChange={(e) => setMedico({...medico, valor: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-200" 
                  placeholder="R$ 300,00" 
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition shadow-lg mt-4">
              SALVAR MÉDICO
            </button>
          </form>
        </div>

        {/* Card Paciente */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Cadastrar Novo Paciente</h2>
          <form onSubmit={handleSalvarPaciente} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Paciente</label>
              <input 
                type="text" 
                value={paciente.nome}
                onChange={(e) => setPaciente({...paciente, nome: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Plano de Saúde</label>
              <select 
                value={paciente.plano}
                onChange={(e) => setPaciente({...paciente, plano: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-200 outline-none"
              >
                <option value="Particular">Particular</option>
                <option value="SulAmérica">SulAmérica</option>
                <option value="Unimed">Unimed</option>
                <option value="Bradesco">Bradesco</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition shadow-lg mt-4">
              CADASTRAR PACIENTE
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}