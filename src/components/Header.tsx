export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-slate-800">
        Painel Administrativo
      </h1>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-800">Clínica Saúde+</p>
          <p className="text-xs text-slate-500">Administrador</p>
        </div>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          C
        </div>
      </div>
    </header>
  );
}
