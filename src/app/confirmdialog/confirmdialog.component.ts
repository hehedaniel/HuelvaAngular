import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div>
      <h1>{{ data.mensaje }}</h1>
      <div>
        <button mat-button (click)="cerrarDialogo(true)">Sí</button>
        <button mat-button (click)="cerrarDialogo(false)">No</button>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  mensaje: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {
    this.mensaje = data.mensaje;
  }

  cerrarDialogo(resultado: boolean): void {
    this.dialogRef.close(resultado);
  }
}
