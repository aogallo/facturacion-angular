import { Component, OnInit } from '@angular/core';
import { Factura } from "../../models/factura";
import { FacturaService } from "../../services/factura/factura.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Cliente } from "../../models/cliente";
import { FacturaDetalle } from "../../models/factura.detalle";
import { Producto } from "../../models/producto";

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
  selector: 'app-factura-detalle-producto',
  templateUrl: './factura-detalle-producto.component.html',
  styleUrls: ['./factura-detalle-producto.component.css']
})
export class FacturaDetalleProductoComponent implements OnInit {
  submitted = false;
  factura: Factura = new Factura();
  data : Data;
  id: number;

  productos: Producto [] = [];
  productoPedido: Producto [] = [];
  producto: Producto = new Producto();  

  constructor(private facturaService: FacturaService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.data = {
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

    this.id = this.route.snapshot.params['id'];

    this.facturaService.getById(this.id)
    .subscribe(dt => {
      console.log("respuesta",dt)
      this.data = dt
    }, error => console.log(error));
  }

  cancelarFactura(){
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  newCliente(): void {
    this.submitted = false;
    this.factura = new Factura();
  }

  save() {
    this.facturaService.add(this.factura)
      .subscribe(data => console.log(data), error => console.log(error));
    this.factura = new Factura();
    this.gotoList();
  }

  gotoList(){
    this.router.navigate(['/factura'])
  }
}
