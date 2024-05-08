import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerOffreService {
  private apiUrl = 'http://127.0.0.1:3000/offre'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllOffres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getalloffres`);
  }

  getOffreById(offreId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getoffrebyid/${offreId}`);
  }

  getOffresByEmplacement(emplacement: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getbyplace/${emplacement}`);
  }

  getOffresBySpecialite(specialite: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getbyspecialite/${specialite}`);
  }

  getOffresByEmployeurId(employeurId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getbyidemployeur/${employeurId}`);
  }
 

  getOffresByEmployeurIdnotactive(employeurId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getbyidemployeurifnotactive/${employeurId}`);
  }

  createOffre(offreData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addoffre`, offreData);
  }

  deleteOffre(offreId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteoffre/${offreId}`);
  }

  searchOffres(keywords: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search/${keywords}`);
  }

  incrementCandidature(offreId: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/increment/${offreId}/increment-candidature`, {});
  }
}
