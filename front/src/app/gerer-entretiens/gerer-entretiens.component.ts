import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServcandService } from '../services/servcand.service';
import { ServentretienService } from '../services/serventretien.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-gerer-entretiens',
  templateUrl: './gerer-entretiens.component.html',
  styleUrls: ['./gerer-entretiens.component.css']
})
export class GererEntretiensComponent implements OnInit {
  isLoggedIn = false;
  entretiens: any[] = [];
  id: any;

  constructor(
    private act: ActivatedRoute,
    private _auth: AuthService ,
    private router: Router,
    private entretienService: ServentretienService
  ) { }

  ngOnInit(): void {
    if(this._auth.isLoggedIn()){

      this.isLoggedIn = true;
    }
    this.id = this.act.snapshot.paramMap.get('id');
    this.loadEntretiens();
  }

  loadEntretiens(): void {
    this.entretienService.getAllEntretiens()
      .subscribe(
        (data) => {
          this.entretiens = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des entretiens : ', error);
        }
      );
  }

  supprimerEntretien(entretienId: string): void {
    this.entretienService.deleteEntretien(entretienId)
      .subscribe(
        () => {
          console.log('Entretien supprimé avec succès.');
          // Mettre à jour la liste des entretiens après la suppression
          this.loadEntretiens();
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'entretien : ', error);
        }
      );
  }
  formatDateString(dateString: string): string {
    const date = new Date(dateString);
    // Formater la date au format "YYYY-MM-DD"
    return date.toISOString().split('T')[0];
  }
}
