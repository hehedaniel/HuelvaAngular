import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SitiosServiceService } from '../service/sitios-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceModel } from '../models/place.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-place',
  templateUrl: './add-edit-place.component.html',
  styleUrls: ['./add-edit-place.component.css']
})
export class AddEditPlaceComponent {
  place: any;
  placeID: any;

  formPlace: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private placeService: SitiosServiceService,
    private _dialogRef: MatDialogRef<AddEditPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlaceModel) {
    // console.log(data.id + 'arriba');
    this.place = data;
    this.formPlace = this._fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      parrafo1: ['', [Validators.required]],
      parrafo2: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      imgUrl2: ['', [Validators.required]],
      imgUrl3: ['', [Validators.required]],
      imgUrl4: ['', [Validators.required]],
      imgUrl5: ['', [Validators.required]],
      imgUrl6: ['', [Validators.required]],
      imgUrl7: ['', [Validators.required]],
      imgUrl8: ['', [Validators.required]],
      imgUrl9: ['', [Validators.required]],
      rating: [[]],
      comments: [[]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.placeService.getSiteById(this.place.id).subscribe(place => {
        this.place = place;

        // Inicializar el formulario con los valores de Place
        this.formPlace = this._fb.group({
          id: this.place.id,
          name: this.place.name,
          description: this.place.description,
          parrafo1: this.place.parrafo1,
          parrafo2: this.place.parrafo2,
          imgUrl: this.place.imageUrl[0],
          imgUrl2: this.place.imageUrl2[0],
          imgUrl3: this.place.imageUrl3[0],
          imgUrl4: this.place.imageUrl4[0],
          imgUrl5: this.place.imageUrl5[0],
          imgUrl6: this.place.imageUrl6[0],
          imgUrl7: this.place.imageUrl7[0],
          imgUrl8: this.place.imageUrl8[0],
          imgUrl9: this.place.imageUrl9[0],
          rating: [[]],
          comments: [[]]
        });
      });
    });
  }

  createPlace() {

    let placeData: PlaceModel = new PlaceModel (
      this.formPlace.value.id,
      this.formPlace.value.name,
      this.formPlace.value.description,
      this.formPlace.value.parrafo1,
      this.formPlace.value.parrafo2,
      [this.formPlace.value.imgUrl, "img1"],
      [this.formPlace.value.imgUrl2, "img2"],
      [this.formPlace.value.imgUrl3, "img3"],
      [this.formPlace.value.imgUrl4, "img4"],
      [this.formPlace.value.imgUrl5, "img5"],
      [this.formPlace.value.imgUrl6, "img6"],
      [this.formPlace.value.imgUrl7, "img7"],
      [this.formPlace.value.imgUrl8, "img8"],
      [this.formPlace.value.imgUrl9, "img9"],
      this.formPlace.value.rating,
      this.formPlace.value.comments
    )

    console.log(placeData);

      if (this.place && this.place.id !== undefined){
        this.placeService.editPlace(this.place.id, placeData).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: console.log
        });
      }else {
        this.placeService.addPlace(placeData).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: console.log
        });
      }
  }
}
