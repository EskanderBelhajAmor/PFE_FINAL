import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ServcandService } from '../services/servcand.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ServTestiqService } from '../services/servtestiq.service';
import { SercvService } from '../services/sercv.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isLoggedIn = false;
  candidatures: any[] = [];
  id: any;
  boutonClique: boolean = false;

  constructor(
    private act: ActivatedRoute,
    private _auth: AuthService,
    private router: Router,
    private candService: ServcandService,
    private sanitizer: DomSanitizer,
    private testService: ServTestiqService,
    private cvService: SercvService
  ) { }

  ngOnInit(): void {
    if(this._auth.isLoggedIn()){

      this.isLoggedIn = true;
    }
    this.id = this.act.snapshot.paramMap.get('id');
    this.candService.getCandidaturesByOffreId(this.id)
      .subscribe(
        (data) => {
          this.candidatures = data;
          console.log(data);
          this.fetchIQValues(); // Appel à la méthode pour récupérer les valeurs IQ
          this.processCandidatures();
        },
        (error) => {
          console.error('Erreur lors de la récupération des candidatures : ', error);
        }
      );
  }
  async processCandidatures(): Promise<void> {
    for (const candidature of this.candidatures) {
      try {
        const userId = candidature.idcandidat;
        if (userId !== undefined && userId !== null) {
          const cvId = await this.getCvIdByUser(userId).toPromise();
          if (typeof cvId === 'string') { // Vérifiez si cvId est bien de type string
            const offerId = candidature.idoffre;
            this.calculateSimilarity(cvId, offerId, candidature);
          } else {
            console.error('ID du CV non valide pour la candidature :', candidature);
          }
        } else {
          console.error('Identifiant de l\'utilisateur non défini pour la candidature :', candidature);
        }
      } catch (error) {
        console.error('Erreur lors du traitement de la candidature : ', error);
      }
    }
  }
  
  
  

  getCvIdByUser(userId: string): Observable<string> {
    return this.cvService.getCvIdByUserId(userId).pipe(
      map((response: any) => response._id),
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'ID du CV :', error);
        return throwError('Erreur lors de la récupération de l\'ID du CV');
      })
    );
  }

  calculateSimilarity(cvId: string, offerId: string, candidature: any): void {
    this.candService.calculateSimilarity(cvId, offerId).subscribe(
      (response) => {
        if (response && response.similarity_score !== undefined) {
          console.log('Résultat de similarité :', response.similarity_score);
          candidature.similarity = response.similarity_score;
        } else {
          console.error('Réponse de similarité invalide :', response);
          candidature.similarity = 0; // Valeur par défaut en cas de réponse invalide
        }
      },
      (error) => {
        console.error('Erreur lors du calcul de similarité :', error);
        candidature.similarity = 0; // Valeur par défaut en cas d'erreur
      }
    );
  }
  
  

  async fetchIQValues(): Promise<void> {
    for (const candidature of this.candidatures) {
      try {
        const iqValue: number = await this.myfonction(candidature.idcandidat);
        candidature.iq = iqValue;
      } catch (error) {
        console.error('Erreur lors de la récupération de la valeur IQ : ', error);
        candidature.iq = 0; // Valeur par défaut en cas d'erreur
      }
    }
  }

  async myfonction(id: string): Promise<number> {
    try {
      const data: any = await this.testService.getTauxByIdCandidat(id).toPromise();
      return data.taux; // Supposons que les résultats renvoyés contiennent une propriété 'taux'
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats de l\'IQ : ', error);
      return 0; // Retourner une valeur par défaut en cas d'erreur
    }
  }

  getFileNameFromPath(filePath: string): string {
    // Diviser le chemin complet en parties séparées par le caractère '/'
    const parts = filePath.split('\\');
    // Récupérer la dernière partie qui contient le nom du fichier
    const fileName = parts[parts.length - 1];
    return fileName;
  }

  modifierEtatCandidature(candidatureId: string, nouvelEtat: string): void {
    this.candService.modifierEtatCandidature(candidatureId, nouvelEtat).subscribe(
      (response) => {
        console.log('État de la candidature modifié avec succès : ', response);
        this.boutonClique = true;
        // Ajoutez ici le code pour gérer la réponse si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la modification de l\'état de la candidature : ', error);
        // Ajoutez ici le code pour gérer les erreurs si nécessaire
      }
    );
  }
}
