import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from "../../models/cliente";
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { FacturaService } from 'src/app/services/factura/factura.service';
import { Router } from '@angular/router';
import { Producto } from "../../models/producto";
import { ProductoService } from 'src/app/services/producto/producto.service';


interface Data  {
  id: number;
  nombre : string;
  cantidad: number;
  precio : number;
  activo : boolean;
}

@Component({
  selector: 'app-factura-create-edit',
  templateUrl: './factura-create-edit.component.html',
  styleUrls: ['./factura-create-edit.component.css']
})
export class FacturaCreateEditComponent implements OnInit {
  closeResult: string;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  cliente: Cliente;
  clientes: Cliente [] = [];
  data: Data [] = [];
  productos: Producto [] = [];


  constructor(
    private clienteService: ClienteService,
    private facturaService: FacturaService,
    private route: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getAll()
      .subscribe(clientes => this.clientes = clientes,error => console.error(error));
  }

}
