import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL_API = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) { }

  loginUser(email: string, password: string): Observable<{ role: string, token: string } | {}> {
    console.log(email + password);

    console.log(this._http.get<UserModel[]>(`${this.URL_API}`).pipe(
      map(data => {
        let validUser = data.find((user: UserModel) => user.email === email && JSON.parse(atob(user.token.split('.')[1])).password === password);

        return validUser ? { role: validUser.role, token: validUser.token } : {};
      })
    ));



    return this._http.get<UserModel[]>(`${this.URL_API}`).pipe(
      map(data => {
        let validUser = data.find((user: UserModel) => user.email === email && JSON.parse(atob(user.token.split('.')[1])).password === password);

        return validUser ? { role: validUser.role, token: validUser.token } : {};
      })
    );
  }

  addUser(user: UserModel): Observable<UserModel>{
    return this._http.post<UserModel>(`${this.URL_API}`, user);
  }

  comprobarCorreo(correo: string): Observable<UserModel[]>{
    return this._http.get<UserModel[]>(`${this.URL_API}?email=${correo}`);
  }
}