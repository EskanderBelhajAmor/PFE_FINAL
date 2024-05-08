import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SerOffreService } from '../services/seroffre.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importez Validators

@Component({
  selector: 'app-ajouter-offres',
  templateUrl: './ajouter-offres.component.html',
  styleUrls: ['./ajouter-offres.component.css'] // Changez styleUrl en styleUrls
})
export class AjouterOffresComponent implements OnInit {
  
  selectedTab: string = 'option1'; // Option sélectionnée par défaut
  offres?: any[];
  
  offresnotactive?: any[];
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
  offreForm!: FormGroup;
  id: any;
  user: any;
  isLoggedIn = false;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private act: ActivatedRoute,
    private offreService: SerOffreService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    if (this._auth.isLoggedIn()) {
      this.isLoggedIn = true;
    }

    this.id = this.act.snapshot.paramMap.get('id');

    this._auth.getByID(this.id)
      .subscribe(
        res => {
          this.user = res;
          console.log(this.user);
        }
      );
      this.offreService.getOffresByEmployeurId(this.user._id)
      .subscribe(
        (data) => {
          this.offres = data;
      
        },
        (error) => {
          console.error('Erreur lors de la récupération des offres : ', error);
        }
      );   
  
      this.offreService.getOffresByEmployeurIdnotactive(this.user._id)
      .subscribe(
        (data) => {
          this.offresnotactive = data;
          
        },
        (error) => {
          console.error('Erreur lors de la récupération des offres : ', error);
        }
      );


    this.initForm();


    this.offreForm.patchValue({
      idemployeur: this.user._id,
      nombreCandidature:0
    });

    this.offreForm.patchValue({
      specialite: this.user.specialite
    });
  }

  initForm(): void {
    this.offreForm = this.formBuilder.group({
      titre: ['', Validators.required],
      desc_entreprise: ['', Validators.required],
      desc_poste: ['', Validators.required],
      qualification: ['', Validators.required],
      enligneouadist: ['', Validators.required],
      datecloture: ['', Validators.required],
      emplacement: ['', Validators.required],
      idemployeur: ['', Validators.required],
      specialite:  ['', Validators.required],
      nombreCandidature: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.offreForm.valid) {
      this.offreService.createOffre(this.offreForm.value).subscribe(
        (response) => {
          console.log('Offre ajoutée avec succès : ', response);
          this.router.navigate(['/']);
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'offre : ', error);
        }
      );
    } else {
      console.error('Le formulaire n\'est pas valide');
    }
  }
}
