import { Component, Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';


class DestinosApiClientViejo {
  getById(id: String): DestinoViaje {
    console.log('llamado por la clase vieja!');
    return null;
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    DestinosApiClient,
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient }
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino:DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
      this.destino = this.destinosApiClient.getById(id);
  }

}
