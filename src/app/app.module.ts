import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ContentComponent } from './content/content.component';
import { ContentcardComponent } from './contentcard/contentcard.component';

// import { HttpClient } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {MatGridListModule} from '@angular/material/grid-list';
import { LoginComponent } from './login/login.component';

//Formulario
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';

//Administracion
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';


//Para retoques
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegFormComponent } from './reg-form/reg-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminPlacesComponent } from './admin-places/admin-places.component';
import { ConfirmDialogComponent } from './confirmdialog/confirmdialog.component';
import { AddEditPlaceComponent } from './add-edit-place/add-edit-place.component';
import { JwtInterceptorInterceptor } from './utils/jwt-interceptor.interceptor';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContentComponent,
    ContentcardComponent,
    LoginComponent,
    RegFormComponent,
    AdminPlacesComponent,
    ConfirmDialogComponent,
    AddEditPlaceComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    // HttpClient,
    HttpClientModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue:{}},
    {provide: MatDialogRef, useValue:{}},
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    // {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
