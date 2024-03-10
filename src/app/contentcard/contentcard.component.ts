import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { SitiosServiceService } from '../service/sitios-service.service';
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-contentcard',
  templateUrl: './contentcard.component.html',
  styleUrls: ['./contentcard.component.css']
})
export class ContentcardComponent implements OnInit {

  places: any[] = [];

  constructor(private placesService: SitiosServiceService) { }

  ngOnInit(): void {
    this.placesService.getSites().subscribe(places => {
      console.log(places);
      this.places = places;
    });
  }

  calcularMedia(ratings: string[]): string {
    let valoracionesNumericas = ratings.map(rating => parseFloat(rating));
    let suma = valoracionesNumericas.reduce((total, rating) => total + rating, 0);

    return (suma / valoracionesNumericas.length).toFixed(2).toString();
  }

  descripcionMostrar(descripcion: string): string{
    const palabras = descripcion.split(' ');

    if (palabras.length <= 50) {
        return descripcion;
    }

    const primera50Palabras = palabras.slice(0, 50).join(' ');
    return `${primera50Palabras} + '...'`;
  }

  async descargarPDF() {
    const pdf = new PdfMakeWrapper();

    for (const sitio of this.places) {
      pdf.add(new Txt('Nombre: ' + sitio.name).style('subtitulo').end);
      pdf.add(new Txt(sitio.descripcion).style('normal').end);
      pdf.add(new Txt(sitio.parrafo1).style('normal').end);
      pdf.add(new Txt(sitio.parrafo2).style('normal').end);

      pdf.add(await new Img(sitio.imageUrl[0]).width(180).height(130).margin([0, 20, 0, 0]).build());
      pdf.add(await new Img(sitio.imageUrl2[0]).width(180).height(130).margin([0, 20, 0, 0]).build());
      pdf.add(await new Img(sitio.imageUrl3[0]).width(180).height(130).margin([0, 20, 0, 0]).build());
      pdf.add(await new Img(sitio.imageUrl4[0]).width(180).height(130).margin([0, 20, 0, 0]).build());
      pdf.add(await new Img(sitio.imageUrl5[0]).width(180).height(130).margin([0, 20, 0, 0]).build());
      pdf.add(await new Img(sitio.imageUrl6[0]).width(180).height(130).margin([0, 20, 0, 0]).build());
      pdf.add(await new Img(sitio.imageUrl7[0]).width(180).height(130).margin([0, 20, 0, 0]).build());
      pdf.add(await new Img(sitio.imageUrl8[0]).width(180).height(130).margin([0, 20, 0, 0]).build());

      if (this.places.indexOf(sitio) == this.places.length - 1){
        pdf.add(await new Img(sitio.imageUrl9[0]).width(180).height(130).margin([0, 20, 0, 0]).build());
      }else {
        pdf.add(await new Img(sitio.imageUrl9[0]).width(180).height(130).margin([0, 20, 0, 0]).pageBreak('after').build());
      }
    }

    pdf.styles({
      titulo: { fontSize: 18, bold: true, margin: [0, 10, 0, 0] },
      subtitulo: { fontSize: 16, bold: true, margin: [0, 10, 0, 0] },
      normal: { fontSize: 12, margin: [0, 5, 0, 0] },
    });

    pdf.create().download('Huelva_DanielMartinHermosoHermoso.pdf');
  }
}
