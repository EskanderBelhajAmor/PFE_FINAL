import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ActivationComponent } from './activation/activation.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AjouterOffresComponent } from './ajouter-offres/ajouter-offres.component';
import { ConsulterCandidaturesComponent } from './consulter-candidatures/consulter-candidatures.component';
import { GererEntretiensComponent } from './gerer-entretiens/gerer-entretiens.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { CreerModifierCVComponent } from './creer-modifier-cv/creer-modifier-cv.component';
import { ConsulterOffresEmploiComponent } from './consulter-offres-emploi/consulter-offres-emploi.component';
import { SuivreCandidaturesComponent } from './suivre-candidatures/suivre-candidatures.component';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DetailsComponent } from './details/details.component';
import { EntretienComponent } from './entretien/entretien.component';
import { UpdateentretienComponent } from './updateentretien/updateentretien.component';
import { DiscussioncandidatComponent } from './discussioncandidat/discussioncandidat.component';
import { TestComponent } from './test/test.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './layout/header/header.component';
import { PlusinfoComponent } from './plusinfo/plusinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ActivationComponent,
    AjouterOffresComponent,
    ConsulterCandidaturesComponent,
    GererEntretiensComponent,
    DiscussionComponent,
    CreerModifierCVComponent,
    ConsulterOffresEmploiComponent,
    SuivreCandidaturesComponent,
    DetailsComponent,
    EntretienComponent,
    UpdateentretienComponent,
    DiscussioncandidatComponent,
    TestComponent,
    AdminComponent,
    HeaderComponent,
    PlusinfoComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
