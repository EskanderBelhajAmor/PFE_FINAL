import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServcandService } from '../services/servcand.service';
@Component({
  selector: 'app-suivre-candidatures',
  templateUrl: './suivre-candidatures.component.html',
  styleUrl: './suivre-candidatures.component.css'
})
export class SuivreCandidaturesComponent implements OnInit {
  isLoggedIn = false;
  candidatures?: any[];
  id : any;
user : any ;
  constructor(
    private act : ActivatedRoute,
    private _auth : AuthService,
    private router: Router,
    private candService: ServcandService
    ) { }

  ngOnInit(): void {
    if(this._auth.isLoggedIn()){

      this.isLoggedIn = true;
    }
    this.id = this.act.snapshot.paramMap.get('id');
    this.candService.getCandidaturesByCandidatId(this.id)
    .subscribe(
      (data) => {
        this.candidatures = data;
    console.log(data)
      },
      (error) => {
        console.error('Erreur lors de la récupération des candidatures : ', error);
      }
    ); 
  }
}
