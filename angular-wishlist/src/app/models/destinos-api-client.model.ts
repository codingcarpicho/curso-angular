//@ts-ignore
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppConfig, AppState, APP_CONFIG, db } from '../app.module';
import { DestinoViaje } from './destino-viaje.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable()
 export class DestinosApiClient {
	destinos: DestinoViaje[] = [];
		
		constructor(
			private store: Store<AppState>,
			@Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
			private http: HttpClient
			) {
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
		
		 add(d: DestinoViaje){
		   const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
		   const req = new HttpRequest('POST', this.config.apiEndPoint + '/my', { nuevo: d.nombre }, { headers: headers });
		   this.http.request(req).subscribe((data: HttpResponse<{}>) => {
			   if (data.status === 200) {
				   this.store.dispatch(new NuevoDestinoAction(d));
				   const myDb = db;
				   myDb.destino.add(d);
				   console.log('todos los destinos de la db!');
				   myDb.destino.toArray().then(destinos => console.log(destinos))
			   }
		   });
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