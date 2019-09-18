import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  data: Data [] = [];
  
  producto: Data = {
    id: null,
    nombre : null,
    cantidad: null,
    precio : null,
    activo : null
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
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

  edit(_producto : Data, content: any){
    this.open(content);
    this.producto = _producto;
    console.log(_producto);
  }  

}
