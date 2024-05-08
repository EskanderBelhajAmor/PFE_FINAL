import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServentretienService {
  private apiUrl = 'http://localhost:3000/zoomapi'; // L'URL de votre API pour les entretiens Zoom

  constructor(private http: HttpClient) { }

  // Créer un nouvel entretien Zoom
  createEntretien(entretienData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addentretien`, entretienData);
  }

  // Obtenir tous les entretiens Zoom
  getAllEntretiens(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtenir un entretien Zoom par ID
  getEntretienById(entretienId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${entretienId}`);
  }

  // Mettre à jour un entretien Zoom par ID
  updateEntretien(entretienId: string, entretienData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${entretienId}`, entretienData);
  }

  // Supprimer un entretien Zoom par ID
  deleteEntretien(entretienId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${entretienId}`);
  }


   // Obtenir les entretiens d'un employeur spécifique par ID de l'employeur
   getEntretiensByEmployeurId(employeurId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getentretienbyemployeurid/${employeurId}`);
  }
}