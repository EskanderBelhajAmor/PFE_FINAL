# Utilise une image Node.js comme base
FROM node:latest

# Crée le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le package.json et le package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installe les dépendances du projet
RUN npm install

# Copie le reste des fichiers du backend dans le répertoire de travail
COPY . .

# Expose le port sur lequel le serveur Node.js va écouter
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
