import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ActivationComponent } from './activation/activation.component';
import { AjouterOffresComponent } from './ajouter-offres/ajouter-offres.component';
import { ConsulterCandidaturesComponent } from './consulter-candidatures/consulter-candidatures.component';
import { GererEntretiensComponent } from './gerer-entretiens/gerer-entretiens.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { CreerModifierCVComponent } from './creer-modifier-cv/creer-modifier-cv.component';
import { ConsulterOffresEmploiComponent } from './consulter-offres-emploi/consulter-offres-emploi.component';
import { SuivreCandidaturesComponent } from './suivre-candidatures/suivre-candidatures.component';
import { DetailsComponent } from './details/details.component';
import { EntretienComponent } from './entretien/entretien.component';
import { UpdateentretienComponent } from './updateentretien/updateentretien.component';
import { DiscussioncandidatComponent } from './discussioncandidat/discussioncandidat.component';
import { AdminComponent } from './admin/admin.component';
import { TestComponent } from './test/test.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
{path: 'login' , component: LoginComponent},
{path: 'register' , component: RegisterComponent},
{path: 'home' , component: HomeComponent},
{path: 'confirm/:activationcode' , component: ActivationComponent},
{ path: 'ajouter-offres/:id', component: AjouterOffresComponent },
  { path: 'consulter-candidatures/:id', component: ConsulterCandidaturesComponent },
  { path: 'gerer-entretiens/:id', component: GererEntretiensComponent },
  { path: 'creer-modifier-cv/:id', component: CreerModifierCVComponent },
  { path: 'consulter-offres-emploi/:id', component: ConsulterOffresEmploiComponent },
  { path: 'suivre-candidatures/:id', component: SuivreCandidaturesComponent },
  { path: 'discussion/:id', component: DiscussionComponent },
  { path: 'entretien/:id', component: EntretienComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'update/:id', component: UpdateentretienComponent },
  { path: 'discussioncandidat/:id', component: DiscussioncandidatComponent },
  { path: 'test/:id', component: TestComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
