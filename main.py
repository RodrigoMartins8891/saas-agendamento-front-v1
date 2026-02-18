from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configuração de CORS: Essencial para o React conseguir acessar o Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, substitua pelo endereço do seu site
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pergunta(BaseModel):
    texto: str

@app.post("/perguntar")
async def responder_ia(pergunta: Pergunta):
    user_text = pergunta.texto.lower()
    
    # Lógica de resposta simulando uma IA
    if "médico" in user_text or "doutor" in user_text:
        resposta = "Atualmente temos a Dra. Ana Souza e o Dr. Rodrigo Martins no corpo clínico."
    elif "consulta" in user_text or "agendamento" in user_text:
        resposta = "Verifiquei aqui: você tem 4 consultas totais agendadas para hoje."
    elif "ajuda" in user_text:
        resposta = "Eu posso te ajudar a verificar horários, cadastrar pacientes ou resumir o dia!"
    else:
        # Resposta padrão caso ele não entenda a palavra-chave
        resposta = f"Entendi sua dúvida sobre '{pergunta.texto}'. Como sou seu assistente Dr. Agenda, prefere que eu analise os agendamentos ou os médicos?"
    
    return {"resposta": resposta}

if __name__ == "__main__":
    import uvicorn
    # Roda o servidor na porta 8000
    uvicorn.run(app, host="127.0.0.1", port=8000)