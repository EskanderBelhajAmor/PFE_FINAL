import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Component, OnInit , AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SercvService } from '../services/sercv.service';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms'; // Importez AbstractControl
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-creer-modifier-cv',
  templateUrl: './creer-modifier-cv.component.html',
  styleUrl: './creer-modifier-cv.component.css'
})
export class CreerModifierCVComponent implements OnInit {
  isLoggedIn = false;
  cvForm!: FormGroup;
id : any;
user : any ;
cvs: any[] = [];
progressValue = 0;
  constructor(
    private formBuilder: FormBuilder,
    private cvService: SercvService,
    private _auth : AuthService,
    private act : ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this._auth.isLoggedIn()){

      this.isLoggedIn = true;
    }
    this.id = this.act.snapshot.paramMap.get('id');

    this._auth.getByID(this.id)
    .subscribe(
res=>{
  this.user = res;
  console.log (this.user);
  this.getCVsByUserId(this.id);
}


    );

    
  
    this.initForm();
    this.cvForm.patchValue({
      Cin: this.user.cin
    });

    this.cvForm.patchValue({
      Email: this.user.email
    });

    this.cvForm.patchValue({
      iduser: this.user._id
    });

    this.cvForm.patchValue({
      nom: this.user.nom
    });

    this.cvForm.patchValue({
      prenom: this.user.prenom
    });


    this.cvForm.patchValue({
      image: this.user.image
    });

    this.progressValue = 0;

