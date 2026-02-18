import Link from "next/link";

interface Patient {
  id_paciente: number;
  nome: string;
  data_nascimento: string;
  telefone: string;
  foto_url: string;
  plano_saude?: string;
}

interface PatientsCardProps {
  patient: Patient;
}

export function PacientCard({ patient }: PatientsCardProps) {
  // Mantive sua lógica original de Delete
  async function handleDelete(id: number) {
    const confirmacao = confirm(`Deseja realmente excluir o paciente ${patient.nome}?`);

    if (confirmacao) {
      try {
        const response = await fetch(`http://localhost:3001/pacientes/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Paciente removido com sucesso!");
          window.location.reload();
        } else {
          const erro = await response.json();
          alert(`Erro: ${erro.erro}`);
        }
      } catch (error) {
        console.error("Erro ao deletar:", error);
        alert("Erro de conexão com o servidor.");
      }
    }
  }

  return (
    <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/60 border border-slate-100 p-8 flex flex-col transition-all hover:translate-y-[-5px] hover:shadow-2xl hover:shadow-emerald-100/50">
      
      {/* Header com Foto ou Avatar */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative mb-4">
          {patient.foto_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={patient.foto_url}
              alt={patient.nome}
              className="w-24 h-24 rounded-[24px] object-cover border-4 border-emerald-50 shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-[24px] bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl font-black shadow-inner">
              {patient.nome.charAt(0)}
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
            <div className="bg-emerald-500 w-3 h-3 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-800 leading-tight">
            {patient.nome}
          </h3>
          <p className="text-emerald-500 font-bold text-[10px] uppercase tracking-[0.15em] mt-1">
            {patient.plano_saude || "Particular"}
          </p>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-slate-50/80 rounded-[24px] p-5 mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contato</span>
          <span className="text-sm font-bold text-slate-700">{patient.telefone}</span>
        </div>
        <div className="flex justify-between items-center border-t border-slate-200 pt-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nascimento</span>
          <span className="text-sm font-bold text-slate-600">
            {patient.data_nascimento
              ? new Date(patient.data_nascimento).toLocaleDateString('pt-BR')
              : "N/A"}
          </span>
        </div>
      </div>

      {/* Ações */}
      <div className="flex flex-col gap-3 mt-auto">
        <Link
          href={`/prontuario?id=${patient.id_paciente}`}
          className="w-full bg-slate-900 hover:bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest py-4 rounded-2xl text-center transition-all shadow-lg shadow-slate-200 active:scale-95"
        >
          Abrir Prontuário
        </Link>

        <button
          onClick={() => handleDelete(patient.id_paciente)}
          className="w-full bg-white border-2 border-transparent hover:border-red-100 hover:bg-red-50 text-red-400 hover:text-red-600 text-[10px] font-black uppercase tracking-widest py-3 rounded-2xl transition-all cursor-pointer"
        >
          Excluir Registro
        </button>
      </div>
    </div>
  );
}