import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';


@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    DestinosApiClient
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino:DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
      this.destino = this.destinosApiClient.getById(id);
  }

}
