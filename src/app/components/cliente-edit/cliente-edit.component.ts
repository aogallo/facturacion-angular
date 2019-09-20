import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../../services/cliente/cliente.service";
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from "../../models/cliente";

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {
  submitted = false;
  cliente: Cliente = new Cliente();
  id: number;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.cliente = new Cliente();

    this.id = this.route.snapshot.params['id'];

    this.clienteService.getById(this.id)
      .subscribe(data => this.cliente = data, error=> console.error(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  newCliente(): void {
    this.submitted = false;
    this.cliente = new Cliente();
  }

  save() {
    this.clienteService.update(this.cliente)
      .subscribe(data => console.log(data), error => console.log(error));
    this.cliente = new Cliente();
    this.gotoList();
  }

  gotoList(){
    this.router.navigate(['/cliente'])
  }

}
