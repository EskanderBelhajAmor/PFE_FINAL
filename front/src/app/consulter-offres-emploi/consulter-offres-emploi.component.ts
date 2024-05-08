import { Component, OnInit } from '@angular/core';
import { SerOffreService } from '../services/seroffre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SercvService } from '../services/sercv.service';
import { AuthService } from '../services/auth.service';
import { ServcandService } from '../services/servcand.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez Validators
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-consulter-offres-emploi',
  templateUrl: './consulter-offres-emploi.component.html',
  styleUrl: './consulter-offres-emploi.component.css'
})
export class ConsulterOffresEmploiComponent implements OnInit {
  isLoggedIn = false;
  selectedOfferId: string | undefined;
  selecteddesc: string | undefined;
  selectedtitre: string | undefined;
  selectedemployeurId: string | undefined;
  selectedFile: File | undefined;
  id : any;
user : any ;
  offreForm!: FormGroup; 
  candidatureForm!: FormGroup;
  offres: any[] = [];

  constructor(private offreService: SerOffreService, private formBuilder: FormBuilder  , private _auth : AuthService,
    private act : ActivatedRoute,
    private router: Router,
    private candService: ServcandService,
     private _snackBar: MatSnackBar,
    
    ) { }

  ngOnInit(): void {
    if(this._auth.isLoggedIn()){

      this.isLoggedIn = true;
    }
    this.initForm();
    this.id = this.act.snapshot.paramMap.get('id');
    this.initForm1();
    this._auth.getByID(this.id)
      .subscribe(
        res => {
          this.user = res;
        
        }
      );
 
  }

  initForm(): void {
    this.offreForm = this.formBuilder.group({
      keywords: ['']
    });
  }

  searchOffres(): void {
    const keywords = this.offreForm.value.keywords;
    this.offreService.searchOffres(keywords).subscribe(
      (data) => {
        this.offres = data;
        this.offres = data.filter((offre) => offre.isactive === true);
      },
      (error) => {
        console.error('Erreur lors de la recherche des offres : ', error);
      }
    );
  }

  selectOffer(offerId: string , employeurid  : string , title : string , desc : string): void {
    this.selecteddesc=desc;
    this.selectedtitre=title;
    this.selectedOfferId = offerId;
    this.selectedemployeurId = employeurid;
    this.candidatureForm.patchValue({
      idoffre: this.selectedOfferId,
      idemployeur: this.selectedemployeurId,
      idcandidat : this.id,
      descposte : this.selecteddesc,
      etat :"demande",
      email: this.user.email,
      prenom: this.user.prenom,
      nom: this.user.nom,
      titre : this.selectedtitre

    });
  }




  getOffersByLocation(location: string): void {
    // Appel à votre service d'offres pour récupérer les offres par emplacement
    this.offreService.getOffresByEmplacement(location).subscribe(
      (data) => {
        // Traitement des offres récupérées, par exemple les afficher dans la page
        this.offres = data;
        this.offres = data.filter((offre) => offre.isactive === true);
      },
      (error) => {
        console.error('Erreur lors de la récupération des offres par emplacement:', error);
      }
    );
  }



  getOffersByspecialite(specialite: string): void {
   
    this.offreService. getOffresBySpecialite(specialite).subscribe(
      (data) => {
        // Traitement des offres récupérées, par exemple les afficher dans la page
        this.offres = data;
        this.offres = data.filter((offre) => offre.isactive === true);
      },
      (error) => {
        console.error('Erreur lors de la récupération des offres par emplacement:', error);
      }
    );
  }





  initForm1(): void {
    this.candidatureForm = this.formBuilder.group({
      idemployeur: ['', Validators.required],
      idcandidat: ['', Validators.required],
      idoffre: ['', Validators.required],
      etat: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      phrasemotivation: ['', Validators.required],
      titre: ['', Validators.required],
      descposte : ['', Validators.required],
      CVpdf: [null, [Validators.required, this.validatePDF]]
    });
  }
  onSubmit(): void {
    console.log(this.candidatureForm);
    if (this.candidatureForm.valid) {
        this.candService.ajouterCandidature(this.candidatureForm.value).subscribe(
            (response) => {
                console.log('candidature ajoutée avec succès : ', response);
                const offreId = this.candidatureForm.value.idoffre; // Récupérer l'ID de l'offre depuis le formulaire
                this.offreService.incrementCandidature(offreId).subscribe(
                    () => {
                        console.log('Nombre de candidatures incrémenté avec succès pour l\'offre : ', offreId);
                        this.router.navigate(['/']);
                        this._snackBar.open('candidature ajoutée avec succès.', 'Fermer', {
                            duration: 4000, // Durée d'affichage du message (en millisecondes)
                        });
                        window.location.reload();
                    },
                    (error) => {
                        console.error('Erreur lors de l\'incrémentation du nombre de candidatures : ', error);
                    }
                );
            },
            (error) => {
                console.error('Erreur lors de l\'ajout de la candidature : ', error);
            }
        );
    } else {
        console.error('Le formulaire n\'est pas valide');
    }
}

  selectCV(event: any): void {
    const file = event.target.files[0];
    this.candidatureForm.patchValue({
      CVpdf: file
    });
  }

  // Fonction de validation personnalisée pour le champ CVpdf
  validatePDF(control: any): { [key: string]: any } | null {
    const file = control.value;
    if (file && file.type !== 'application/pdf') {
      return { 'invalidPDF': true };
    }
    return null;
  }
  
  







}