    this.updateProgressValue();
    
  }



  updateProgressValue(): void {
    // Calculez la valeur du progress bar en fonction des exigences minimales
    // Par exemple:
    const experiencesCount = this.experiencesArray?.controls?.length || 0;
    const formationsCount = this.formationsArray?.controls?.length || 0;
    const competencesCount = this.competencesArray?.controls?.length || 0;
    const languesCount = this.languesArray?.controls?.length || 0;
    const qualitesCount = this.qualitesArray?.controls?.length || 0;
    const certificationsCount = this.certificationsArray?.controls?.length || 0;
    this.progressValue = Math.min(100, (experiencesCount + formationsCount + certificationsCount +  competencesCount + languesCount + qualitesCount) / 8 * 100);
    this.progressValue = Math.round(Number(this.progressValue.toFixed(2)));
  }

  initForm(): void {
    this.cvForm = this.formBuilder.group({ 
      Cin: ['', Validators.required],
      image: ['', Validators.required],
      telephone: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      profile: ['', Validators.required],
      description: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      iduser: ['', Validators.required],
      experiences: this.formBuilder.array([]),
      formations: this.formBuilder.array([]),
      competences: this.formBuilder.array([]),
    certifications: this.formBuilder.array([]),
    langues: this.formBuilder.array([]),
    qualites: this.formBuilder.array([])
    });

  }

  get experiencesArray(): FormArray | null {
    return this.cvForm.get('experiences') as FormArray | null;
  }

  get formationsArray(): FormArray | null {
    return this.cvForm.get('formations') as FormArray | null;
  }

  get competencesArray(): FormArray | null {
    return this.cvForm.get('competences') as FormArray | null;
  }
  get certificationsArray(): FormArray | null {
    return this.cvForm.get('certifications') as FormArray | null;
  }

  get languesArray(): FormArray | null {
    return this.cvForm.get('langues') as FormArray | null;
  }

  get qualitesArray(): FormArray | null {
    return this.cvForm.get('qualites') as FormArray | null;
  }
 
  
  addExperience(): void {
    const experiences = this.cvForm.get('experiences') as FormArray;
    experiences.push(
      this.formBuilder.group({
        title: ['', Validators.required],
        description: [''],
        
      start_date: [''], // Ajoutez le champ de date de début
      end_date: [''] 
      })
    );
    this.updateProgressValue();
  }
  

  removeExperience(index: number): void {
    const experiences = this.experiencesArray;
    if (experiences) {
      experiences.removeAt(index);
    }
    this.updateProgressValue();
  }

  addFormation(): void {
    const formations = this.cvForm.get('formations') as FormArray;
    formations.push(
      this.formBuilder.group({
        title: ['', Validators.required],
        institution: [''],
        start_date: [''], // Ajoutez le champ de date de début
      end_date: ['']  
        // Ajoutez d'autres champs de formation ici si nécessaire
      })
    );
    this.updateProgressValue();
  }

  removeFormation(index: number): void {
    const formations = this.formationsArray;
    if (formations) {
      formations.removeAt(index);
    }
    this.updateProgressValue();
  }







  addCompetence(): void {
    const competences = this.cvForm.get('competences') as FormArray;
    competences.push(
      this.formBuilder.group({
        title: ['', Validators.required],
        
        // Ajoutez d'autres champs de formation ici si nécessaire
      })
    );
    this.updateProgressValue();
  }

  removeCompetence(index: number): void {
    const competences = this.competencesArray;
    if (competences) {
      competences.removeAt(index);
    }
    this.updateProgressValue();
  }







  addCertification(): void {
    const certifications = this.cvForm.get('certifications') as FormArray;
    certifications.push(
      this.formBuilder.group({
        title: ['', Validators.required],
       
        // Ajoutez d'autres champs de formation ici si nécessaire
      })
    );
    this.updateProgressValue();
  }

  removeCertification(index: number): void {
    const certifications = this.certificationsArray;
    if (certifications) {
      certifications.removeAt(index);
    }
    this.updateProgressValue();
  }







  addLangue(): void {
    const langues = this.cvForm.get('langues') as FormArray;
    langues.push(
      this.formBuilder.group({
        title: ['', Validators.required],
        
        // Ajoutez d'autres champs de formation ici si nécessaire
      })
    );
    this.updateProgressValue();
  }

  removeLangue(index: number): void {
    const langues = this.languesArray;
    if (langues) {
      langues.removeAt(index);
    }
    this.updateProgressValue();
  }







  addQualite(): void {
    const qualites = this.cvForm.get('qualites') as FormArray;
    qualites.push(
      this.formBuilder.group({
        title: ['', Validators.required],
      
        // Ajoutez d'autres champs de formation ici si nécessaire
      })
    );
    this.updateProgressValue();
  }

  removeQualite(index: number): void {
    const qualites = this.qualitesArray;
    if (qualites) {
      qualites.removeAt(index);
    }
    this.updateProgressValue();
  }








  onSubmitForm(): void {
    if (this.progressValue >= 70) {
      // Soumettez le formulaire
      const formValue = this.cvForm.value;
      console.log(formValue);
      this.cvService.createCV(formValue).subscribe(
        (response) => {
          console.log('CV créé avec succès : ', response);
          this.router.navigate(['/']);
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de la création du CV : ', error);
        }
      );
    }
   

  }

  getProgressBarClass(): string {
    return this.progressValue < 70 ? 'progress-bar-red' : 'progress-bar-green';
  }
 
  getCVsByUserId(userId: string): void {
    this.cvService.getCVsByUserId(userId).subscribe(
      (cvs) => {
        this.cvs = cvs; // Stockez les CV récupérés dans le tableau
      },
      (error) => {
        console.error('Erreur lors de la récupération des CV : ', error);
      }
    );
  }

  printCV(cv: any): void {
    // Sélectionnez l'élément contenant le CV à imprimer
    const cvElement = document.getElementById('cv-container');
  
    if (cvElement) {
      // Capturez l'élément en tant qu'image rasterisée avec html2canvas
      html2canvas(cvElement, { useCORS: true, width: cvElement.clientWidth, height: cvElement.clientHeight }).then((canvas) => {
        // Créez un nouveau PDF avec jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4');
  
        // Ajoutez l'image capturée au PDF avec les dimensions réelles
        const imgData = canvas.toDataURL('image/png', 1.0); // Augmentez la qualité de l'image
        const imgWidth = 210; // Largeur de la page A4 en mm
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
        // Téléchargez ou affichez le PDF généré
        pdf.save('cv.pdf');
      }).catch((error) => {
        console.error('Erreur lors de la capture de l\'image : ', error);
      });
    } else {
      console.error('Élément CV non trouvé.');
    }
  }
  
  
  

  












  
}