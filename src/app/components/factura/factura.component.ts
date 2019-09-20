import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { Cliente } from "../../models/cliente";
import { FacturaDetalle } from "../../models/factura.detalle";
import { Route } from '@angular/compiler/src/core';
import { FacturaService } from 'src/app/services/factura/factura.service';

interface Data  {
  id: number;
  id_cliente: number;
  cliente: Cliente;
  factura_detalle: FacturaDetalle [];
  total_factura : number;
  numero_factura: string;
  reg_consola: string;
  reg_fecha: Date;
  reg_usuario: string;
}

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  closeResult: string;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  fechaFormateada : string;
  _tot = 0;
  bandGuardo: boolean = false;

  data: Data [] = [];

  factura : Data = {
    id: 0,
    id_cliente: 0,
    cliente: null,
    factura_detalle:  [],
    total_factura : 0,
    numero_factura : "",
    reg_consola: "",
    reg_fecha: null,
    reg_usuario: ""
  }

  constructor(
      private router : Router,
      private facturaService : FacturaService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.facturaService.getAll()
    .subscribe(facturas => {
      console.log(facturas);
      facturas.map(item => {
        item.factura_detalle.map(detalle => {
          this._tot += detalle.cantidad * detalle.precio_unitario;
          console.log('holi annrouse', this._tot);
        })
        console.log('holi annrouse totales', this._tot);

        item.total_factura = this._tot;
        item.fecha_factura = item.fecha_factura.substring(0,item.fecha_factura.indexOf('T'));
        // .utc("2016-09-19", "YYYY-MM-DD");
      })
      this.data = facturas;
    },error => console.log(error));
  }
  crear(){
    this.router.navigate(['factura/crear'])
  }

  gotoDetails(id){
    this.router.navigate(['factura/factura_detalle',id,this._tot])
  } 
}
