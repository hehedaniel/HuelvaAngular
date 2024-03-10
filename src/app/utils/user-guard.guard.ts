import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard {

  constructor(private _cookieService: CookieService, private router: Router) {

  }


  // Comprueba si hay token y, si lo hay y es administrador, entonces permite que entre en "users", que es la ruta que está protegida
  // Si no es administrador, no permite el acceso a users
  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let token = this._cookieService.get('token'); // Obtener el token de la cookie

      if (!token) { // Si no hay token, redirige al login
        this.router.navigate(['/inicio'])
        return false;
      } else
      {
        // Decodifica el token para extraer la parte llamada "carga útil" (payload), que contiene cualquier
        // tipo de información que desees transmitir de manera segura entre el cliente y el servidor
        let tokenPayload = JSON.parse(atob(token.split('.')[1]));
        let role = tokenPayload.role;
        if (role) {
          if ( role !== "administrador" && route.routeConfig?.path === 'adminplaces')
            return false;
          else
              return true;
        }
        return true;
      }
  }

}