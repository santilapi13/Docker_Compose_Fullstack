FROM node:alpine

WORKDIR /app 

# Copiar el package.json desde el directorio local a la imagen.
COPY package.json .

# Instalar las dependencias.
RUN npm install

# Copiar el resto de archivos a la imagen docker.
COPY . .

# Generar el entorno de producción de la aplicación (crea carpeta dist)
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]
