import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServDiscussionService {
  private apiUrl = 'http://localhost:3000/discussion'; // L'URL de votre API pour les discussions

  constructor(private http: HttpClient) { }

  // Créer une nouvelle discussion
  createDiscussion(discussionData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, discussionData);
  }

  // Mettre à jour une discussion par ID
  updateDiscussion(discussionId: string, discussionData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${discussionId}`, discussionData);
  }

  // Supprimer une discussion par ID
  deleteDiscussion(discussionId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${discussionId}`);
  }

  // Obtenir toutes les discussions
  getAllDiscussions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtenir les messages entre deux utilisateurs spécifiques
  getMessagesBetweenUsers(emetteurId: string, recepteurId: string, idOffre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages?id1=${emetteurId}&id2=${recepteurId}&idOffre=${idOffre}`);
  }
  

}
