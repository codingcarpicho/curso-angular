//@ts-ignore
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { DestinoViaje } from './destino-viaje.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable()
 export class DestinosApiClient {
	destinos: DestinoViaje[] = [];
		
		constructor(private store: Store<AppState>) {
			this.store
			.select(state => state.destinos)
			.subscribe((data) => {
				console.log('destinos sub store');
				console.log(data);
				this. destinos = data.items;
			});
			this.store
			.subscribe((data) => {
				console.log('all store');
				console.log(data);
			});
		}
		
		 add(d:DestinoViaje){
		   this.store.dispatch(new NuevoDestinoAction(d));
		 }
	
		
		getById(id: String): DestinoViaje {
			return this.destinos.filter(function(d) { return d.toString() === id; })[0];
		}
		 
		 elegir(d: DestinoViaje){
			 this.store.dispatch(new ElegidoFavoritoAction(d));
		 }
	
		getAll(): DestinoViaje[] {
			return this.destinos;
		}
	
	 }