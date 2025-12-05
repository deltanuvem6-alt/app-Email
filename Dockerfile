
# Usar imagem completa do Node para evitar problemas de dependência
FROM node:18

# Instalar Python 3 e configurar para ser chamado como "python"
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python-is-python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar tudo
COPY . .

# Instalar dependências
RUN npm install

# Buildar o frontend
RUN npm run build

# Definir porta
ENV PORT=10000
EXPOSE 10000

# Iniciar
CMD ["node", "server/index.js"]
