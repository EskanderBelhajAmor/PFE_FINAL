import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServcandService {
  private apiUrl = 'http://127.0.0.1:3000/candidature'; 

  constructor(private http: HttpClient) { }

 
  ajouterCandidature(candidatureData: any): Observable<any> {
    const formData = new FormData();
    formData.append('idemployeur', candidatureData.idemployeur);
    formData.append('idcandidat', candidatureData.idcandidat);
    formData.append('etat', candidatureData.etat);
    formData.append('idoffre', candidatureData.idoffre);
    formData.append('CVpdf', candidatureData.CVpdf);
    formData.append('prenom', candidatureData.prenom);
    formData.append('nom', candidatureData.nom);
    formData.append('email', candidatureData.email);
    formData.append('telephone', candidatureData.telephone);
    formData.append('phrasemotivation', candidatureData.phrasemotivation);
    formData.append('CVpdf', candidatureData.phrasemotivation);
    formData.append('titre', candidatureData.titre);
    formData.append('descposte', candidatureData.descposte);
    

    return this.http.post<any>(`${this.apiUrl}/ajoutercandidature`, formData);
  }


  getCandidatureById(candidatureId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getcandidaturebyid/${candidatureId}`);
  }


  modifierEtatCandidature(candidatureId: string, nouvelEtat: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/updateetat/${candidatureId}`, { etat: nouvelEtat });
  }


  getCandidaturesByEmployeurId(employeurId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employeur/${employeurId}`);
  }

 
  getCandidaturesByCandidatId(candidatId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/candidat/${candidatId}`);
  }

  
  getAllCandidatures(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getall`);
  }

 
  getCandidaturesByOffreId(offreId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/offre/${offreId}`);
  }

  calculateSimilarity(cvId: string, offerId: string): Observable<any> {
    const payload = { cv_id: cvId, offer_id: offerId };
    return this.http.post<any>(`${this.apiUrl}/calculate_similarity`, payload);
  }
}