import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServentretienService } from '../services/serventretien.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-updateentretien',
  templateUrl: './updateentretien.component.html',
  styleUrls: ['./updateentretien.component.css']
})
export class UpdateentretienComponent implements OnInit {
  isLoggedIn = false;
  entretienId: any;
  entretienData: any;

  constructor(
    private route: ActivatedRoute,
    private _auth: AuthService ,
    private router: Router,
    private entretienService: ServentretienService
  ) { }

  ngOnInit(): void {
    if(this._auth.isLoggedIn()){

      this.isLoggedIn = true;
    }
    this.entretienId = this.route.snapshot.paramMap.get('id');
    this.loadEntretienData();
  }

  loadEntretienData(): void {
    this.entretienService.getEntretienById(this.entretienId)
      .subscribe(
        (data) => {
          this.entretienData = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'entretien : ', error);
        }
      );
  }

  updateEntretien(): void {
    this.entretienService.updateEntretien(this.entretienId, this.entretienData)
      .subscribe(
        (updatedEntretien) => {
          console.log('Entretien mis à jour avec succès : ', updatedEntretien);
          window.history.back();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'entretien : ', error);
        }
      );
  }

  onSubmit(): void {
    // Vous pouvez appeler la fonction de mise à jour ici
    this.updateEntretien();
  }
}