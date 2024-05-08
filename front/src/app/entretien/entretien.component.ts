import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ActivatedRoute, Router } from '@angular/router';
import { ServcandService } from '../services/servcand.service';
import { ServentretienService } from '../services/serventretien.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent implements OnInit {
  isLoggedIn = false;
  calendarOptions: any;
  entretiens?: any[];
  id: any;
  cand: any;
  entretienForm!: FormGroup;
  calendar!: Calendar;

  constructor(
    private act: ActivatedRoute,
    private _auth: AuthService ,
    private router: Router,
    private candService: ServcandService,
    private entretienService: ServentretienService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {  
    if(this._auth.isLoggedIn()){

      this.isLoggedIn = true;
    }
    this.id = this.act.snapshot.paramMap.get('id');
    this.candService.getCandidatureById(this.id)
      .subscribe(
        (data) => {
          this.cand = data;
          this.loadData(); // Charger les données après avoir récupéré la candidature
        },
        (error) => {
          console.error('Erreur lors de la récupération des candidatures : ', error);
        }
      );
  }

  loadData(): void {
    this.entretienService.getEntretiensByEmployeurId(this.cand.idemployeur)
      .subscribe(
        (data) => {
          this.entretiens = data.map((entretien: any) => ({
            titre: entretien.titre,
            dateentretien: entretien.dateentretien.split('T')[0], // Formater la date
            heureentretien: entretien.heureentretien
          }));
          this.initForm();
          this.entretienForm.patchValue({
            idemployeur: this.cand.idemployeur,
            idcandidat: this.cand.idcandidat,
            idoffre: this.cand.idoffre,
            email: this.cand.email,
            titre: this.cand.titre
          });
          this.loadCalendar();
        },
        (error) => {
          console.error('Erreur lors de la récupération des entretiens : ', error);
        }
      );
  }

  loadCalendar(): void {
    if (this.entretiens) {
      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        height: '600px',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        eventDisplay: 'block',
        events: this.entretiens.map(entretien => ({
          title: entretien.titre,
          start: entretien.dateentretien + 'T' + entretien.heureentretien,
        })),
        eventClick: (info: any) => {
          console.log('Event clicked:', info.event);
        }
      };
  
      const calendarElement = document.getElementById('calendar');
      if (calendarElement) {
        this.calendar = new Calendar(calendarElement, this.calendarOptions);
        this.calendar.render();
      } else {
        console.error("Element 'calendar' not found.");
      }
    } else {
      console.error("Entretiens data is undefined.");
    }
  }

  initForm(): void {
    this.entretienForm = this.formBuilder.group({
      idemployeur: ['', Validators.required],
      idcandidat: ['', Validators.required],
      idoffre: ['', Validators.required],
      dateentretien: ['', Validators.required],
      heureentretien: ['', Validators.required],
      email: ['', Validators.required],
      titre: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.entretienService.createEntretien(this.entretienForm.value).subscribe(
      (response) => {
        console.log('entretien ajoutée avec succès : ', response);
     
         // Recharger la page après l'ajout d'entretien
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'entretien : ', error);
      }
    );
    this._snackBar.open('Entretien créer avec succées !! .', 'Fermer', {
      duration: 6000, // Durée d'affichage du message (en millisecondes)
    });
  }
}
