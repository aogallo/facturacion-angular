import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private modalService: NgbModal) { }



  ngOnInit() {
    this.data = [{
      id : 1,
      primer_nombre : "juan",
      primer_apellido: "omar",
      segundo_nombre : "perez",
      segundo_apellido : "guerra",
      activo : true,
      email : "agallo",
      telefono : "21"       
    },
    {
      id : 1,
      primer_nombre : "allan",
      primer_apellido: "omar",
      segundo_nombre : "gallo",
      segundo_apellido : "guerra",
      activo : true,
      email : "agallo",
      telefono : "21"       
    },
    {
      id : 1,
      primer_nombre : "allan",
      primer_apellido: "omar",
      segundo_nombre : "gallo",
      segundo_apellido : "guerra",
      activo : true,
      email : "agallo",
      telefono : "21"       
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

  editCiente(_cliente : Data, content: any){
    this.open(content);
    this.cliente = _cliente;
    console.log(_cliente);
  }

}
