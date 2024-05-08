import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
user ={
  email:'',
  password :''
}
isLoggedIn = false;
constructor(private  _auth : AuthService , private router : Router , private _snackBar: MatSnackBar){}
ngOnInit(): void {
if(this._auth.isLoggedIn()){

  this.isLoggedIn = true;
}
}
token : any;
login(){
this._auth.login(this.user)
.subscribe(
  res=>{

this.token =res;
if (res && this.token.mytoken) {
localStorage.setItem('token', this.token.mytoken)

this.router.navigate(['/home'])


this._snackBar.open('Bienvenue !! .', 'Fermer', {
  duration: 6000, // Durée d'affichage du message (en millisecondes)
});
}

else {
  // Si la réponse ne contient pas de token valide
  console.log('Token invalide');
  this._snackBar.open('Email ou Mot de passe est invalide .', 'Fermer', {
    duration: 6000, // Durée d'affichage du message (en millisecondes)
  });
}
  },
  err=>{
    this._snackBar.open('Email ou Mot de passe est invalide .', 'Fermer', {
      duration: 6000, // Durée d'affichage du message (en millisecondes)
    });
    console.log(err);
  }





)

}



}
