import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from "../../models/cliente";
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { FacturaService } from 'src/app/services/factura/factura.service';
import { Factura } from "../../models/factura";
import { Router } from '@angular/router';
import { Producto } from "../../models/producto";
import { ProductoService } from 'src/app/services/producto/producto.service';
import { min } from 'rxjs/operators';


interface Data  {
  id: number;
  fecha_factura: string;
  numero_factura : string;
  id_cliente : number;
  nit : string;
  nombre_cliente : string;
  fecha : string;
  total : number;
  pedidos: Producto [] ;
}

@Component({
  selector: 'app-factura-create-edit',
  templateUrl: './factura-create-edit.component.html',
  styleUrls: ['./factura-create-edit.component.css']
})
export class FacturaCreateEditComponent implements OnInit {
  closeResult: string;
  submitted: boolean;
  faPlus = faPlus;
  faTrash = faTrash;
  mensaje: string = "";
  faEdit = faEdit;
  hideAlert: boolean = false;
  isError: boolean = false;
  isAdd: boolean = false;
  totalFactura = 0.00;
  cantidad: number = 0;
  cliente: Cliente;
  clientes: Cliente [] = [];
  data: Data;
  productos: Producto [] = [];
  productoPedido: Producto [] = [];
  producto: Producto = new Producto();

  constructor(
    private clienteService: ClienteService,
    private facturaService: FacturaService,
    private route: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
    this.getClientes();
    this.getProductos();
    this.producto.id = 0;
    this.data = {
      id: null,
      numero_factura : null,
      fecha_factura : null,
      id_cliente : 0,
      nit : null,
      nombre_cliente : null,
      fecha : null,
      total : 0.00,
      pedidos: []      
    }
  }

  getClientes(){
    this.clienteService.getAll()
      .subscribe(clientes => this.clientes = clientes,error => console.error(error));
  }

  updateProductoArrary(prod){
    this.producto = prod;
    this.isAdd = !this.isAdd;
  }

  getProductos(){
    this.productoService.getAll()
      .subscribe(productos => {
        this.productos = productos
      }, error => console.error(error));
  }

  cancelarFactura(){
    this.gotoList();
  }

  gotoList(){
    this.route.navigate(['factura'])    
  }

  cancelarProducto(){
    this.isAdd = false;
    this.producto = new Producto();
    this.hideAlert = false;
    this.isError = false;
    this.mensaje = "";
  }

  changeSelect(id){
    console.log('click select option')
  }

  prueba(){
    console.log(this.data)
  }

  agregarProducto(producto: Producto){
    
    if (producto.cantidad > this.cantidad){
      this.hideAlert = true;
      this.isError = true;
      this.mensaje = "La cantidad del que esta ingresando excede la del inventario.";
    }else{
      let buscar = this.productoPedido.indexOf(producto);
      console.log(buscar);
      if (buscar >= 0){
        let index = 0;
        this.productoPedido.map(item =>{
          if (item.id == producto.id){
            this.productoPedido[index] = producto;
          }
          index++;
        })
      }else{
        this.productoPedido.push(producto)
      }
      this.isAdd = false;
      this.producto = new Producto();
      this.calcularTotalFactura();
    }
  }

  calcularTotalFactura(){
    this.data.total = 0.00;
    this.productoPedido.map(item => {
      if(item.cantidad > 0 && item.precio > 0){
        this.data.total += (item.cantidad * item.precio);  
      }
    })
  }

  deleteProductoArray(i){
    this.productoPedido.splice(i,1);
    this.calcularTotalFactura();
  }

  changeSelectProducto(value: any){
    console.log(value)
    this.productoService.getById(value)
      .subscribe(producto => {
        this.cantidad = producto.cantidad;
        this.producto = producto;
      }, error => console.log(error));
  }
  
  onSubmit() {
    //this.submitted = true;
    this.save();    
  }

  save() {
    this.data.pedidos = this.productoPedido;
    this.facturaService.add(this.data)
    .subscribe(data => console.log("prueba save",data), error => console.log(error));
    this.gotoList();
  }
}
