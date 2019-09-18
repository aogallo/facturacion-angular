import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private modalService: NgbModal) { }

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

  open(content) {
    console.log(content);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  edit(_factura : Data, content: any){
    this.open(content);
    this.factura = _factura;
    console.log(_factura);
  }

  save(_factura){
    this.bandGuardo = !this.bandGuardo;
    this.getDismissReason('ESC');
  }
}
