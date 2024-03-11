import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent {

  formRegister: FormGroup;

  correosCheck: Array<UserModel> = [];

  comunidades_list: string[] = [
    'Andalucía',
    'Aragón',
    'Asturias',
    'Islas Baleares',
    'Canarias',
    'Cantabria',
    'Castilla y León',
    'Castilla-La Mancha',
    'Cataluña',
    'Extremadura',
    'Galicia',
    'Madrid',
    'Murcia',
    'Navarra',
    'País Vasco',
    'La Rioja',
    'Comunidad Valenciana',
    'Otro'
  ];

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _loginService: LoginService,
    // private _cookieService: CookieService,
    @Inject(MAT_DIALOG_DATA) public data: UserModel) {
    this.formRegister = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      comunidad: [null],
      email: ['', [Validators.required, Validators.email]],
      role: ["usuario"],
      birthday: [''],
      gender: [''],
      phone: ['', [Validators.required]],

      //No se guardan
      password: ['', [Validators.required]],
      passwordRepeat: ['', [Validators.required]]
    });
  }

  register() {
    const formBirthday = this.formRegister.value.birthday;
    let formattedBirthday: Date | null = null;
    if (formBirthday != null) {
      let nextDay = new Date(formBirthday);
      nextDay.setDate(formBirthday.getDate() + 1);
      formattedBirthday = nextDay.toISOString().slice(0, 10) as unknown as Date;
    }
    if (this.checkPasswordSame() && this._loginService.comprobarCorreo(this.formRegister.value.email)) {
      const userData: UserModel = new UserModel(
        this.formRegister.value.firstName,
        this.formRegister.value.lastName,
        this.formRegister.value.comunidad,
        this.formRegister.value.email,
        this.formRegister.value.role,
        formattedBirthday,
        this.formRegister.value.gender,
        this.formRegister.value.phone,
        "introducirToken",
        this.formRegister.value.id
      );

      this._loginService.comprobarCorreo(userData.email).subscribe(user => {
        next: {
          this.correosCheck = user;
        }
        error:console.log;
      });

      console.log(this.correosCheck);

      let existsEmail = this.correosCheck.length > 0 ? true: false;

      console.log(existsEmail);

        if(existsEmail){
          this._snackBar.open("El correo ya esta registrado.", '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          })
        }else{
          if (this._loginService.addUser(userData).subscribe({})){
            this._router.navigate(["login"]);
            console.log('ok');
          }
        }

    }else {
      this._snackBar.open("Las contraseñas deben ser iguales.", '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
    }
  }

  checkPasswordSame() {
    return this.formRegister.value.password == this.formRegister.value.passwordRepeat;
  }

  cancelar() {
    // alert();
    this.formRegister.reset();
  }

}
