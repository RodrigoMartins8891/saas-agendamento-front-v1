import Link from "next/link";

// Garanta que a interface Doctor esteja acessível ou definida aqui
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  price: number;
  availableDays: string[];
}

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50 p-8 flex flex-col transition-all hover:translate-y-[-4px]">
      {/* Header com Avatar */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-black mb-4">
          {doctor.name.charAt(0)}
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-800 leading-tight">
            {doctor.name}
          </h3>
          <p className="text-indigo-500 font-bold text-xs uppercase tracking-widest mt-1">
            {doctor.specialty}
          </p>
        </div>
      </div>

      {/* Detalhes de Atendimento */}
      <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Valor</span>
          <span className="text-sm font-bold text-slate-700">R$ {doctor.price.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider text-left">Disponibilidade</span>
          <div className="flex flex-wrap gap-1">
            {doctor.availableDays.map((day) => (
              <span key={day} className="text-[9px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md font-bold">
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ação: Agora enviando o nome para a rota de agendamentos que criamos */}
      <Link 
        href={`/agendamentos?medico=${encodeURIComponent(doctor.name)}`} 
        className="w-full"
      >
        <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200 active:scale-95 cursor-pointer">
          Ver Agenda
        </button>
      </Link>
    </div>
  );
}