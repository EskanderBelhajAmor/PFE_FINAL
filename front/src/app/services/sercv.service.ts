// sercv.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SercvService {
  private apiUrl = 'http://127.0.0.1:3000/cv'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllCVs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getallcv`);
  }

  getCVById(cvId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getbyid/${cvId}`);
  }

  getCVsByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getbyiduser/${userId}`);
  }

  createCV(cvData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addcv`, cvData);
  }

  deleteCV(cvId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${cvId}`);
  }


  getCvIdByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getidcvbyiduser/${userId}`);
  }
}
