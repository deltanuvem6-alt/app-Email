
# --- Estágio 1: Build do Frontend ---
FROM node:18-slim AS builder

WORKDIR /app

# Copiar dependências
COPY package*.json ./

# Instalar TODAS as dependências (incluindo devDependencies para o build)
RUN npm install

# Copiar código fonte
COPY . .

# Buildar o projeto (Vite gera a pasta /app/dist)
RUN npm run build

# --- Estágio 2: Runtime (Servidor) ---
FROM node:18-slim

# Instalar Python para a automação
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python-is-python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar apenas arquivos necessários da etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/node_modules ./node_modules

# Definir variável de ambiente padrão
ENV PORT=10000

# Expor a porta
EXPOSE 10000

# Iniciar servidor
CMD ["node", "server/index.js"]
