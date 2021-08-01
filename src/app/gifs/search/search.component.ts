import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }
  
  // Para buscar un elemento en el html
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar(){

    const termino = this.txtBuscar.nativeElement.value;

    if (termino.trim().length === 0) {
      return;
    }
    
    this.gifsService.buscarGifs( termino);
    this.txtBuscar.nativeElement.value = '';

  }

}
