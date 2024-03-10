import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { ContentcardComponent } from './contentcard/contentcard.component';
import { LoginComponent } from './login/login.component';
import {RegFormComponent} from './reg-form/reg-form.component';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';

const routes: Routes = [
  {path: 'inicio', component: ContentcardComponent},
  {path: 'sitio/:id', component: ContentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegFormComponent},
  {path: 'adminplaces', component: AdminPlacesComponent},
  {path: 'edit/:id', component: AddEditPlaceComponent},
  {path: 'edit', component: AddEditPlaceComponent},

  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
