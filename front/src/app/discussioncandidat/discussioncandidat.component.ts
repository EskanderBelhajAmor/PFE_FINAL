import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ServcandService } from '../services/servcand.service';
import { ServDiscussionService } from '../services/servdiscussion.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-discussioncandidat',
  templateUrl: './discussioncandidat.component.html',
  styleUrl: './discussioncandidat.component.css'
})
export class DiscussioncandidatComponent implements OnInit {
  isLoggedIn = false;
  selectedOfferId: string | undefined;
  selectedcandid: string | undefined;
  selectedemployeurid: string | undefined;
  selectedprenom: string | undefined;
  cands?: any[];
  discussionForm!: FormGroup;
  id: any;
  user: any;
  messages: any[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>(); // Observable pour la désinscription

  constructor(
    private _auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private discussionService: ServDiscussionService,
    private candService: ServcandService,
  ) { }

  ngOnInit(): void {
    if(this._auth.isLoggedIn()){

      this.isLoggedIn = true;
    }
    this.id = this.act.snapshot.paramMap.get('id');
    this._auth.getByID(this.id)
      .subscribe(
        res => {
          this.user = res;
        }
      );
    this.candService.getCandidaturesByCandidatId(this.id)
      .subscribe(
        (data) => {
          this.cands = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des offres : ', error);
        }
      );
    this.initForm();
  }

  selectOffer(employeurid: string, candid: string, offerId: string, prenomrecep: string): void {
    this.selectedOfferId = offerId;
    this.selectedcandid = candid;
    this.selectedemployeurid = employeurid;
    this.selectedprenom = prenomrecep;
  
    if (this.selectedemployeurid && this.selectedcandid) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)}`;
  
      this.discussionForm.patchValue({
        idOffre: this.selectedOfferId,
        emetteurId: this.selectedcandid,
        recepteurId: this.selectedemployeurid,
        nomRecepteur: this.selectedprenom,
        nomEmetteur: this.user?.prenom,
        vueOuNon: false,
        date: formattedDate
      });
  
      this.loadMessages(); // Charger les messages lors de la sélection de la discussion
    }
  }
  
  loadMessages(): void {
    if (this.selectedemployeurid && this.selectedcandid && this.selectedOfferId) {
      this.discussionService.getMessagesBetweenUsers(this.selectedemployeurid, this.selectedcandid, this.selectedOfferId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (messages) => {
            // Parcourir les messages et ajouter la propriété isSent
            this.messages = messages.map((message: any) => ({
              ...message,
              isSent: message.emetteurId === this.selectedcandid
            }));
          },
          (error) => {
            console.error('Erreur lors de la récupération des messages : ', error);
          }
        );
    }
  }
  

  initForm(): void {
    this.discussionForm = this.formBuilder.group({
      emetteurId: ['', Validators.required],
      recepteurId: ['', Validators.required],
      idOffre: ['', Validators.required],
      message: ['', Validators.required],
      nomEmetteur: ['', Validators.required],
      nomRecepteur: ['', Validators.required],
      vueOuNon: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.discussionForm.invalid) {
      return;
    }
  
    this.discussionService.createDiscussion(this.discussionForm.value)
      .subscribe(
        (data) => {
          console.log('Discussion ajoutée avec succès : ', data);
          // Réinitialiser le champ de message
          this.discussionForm.patchValue({
            message: ''
          });
          // Charger à nouveau les messages
          this.loadMessages();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la discussion : ', error);
        }
      );
  }
  

  ngOnDestroy(): void {
    // Désinscrivez-vous de tous les observables lors de la destruction du composant pour éviter les fuites de mémoire
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
