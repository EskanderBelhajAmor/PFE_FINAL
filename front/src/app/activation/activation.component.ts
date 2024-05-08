
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})


export class ActivationComponent implements OnInit {
  activationCode: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient , private router : Router , private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activationCode = params['activationcode'];
      console.log(this.activationCode);
      this.verifyActivationCode();
    });
  }

  verifyActivationCode() {
    this.http.post<any>('http://127.0.0.1:3000/user/verifyuser/' + this.activationCode, {})
      .subscribe(
        response => {
          console.log(response);
          if (response.message === "Le compte a été activé avec succès.") {
            this.router.navigate(['/login']);
            window.alert('Votre e-mail a été vérifié avec succès. Vous pouvez maintenant accéder à votre compte');
          } else {
            window.alert('Erreur lors de vérification de votre Email');
          }
        },
        error => {
          console.error(error);
          // Gérer les erreurs de la requête HTTP, par exemple afficher un message d'erreur à l'utilisateur
        }
        
      );
  }
}