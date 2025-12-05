
# Usar uma imagem base que tenha Node.js
FROM node:18-slim

# Instalar Python 3 e outras dependências básicas
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
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

# Expor a porta que o Render vai usar (geralmente ele injeta a PORT, mas documentamos)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server/index.js"]
