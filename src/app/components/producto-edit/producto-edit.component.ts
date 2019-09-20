import { Component, OnInit } from '@angular/core';
import { ProductoService } from "../../services/producto/producto.service";
import { Producto } from '../../models/producto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  id: number;
  submitted = false;
  producto: Producto = new Producto();

  constructor(private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.producto = new Producto();

    this.productoService.getById(this.id)
      .subscribe(data => console.log(data), error => console.log(error));

  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  newCliente(): void {
    this.submitted = false;
    this.producto = new Producto();
  }

  save() {
    this.productoService.update(this.producto)
      .subscribe(data => console.log(data), error => console.log(error));
    this.producto = new Producto();
    this.gotoList();
  }

  gotoList(){
    this.router.navigate(['/producto'])
  }  
}
