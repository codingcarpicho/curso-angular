import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../../models/destinos-viajes-state.model';
import { DestinoViaje } from './../../models/destino-viaje.model';
import { DestinosApiClient } from './../../models/destinos-api-client.model';


@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destino.component.html',
  styleUrls: ['./lista-destino.component.css'],
  providers: [DestinosApiClient]
})
export class ListaDestinoComponent implements OnInit {
  @Output() onItemAdded:EventEmitter<DestinoViaje>;
  updates: string[];
  all;
  //destinos: DestinoViaje[];
  constructor(public destinosApiClient:DestinosApiClient, 
    private store: Store<AppState>) { 
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    
    store.select(state => state.destinos.items).subscribe(items => this.all = items);
  }

  ngOnInit(): void {
    this.store.select(state => state.destinos.favorito)
        .subscribe(d => {
          if (d != null) {
            this.updates.push('Se ha elegido a ' + d.nombre);
          }
        });
  }
  /*
  guardar(nombre:string, url:string):boolean {
    this.destinos.push(new DestinoViaje(nombre, url));
    //console.log(new DestinoViaje(nombre,url));
    //console.log(this.destinos);
    return false;
  }*/
  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  elegido(e: DestinoViaje){
    //desmarcar todos los demas en en array de elegidos
    //this.destinos.forEach(function (x) {x.setSelected(false); });
    //se marca el elegido
    //d.setSelected(true);
    this.destinosApiClient.elegir(e);
  }

  getAll() {

  }

}