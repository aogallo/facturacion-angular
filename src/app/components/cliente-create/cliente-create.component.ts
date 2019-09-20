import { Component, OnInit } from '@angular/core';
import { ClienteService } from "../../services/cliente/cliente.service";
import { Router } from '@angular/router';
import { Cliente } from "../../models/cliente";

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  submitted = false;
  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit() {
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
    this.clienteService.add(this.cliente)
      .subscribe(data => console.log(data), error => console.log(error));
    this.cliente = new Cliente();
    this.gotoList();
  }

  gotoList(){
    this.router.navigate(['/cliente'])
  }
}
