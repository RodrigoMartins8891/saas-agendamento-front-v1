import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-slate-800">
        dr.agenda
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem href="/" label="Dashboard" />
        <SidebarItem href="/appointments" label="Agendamentos" />
        <SidebarItem href="/doctors" label="Médicos" />
        <SidebarItem href="/patients" label="Pacientes" />
        <SidebarItem href="/settings" label="Configurações" />
      </nav>
      <AssistantButton />
    </aside>
  );
}

function SidebarItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition"
    >
      {label}
    </Link>
  );
}

function AssistantButton() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
    </div>
  );
}
