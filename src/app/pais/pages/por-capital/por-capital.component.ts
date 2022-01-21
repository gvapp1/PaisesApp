import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais-interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {
termino:string = '';
hayError: boolean = false;
paises : Country[] = []
placeholderr :string ='';
constructor(private paisService: PaisService){}

buscar(termino:string){
  this.hayError = false;
  this.termino = termino;
  console.log(this.termino);

  this.paisService.buscarCapital(termino)
    .subscribe(
    {     next: (paises) => 
          {      
            //debugger;    
            //if(paises[0].message !== undefined)
            //{
              console.log(paises );
              this.paises = paises;
            //} 
             
          }
          ,
          error: (err) => 
          {  
          this.hayError=true;  
          console.log('sdsa');          
          this.paises = [];
        }
    });
  }

  sugerencias(termino: string){
    this.hayError = false;
  }

}
