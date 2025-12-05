
# Usar uma imagem base que tenha Node.js (Debian based)
FROM node:18-slim

# Instalar Python 3 e o pacote que cria o alias 'python' -> 'python3'
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python-is-python3 \
    && rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar dependências do Node
RUN npm install

# Copiar o resto do código fonte
COPY . .

# Buildar o frontend (Vite)
RUN npm run build

# Expor a porta 10000 (padrão do Render no nosso yaml) e 3000 (local)
EXPOSE 10000 3000

# Comando para iniciar o servidor
CMD ["node", "server/index.js"]
