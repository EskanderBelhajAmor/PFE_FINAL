import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServcandService } from '../services/servcand.service';
import { SerOffreService } from '../services/seroffre.service';

@Component({
  selector: 'app-consulter-candidatures',
  templateUrl: './consulter-candidatures.component.html',
  styleUrl: './consulter-candidatures.component.css'
})
export class ConsulterCandidaturesComponent implements OnInit {
  isLoggedIn = false;
  id : any;
user : any ;
offres?: any[];

  constructor(private offreService: SerOffreService , private _auth : AuthService,
    private act : ActivatedRoute,
    private router: Router,
    private candService: ServcandService
    
    ) { }

ngOnInit(): void {
  if(this._auth.isLoggedIn()){

    this.isLoggedIn = true;
  }
  this.id = this.act.snapshot.paramMap.get('id');
  this.offreService.getOffresByEmployeurId(this.id)
  .subscribe(
    (data) => {
      this.offres = data;
  
    },
    (error) => {
      console.error('Erreur lors de la récupération des offres : ', error);
    }
  );  
}





}