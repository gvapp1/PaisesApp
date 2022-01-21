import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais-interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
    //name/costa
  private apiUrl:string = 'https://restcountries.com/v2'
    
  constructor( private http: HttpClient) { }

  buscarPais(termino: string) : Observable<Country[]>{    
    const url = `${this.apiUrl}/name/${termino}`
    return this.http.get<Country[]>(url)
    //regresamos un arreglo vacio
    //operadores de rxjs, operadores son funciones en base a una accion, en este caso al get/observable
    // .pipe(
    //   catchError(err => of([]))  //catchError funcion que regresa un observable el of es una funcion que genera observable, que lo que pongamos en () genera uno nuevo
    // )
  }

  buscarCapital(termino: string) : Observable<Country[]>{    
    const url = `${this.apiUrl}/capital/${termino}`
    return this.http.get<Country[]>(url)    
  }

  getPaisPorAlpha(id: string) : Observable<Country>{    
    const url = `${this.apiUrl}/alpha/${id}`
    return this.http.get<Country>(url)    
  }
}
