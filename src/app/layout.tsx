import "./globals.css";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { AIAssistant } from "../components/AIAssistant";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100">
        <div className="flex h-screen">
          <Sidebar />

          <div className="flex flex-col flex-1">
            <Header />

            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>

        <AIAssistant />

      </body>
    </html>
  );
}