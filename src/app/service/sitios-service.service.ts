import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Places } from '../interfaces/places';
import { PlaceModel } from '../models/place.model';


@Injectable({
  providedIn: 'root'
})
export class SitiosServiceService {

  constructor(private _http: HttpClient) { }

  private urlBBDD = 'http://localhost:3000/sitios';
  // private urlBBDD = 'https://65eae45243ce16418932bc60.mockapi.io/componentes/sitios';

  getSites(): Observable<PlaceModel[]> {
    return this._http.get<PlaceModel[]>(this.urlBBDD);
  }

  getSiteById(id: string): Observable<PlaceModel[]> {
    return this._http.get<PlaceModel[]>(`${this.urlBBDD}/${id}`);
  }

  getPlacesAdmin(): Observable<any[]> {
    return this._http.get<any[]>(this.urlBBDD);
  }


  // deletePlace(id: number){
  //   return this._http.delete(${this.urlBBDD}/${id});
  // }

  editPlace(id: string, data: PlaceModel): Observable<PlaceModel>{
    return this._http.put<PlaceModel>(`${this.urlBBDD}/${id}`, data);
  }

  addPlace(data: PlaceModel): Observable<PlaceModel>{
    return this._http.post<PlaceModel>(`${this.urlBBDD}`,data);
  }



  //NO FUNCIONAAAAAAAAAA
  deletePlace(id: string){
    console.log(id);
    console.log(`${this.urlBBDD}/${id}`);
    return this._http.delete<PlaceModel>(`${this.urlBBDD}/${id}`);
  }
}