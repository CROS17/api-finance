# Use a base image with Node.js
FROM node:16-alpine

# Instala las dependencias
RUN npm install -g npm

# Establece el directorio de trabajo dentro del contenedor
WORKDIR  /usr/src/

# Copia los archivos de tu aplicación al directorio de trabajo del contenedor
COPY package*.json ./

COPY . .

RUN npm install

#ENV NODE_ENV=production

# Expone el puerto en el que se ejecutará tu aplicación
EXPOSE 3003

# Comando para iniciar tu aplicación cuando el contenedor se inicie
CMD npm start


