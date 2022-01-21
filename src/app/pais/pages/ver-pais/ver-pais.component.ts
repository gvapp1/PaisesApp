import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap} from 'rxjs/operators' //Operadores interresantes en rx permite recibir un observable y retornar otro
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais-interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor
  (private activatedRoute: ActivatedRoute,
     private paisService: PaisService ) { } //el nombre no es obligatorio, lo imporante es ActivatedRoute viene con lo necsario para susbrbirnos a cualqueri cambio de la URL

  ngOnInit(): void {//buen lugar para suscribirnos esccuchamos los cambios que se lllevan
      /*this.activatedRoute.params
      .subscribe( ({id}) => { //parametro de la estructura del routing ejemplo pais/:id
      console.log(id); 
      this.paisService.getPaisPorAlpha(id)
      .subscribe(pais => {console.log(pais);
      })  
    }) //Esto es un observable
    */

    this.activatedRoute.params //nos subscribimos al abservable
    .pipe(
      //switchMap( (param) => this.paisService.getPaisPorAlpha(param['id'])) //Al subscbirnos a la ruta tomamos el id
      switchMap( ({id}) => this.paisService.getPaisPorAlpha(id)),
      tap(console.log) //TAP es un operador que dispara un eefcto segundario. lo que hace es que recibe el producto del obseravable de arriba, del switchMap
      
    ) //pude definir cualqueir operador de rx para el observable
    .subscribe( pais => { //nos trae el retorno      
      this.pais = pais
    })
  }

}
