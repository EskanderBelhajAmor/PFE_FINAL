import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServTestiqService {
  private apiUrl = 'http://localhost:3000/testiq'; // URL de votre API

  constructor(private http: HttpClient) { }

  // Ajouter un test IQ
  addTest(idcandidat: string, taux: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tests`, { idcandidat, taux });
  }

  // Obtenir le taux par ID du candidat
  getTauxByIdCandidat(idcandidat: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/taux/${idcandidat}`);
  }
}
