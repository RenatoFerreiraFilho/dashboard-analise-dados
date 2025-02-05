# Usando a imagem oficial do Node.js como base
FROM node:20

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos do backend para o container
COPY package.json package-lock.json ./
RUN npm install

# Copiando todo o restante dos arquivos do backend
COPY . .

# Definindo a porta que será exposta
EXPOSE 4000

# Comando para rodar a aplicação
CMD ["node", "server.js"]
