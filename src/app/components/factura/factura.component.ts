import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { Route } from '@angular/compiler/src/core';

interface Data  {
  id: number;
  numero_factura : string;
  id_cliente : number;
  nit : string;
  nombre_cliente : string;
  fecha : string;
  total : number;
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
  bandGuardo: boolean = false;

  data: Data [] = [];

  factura : Data = {
    id: null,
    numero_factura : null,
    id_cliente : null,
    nit : null,
    nombre_cliente : null,
    fecha : null,
    total : null
  }

  constructor(private modalService: NgbModal,
      private router : Router) { }

  ngOnInit() {
    this.data = [{
      id: 1,
      numero_factura : 'AS44',
      id_cliente : 1,
      nit : "523614711",
      nombre_cliente : 'JUAN PEREZ',
      fecha : '2019-09-19',
      total : 15477.36
    },
    {
      id: 2,
      numero_factura : 'AS4884',
      id_cliente : 1,
      nit : "523614711",
      nombre_cliente : 'JUAN PEREZ',
      fecha : '2019-09-19',
      total : 547.36
    },
    {
      id: 3,
      numero_factura : '9884ff',
      id_cliente : 2,
      nit : "5236147ss1",
      nombre_cliente : 'MARIO',
      fecha : '2019-01-19',
      total : 3650.36
    }]
  }

  crear(){
    this.router.navigate(['factura/crear'])
  }
}
