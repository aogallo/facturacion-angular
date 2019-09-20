import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ClienteService } from "../../services/cliente/cliente.service";
import { Router } from '@angular/router';

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
    private clienteService: ClienteService,
    private router: Router) { }



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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  clienteDetails(){
    this.router.navigate(['cliente/create']);
  }

  navegar(action: string,id:number){
    switch (action){
      case 'create':
        break;
      case 'edit':
          this.router.navigate(['cliente/edit',id])
        break;
    }

  }
}
