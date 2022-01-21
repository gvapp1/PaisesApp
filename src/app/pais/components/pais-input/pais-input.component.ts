import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent  implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter(); //se emite cuando la persona deja de escribir
  @Input() placeholder : string = '';
  
  //Observable es un Subject, permite crear un observable manuelmente 
  debouncer: Subject<string> = new Subject(); //debouncer funcionara para darle tiempo a la busqueda

  termino : string = '';

  //Codigo RX
  ngOnInit(): void {//Se dispara una unica vez y cuando el componente es creado y esta inicializado
      this.debouncer
      .pipe(debounceTime(300))//pipe "Tuberia" de una conexión que permite trasnformar la salida del suscribe, debounceTime permite decir cuantas milessimas de segundos quiero esperar antes de escribir el siguiente valor
      .subscribe( valor => { //Suscribimos el this.debouncer declarado arriba de tipo Subject //linea 18
       //console.log('debouncer:', valor)
        this.onDebounce.emit(valor)        
      });
  }

  buscar(){
    this.onEnter.emit(this.termino);//emitimos el termino buscado y lo enlazamos al html necsario en este caso por pais-component
  }

  teclaPresionada(){//implizatemente tiene el event del componente
      this.debouncer.next( this.termino);
  }

//Cuando se renderiza esa página, como bien dices se ejecuta el ngOnInit al principio, lo que crea un .subscribe del debouncer,
//por lo que cuando el debouncer reciba un nuevo valor, ya está escuchando. Es por eso que llamado a teclaPresionada, 
//este hace el next al debouncer con el valor, y con el .subscribe que tenemos este lo recibe y ya hace el .emit.
//No es que accedamos al ngOnInit, es que cuando este se ejecuta al principio deja el .subscribe para estar atento a los cambios.
  
  

  
}
