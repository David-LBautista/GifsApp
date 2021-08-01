import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = 'fQD3daT4y7Laeulizwp1t49OXXseGbBc';
  private _historial:string[] = [];

  constructor(
    private http: HttpClient
  ) { }


  get historial(){
    return [...this._historial];
  }



  buscarGifs(query:string){

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes(query) ){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
    this.http.get('http://api.giphy.com/v1/gifs/search?api_key=fQD3daT4y7Laeulizwp1t49OXXseGbBc&q=dbz&limit=10')
        .subscribe( resp => {
          console.log(resp)
        })
  }



}
