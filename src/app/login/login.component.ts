import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor(private _fb: FormBuilder, private _snackBar: MatSnackBar, private _router: Router,
    private _loginService: LoginService, private _cookieService: CookieService) {
    this.form = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {

    let email: string = this.form.value.email;
    let password: string = this.form.value.password;
    // console.log(this.form.value.user)); Depuracion

    this._loginService.loginUser(email, password).subscribe({
      next: (result: { role: string, token: string } | {}) => {
        if ('role' in result && 'token' in result) {

          this._cookieService.set('token', result.token);

          if (result.role === 'administrador') {
            this._router.navigate(['adminplaces']);
          }else {
            this._router.navigate(['inicio']);
          }
        } else {
          this.mostrarError('Los datos introducidos son incorrectos o no existen');
        }
      },
      error: console.log
    })
  }

  mostrarError(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
    this.form.reset();
  }
}
