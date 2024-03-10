import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  firstname: string = "";
  isAdmin: boolean = false;

  constructor (private _cookieService: CookieService, private _router: Router, private _sharedService: MatSnackBar){}

  ngOnInit(){
    this.getLoggedFirstName();
  }

  // Si hay token en una cookie, devuelve true y guarda el nombre de usuario. Si no, devuelve false
  getLoggedFirstName(): boolean {

    // Lee el token de la cookie y extrae el nombre de usuario
    let token: string = this._cookieService.get('token');

    if (!token)
      return false;
    else
    {
      let tokenPayload = JSON.parse(atob(token.split('.')[1]));

      this.firstname = tokenPayload.firstName;

      if (tokenPayload.role === "administrador")
        this.isAdmin = true;

      return true;
    }
  }

  logout(){
    this._cookieService.delete('token');
    this.isAdmin = false;
    this._router.navigate(['/inicio']);
    location.reload();
  }
}
