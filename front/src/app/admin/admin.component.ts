import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  isLoggedIn = false;
  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      users => {
        this.users = users;
        
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    );
  }

}
