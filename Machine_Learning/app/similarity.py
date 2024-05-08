from pymongo import MongoClient
from bson import ObjectId
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

client = MongoClient("mongodb://localhost:27017/")
db = client["test"]
cvs_collection = db["cvs"]
offres_collection = db["offres"]

def get_text_from_mongodb(cv_id, offer_id):
   
    cv_document = cvs_collection.find_one({"_id": ObjectId(cv_id)})
    if not cv_document:
        return None, "CV not found in database"

   
    offer_document = offres_collection.find_one({"_id": ObjectId(offer_id)})
    if not offer_document:
        return None, "Offer not found in database"

   
    cv_text = cv_document.get('profile', '') + ' ' + cv_document.get('description', '')
    offer_text = offer_document.get('desc_poste', '')

    return cv_text, offer_text

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(cv_text, offer_text):
    # Utilisation de CountVectorizer pour créer la matrice de texte
    vectorizer = CountVectorizer()
    text_matrix = vectorizer.fit_transform([cv_text, offer_text])

    # Calcul de la similarité cosinus entre les deux textes
    similarity_matrix = cosine_similarity(text_matrix)
    
    # Obtention du score de similarité (multiplié par 100 pour obtenir un pourcentage)
    similarity_score = similarity_matrix[0][1] * 100
    
    # Formater le score pour qu'il ait deux chiffres après la virgule
    similarity_score_formatted = round(similarity_score, 2)

    return similarity_score_formatted
