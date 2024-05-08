
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServTestiqService } from '../services/servtestiq.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface Question {
    text: string;
    answer: string | number;
    userAnswer?: string | number;
}

@Component({
    selector: 'app-testiq',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    isLoggedIn = false;
    duration!: number;
    minutes!: string;
    seconds!: string;
    clockDisplay!: string;
    questions: Question[] = [
      { text: '1, 4, 9, 16, 25, _____.', answer: 36 },
      { text: 'A, B, D, G, K, _____.', answer: 'P' },
      { text: '2, 3, 5, 7, 11, _____.', answer: 13 },
      { text: 'Z, Y, W, U, S, _____.', answer: 'Q' },
      { text: '21, 20, 18, 15, 11, _____.', answer: 6 },
      { text: 'C, F, I, L, O, _____.', answer: 'R' },
  { text: '1, 1, 2, 3, 5, 8, _____.', answer: 13 },
  { text: 'M, Q, U, Y, _____.', answer: 'C' },
  { text: '0, 1, 4, 9, 16, _____.', answer: 25 },
  { text: 'A, C, E, G, I, _____.', answer: 'K' },
  { text: '1, 2, 4, 8, 16, _____.', answer: 32 },
  { text: 'Z, X, V, T, R, _____.', answer: 'P' },
  { text: '31, 28, 31, 30, 31, _____.', answer: 30 },
  { text: 'B, E, H, K, N, _____.', answer: 'Q' },
  { text: '3, 6, 9, 12, 15, _____.', answer: 18 },
  { text: 'O, L, I, F, C, _____.', answer: 'Z' },
  { text: '1, 4, 9, 16, _____.', answer: 25 },
  { text: 'J, L, N, P, R, _____.', answer: 'T' },
  { text: '14, 28, 42, 56, _____.', answer: 70 },
  { text: 'Y, V, S, P, M, _____.', answer: 'J' }
    
  ].slice(0, 10); 

    currentQuestionIndex: number = 0;
    timeLeft: number = 600; 
    timer: any;
    idCandidat: string | null = null;
    score: number = 0;
    testStarted: boolean = false;

    constructor(
        private testService: ServTestiqService,
        private _auth: AuthService ,
        private act: ActivatedRoute,
        private cdr: ChangeDetectorRef,
     private _snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        if(this._auth.isLoggedIn()){

            this.isLoggedIn = true;
          }
        this.duration = this.timeLeft;
        this.idCandidat = this.act.snapshot.paramMap.get('id');
        this.shuffleQuestions();
    }

    startTest(): void {
        console.log("Démarrage du test");
        this.testStarted = true;
        this.clockDisplay = this.calculateTime(this.timeLeft);
        this.updateClock();
    }

    updateClock(): void {
        this.timer = setTimeout(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this.clockDisplay = this.calculateTime(this.timeLeft);
                this.updateClock();
                this.cdr.detectChanges();
            } else {
                this.clockDisplay = '00:00';
                this.testStarted = false;
            }
        }, 1000);
    }

    calculateTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    nextQuestion(): void {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
        }
    }

    prevQuestion(): void {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
        }
    }

    submitAnswers(): void {
        clearInterval(this.timer);
        this.score = this.calculateScore();
        if (this.idCandidat) {
            this.testService.addTest(this.idCandidat, this.score).subscribe(
                (data) => {
                    console.log("Score envoyé avec succès: ", this.score);
                    this._snackBar.open('réponse envoyée avec succès.', 'Fermer', {
                        duration: 6000, 
                      });
                },
                (error) => {
                    console.error("Erreur lors de l'envoi du score: ", error);
                    
                }
            );
        }
    }

    calculateScore(): number {
        let score = 0;
       
        this.questions.forEach(question => {
            console.log("Réponse de l'utilisateur :", question.userAnswer);
            console.log("Réponse correcte :", question.answer);
            if (question.userAnswer == question.answer) {
                score += 1;
            }
        });
        console.log("Score calculé :", score);
        return score * 10;
    }
    
    
  

    shuffleQuestions(): void {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[j], this.questions[i]] = [this.questions[i], this.questions[j]];
        }
    }
}
