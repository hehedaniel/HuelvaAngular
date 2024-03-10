// content.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SitiosServiceService } from '../service/sitios-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  place: any;
  formCommentRating: FormGroup;

  possibleRating = ['0','1','2','3','4','5'];

  loggedIn: boolean = false;
  loggedUserId: string = "";

  constructor(
    private route: ActivatedRoute,
    private placeService: SitiosServiceService,
    private _fb: FormBuilder,
    private _cookieService: CookieService) {
    this.formCommentRating = this._fb.group({
      rating: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const placeId = params['id'];
      this.placeService.getSiteById(placeId).subscribe(place => {
        this.place = place;
      });
    });

    let token = this._cookieService.get("token");
    let tokenPayLoad = JSON.parse(atob(token.split('.')[1]));
    let role = tokenPayLoad.role;
    this.loggedUserId = tokenPayLoad.id;

    if(!token){
      this.loggedIn = false;
    }else if(role == "administrador"){
      this.loggedIn = false;
    }else{
      this.loggedIn = true;
    }

    console.log(this.loggedIn + " " + this.loggedUserId);

  }

  cambiarImgCental(urlPoner: any, idImgCambiar : any){
    let imgCentral = document.getElementById('imgCentral');
    let imgCambiar = document.getElementById(idImgCambiar);

    let urlImgCental = imgCentral?.getAttribute("src") || 'null';
    let urlImgCambiar = imgCambiar?.getAttribute("src") || 'null';

    imgCentral?.setAttribute("src", urlImgCambiar);
    imgCambiar?.setAttribute("src", urlImgCental);
  }

  calcularMedia(ratings: string[]): string {

    let valoracionesNumericas = ratings.map(rating => parseFloat(rating));
    let suma = valoracionesNumericas.reduce((total, rating) => total + rating, 0);

    return (suma / valoracionesNumericas.length).toFixed(2).toString();
  }

  submitformCommentRating(){
    if(this.formCommentRating.valid){
      this.place.rating.push(this.formCommentRating.value.rating);
      this.place.comments.push(this.formCommentRating.value.comment);
      this.place.commentUser.push(this.loggedUserId);

      this.placeService.editPlace(this.place.id, this.place).subscribe({
        next: (val: any) => {
          console.log(val);
        },
        error: console.log
      });
    }
  }

}
