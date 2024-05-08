import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  userRole: string | null = null;
  constructor(public _auth : AuthService , private router : Router ){}
  ngOnInit(): void {

  }
  logout(){
    localStorage.removeItem('token');
    localStorage.clear()
     this.router.navigate(['/login']);
  }


  reloadPage(): void {
    window.location.reload();
  }

}