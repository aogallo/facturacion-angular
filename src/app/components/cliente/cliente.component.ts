import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClienteService } from "../../services/cliente/cliente.service";

interface Data  {
  id: Number;
  primer_nombre : string;
  primer_apellido: string;
  segundo_nombre : string;
  segundo_apellido : string;
  activo : boolean;
  email : string;
  telefono : string; 
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})


export class ClienteComponent implements OnInit {
  closeResult: string;
  faPlus = faPlus;
  faTrash =faTrash;
  faEdit = faEdit;

  data: Data [] = [];

  cliente : Data = {
    id : null,
    primer_nombre : null,
    primer_apellido: null,
    segundo_nombre : null,
    segundo_apellido : null,
    activo : null,
    email : null,
    telefono : null
  }

  constructor(
    private modalService: NgbModal,
    private clienteService: ClienteService) { }



  ngOnInit() {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getAll()
      .subscribe(clientes => {
        console.log(clientes);
        this.data = clientes
      });
  }

  open(content) {
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

  editCiente(_cliente : Data, content: any){
    this.open(content);
    this.cliente = _cliente;
    console.log(_cliente);
  }

}
