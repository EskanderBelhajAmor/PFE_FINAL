import { Component, OnInit } from '@angular/core';
import { SerOffreService } from '../services/seroffre.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  offreForm!: FormGroup; 
  offres: any[] = [];

  constructor(private offreService: SerOffreService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
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





}