import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  isLoggedIn = false;
user = {
nom: '',
prenom: '',
email : '',
password :'',
username :'',
cin: '',
role:'',
specialite: '',
image: ''


}
specialites: string[] = ['Informatique', 'Mécanique', 'Électrique', 'Chimie', 'Biologie', 'Mathématiques', 'Physique', 'Finance', 'Médecine', 'Arts'];

image : any;
select(e:any){
  this.image= e.target.files[0];
}

constructor(private _auth: AuthService , private router: Router  , private _snackBar: MatSnackBar){}

ngOnInit(): void {


  if(this._auth.isLoggedIn()){

    this.isLoggedIn = true;
  }
}
register(){
  let fd = new FormData()
fd.append('nom', this.user.nom)
fd.append('prenom', this.user.prenom)
fd.append('cin', this.user.cin)
fd.append('email', this.user.email)
fd.append('username', this.user.username)
fd.append('password', this.user.password)
fd.append('specialite', this.user.specialite)
fd.append('role', this.user.role)
fd.append('image', this.image)
this._auth.register(fd)
.subscribe(
res=>{
  this.router.navigate(['/login']);
  this._snackBar.open('Compte créé avec succès . Veuillez vérifier votre e-mail pour la confirmation.', 'Fermer', {
    duration: 6000, // Durée d'affichage du message (en millisecondes)
  });
}

);
}
}
