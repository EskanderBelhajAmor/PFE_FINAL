import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
private url = 'http://127.0.0.1:3000/user/';

register (user : any){
return this.http.post(this.url + 'register', user);

}


login (user : any){
  return this.http.post(this.url + 'login', user);
  
  }

  isLoggedIn() {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('token');
      return !!token; // Convertit la valeur en un booléen
    } else {
      return false;
    }
  }
  isCandidat(): boolean {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('token');
      if (token) {
        let data = JSON.parse(window.atob(token.split('.')[1]));
        return data.roles === 'candidat';
      }
    }
    return false;
  }

  isadmin(): boolean {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem('token');
      if (token) {
        let data = JSON.parse(window.atob(token.split('.')[1]));
        return data.roles === 'admin';
      }
    }
    return false;
  }

  getAuthorDataFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const data = JSON.parse(window.atob(token.split('.')[1]));
      return data;
   
    }
    
  }
getByID(id:any){
return this.http.get(this.url + 'getbyid/' + id);

}




getAllUsers() {
  return this.http.get<any[]>(this.url + 'all');
}


}

  