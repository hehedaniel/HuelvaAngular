import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  nombre: string = 'Daniel Martin Hermoso Hermoso';
  curso: string = '2 DAW - Diseño de Aplicaciones Web';
  fechaActual: Date = new Date();
}
