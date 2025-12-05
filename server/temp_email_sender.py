
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys

# Configurações
smtp_server = "smtp.gmail.com"
port = 587
sender_email = "deltanuvem1@gmail.com"
password = "hvlr ilyq qpyd sequ"
receiver_email = "alertav1@hotmail.com"
subject = "🚨 ALERTA MÁXIMO: PÂNICO ACIONADO"
message_body = """O botão de PÂNICO foi acionado no local. Verifique as câmeras e contate a segurança IMEDIATAMENTE."""

print(f"[DELTA SYSTEM] Iniciando envio para {receiver_email}...")

try:
    # Criação da mensagem
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    # Adiciona o corpo do email
    message.attach(MIMEText(message_body, "plain"))

    # Contexto SSL seguro
    context = ssl.create_default_context()

    # Conexão com o servidor
    print(f"[DELTA SYSTEM] Conectando a {smtp_server}:{port}...")
    with smtplib.SMTP(smtp_server, port) as server:
        server.starttls(context=context)
        
        # Login
        print("[DELTA SYSTEM] Realizando login...")
        server.login(sender_email, password)
        
        # Envio
        print("[DELTA SYSTEM] Enviando mensagem...")
        server.sendmail(sender_email, receiver_email, message.as_string())

    print("[DELTA SYSTEM] SUCESSO: Email enviado corretamente!")

except smtplib.SMTPAuthenticationError as e:
    print(f"[DELTA SYSTEM] ERRO DE AUTENTICAÇÃO (Login falhou).")
    print(f"Detalhe técnico: {str(e)}")
    print("-" * 30)
    print("DICAS PARA GMAIL:")
    print("1. Você DEVE usar uma 'Senha de App' (16 caracteres), não sua senha normal.")
    print("2. Verifique se o email 'deltanuvem1@gmail.com' está correto.")
    print("3. Gere uma senha em: https://myaccount.google.com/apppasswords")
    print("-" * 30)
    sys.exit(1)

except Exception as e:
    print(f"[DELTA SYSTEM] ERRO FATAL: Falha ao enviar email.")
    print(f"Detalhe do erro: {str(e)}")
    sys.exit(1)
