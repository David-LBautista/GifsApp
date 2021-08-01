import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url:string = 'http://api.giphy.com/v1/gifs/search?';
  private apiKey:string = 'fQD3daT4y7Laeulizwp1t49OXXseGbBc';

  private _historial:string[] = [];

  public resultados: Gif[] = [];

  constructor(
    private http: HttpClient
  ) { 
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }


  get historial(){
    return [...this._historial];
  }



  buscarGifs(query:string){

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      
      localStorage.setItem('historial', JSON.stringify(this._historial))


    }

    this.http.get<SearchGifsResponse>(`${this.url}api_key=${this.apiKey}&q=${query}&limit=12`)
        .subscribe( resp => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        })
  }



}
