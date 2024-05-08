# Utiliser l'image Python 3.12
FROM python:3.12

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de requirements.txt et installer les dépendances
COPY app/requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Copier tous les fichiers de l'application Flask dans le conteneur
COPY app /app
RUN pip install pymongo
# Exposer le port 5000 utilisé par l'application Flask
EXPOSE 5000

# Commande pour exécuter l'application Flask
CMD ["python", "run.py"]
