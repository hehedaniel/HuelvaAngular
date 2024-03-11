import { Component, OnInit, ViewChild } from '@angular/core';
import { Places } from '../interfaces/places';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SitiosServiceService } from '../service/sitios-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirmdialog/confirmdialog.component';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { AddEditPlaceComponent } from '../add-edit-place/add-edit-place.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-places',
  templateUrl: './admin-places.component.html',
  styleUrls: ['./admin-places.component.css']
})
export class AdminPlacesComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource !: MatTableDataSource<Places>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (
    private _placesService: SitiosServiceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _cookieService: CookieService,
    private _router: Router){}

  ngOnInit(): void {
    this.showPlaces();

    if (this._cookieService.check("token")){
      let token = this._cookieService.get("token");
      let tokenPayLoad = JSON.parse(atob(token.split('.')[1]));
      let role = tokenPayLoad.role;

      if(role != "administrador"){
        this._router.navigate(["main"]);
      }
    }else {
      this._router.navigate(["main"]);
    }


  }

  showPlaces(){
    this._placesService.getPlacesAdmin().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarSitio(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600px',
      data: { mensaje: '¿Estás seguro de que deseas eliminar este sitio?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._placesService.deletePlace(id).subscribe({
          next: (val: any) => {
            this.showPlaces();
            this._snackBar.open('Sitio eliminado con exito', 'Cerrar', {
              duration: 1500,
            });
          },
          error: console.log
        });

      }else {
        this._snackBar.open('Sitio no eliminado', 'Cerrar', {
          duration: 1500,
        });
      }
    });
  }

  editPlace(data: Places){

    let dialogRef;
      dialogRef = this.dialog.open(AddEditPlaceComponent, {
        width: '650px',
        height: '720px',
        data});

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val)
          this.showPlaces();
      }
    })
  }

  createPlace(){
    let dialogRef;
      dialogRef = this.dialog.open(AddEditPlaceComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val)
          this.showPlaces();
      }
    })
  }
}
