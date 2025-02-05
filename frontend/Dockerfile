# Usando a imagem oficial do Node.js como base
FROM node:20

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos package.json e package-lock.json para instalar dependências
COPY package.json package-lock.json ./
RUN npm install

# Copiando todo o restante dos arquivos do frontend
COPY . .

# Compilando o frontend para produção
RUN npm run build

# Expondo a porta 5173 para acesso ao frontend
EXPOSE 5173

# Comando para iniciar o frontend em modo de desenvolvimento
CMD ["npm", "run", "dev"]
