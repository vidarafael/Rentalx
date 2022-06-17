FROM node

# Create app directory
WORKDIR /usr/app

# Install all dependencies
# falo qual arquivo quero copiar e onde este arquivo está, no caso no diretório raiz
COPY package.json ./

RUN npm install

# Agoro copio todos os arquivos instalados e mando pro diretório raiz
COPY . .

# Idicando qual porta eu quero
EXPOSE 3333

# Indico qual comando deve ser rodado
CMD ["npm", "run", "dev"]