import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cliente } from "../../models/cliente";
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { FacturaService } from 'src/app/services/factura/factura.service';
import { Factura } from "../../models/factura";
import { Router,ActivatedRoute } from '@angular/router';
import { Producto } from "../../models/producto";
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FacturaDetalle } from "../../models/factura.detalle";

interface FacturaProducto {
  id : number;
  id_factura : number;
  id_producto : number;
  cantidad : number;
  precio_unitario : number;
  reg_usuario : string;
  reg_consola : string;
  reg_fecha : Date;
  producto: Producto;  
}
interface Data  {
  id: number;
  id_cliente: number;
  cliente: Cliente;
  factura_detalle: FacturaProducto [];
  fecha_factura: string;
  total_factura : number;
  numero_factura: string;
  reg_consola: string;
  reg_fecha: Date;
  reg_usuario: string;
}

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.component.html',
  styleUrls: ['./factura-detalle.component.css']
})
export class FacturaDetalleComponent implements OnInit {
  closeResult: string;
  faPlus = faPlus;
  faTrash = faTrash;
  mensaje: string = "";
  faEdit = faEdit;
  hideAlert: boolean = false;
  isError: boolean = false;
  isAdd: boolean = false;
  totalFactura = 0.00;
  submitted = false;
  factura: Factura = new Factura();
  data : Data;
  id: number;
  cantidad: number = 0;
  cliente: Cliente;
  clientes: Cliente [] = [];
  productos: Producto [] = [];
  productoPedido: Producto [] = [];
  producto: Producto = new Producto();  

  constructor(private facturaService: FacturaService,
    private route: ActivatedRoute,
    private productoService : ProductoService,
    private clienteService : ClienteService,
    private router: Router) { }

  ngOnInit() {
    this.getClientes();
    this.getProductos();

    this.data = {
      id: 0,
      id_cliente: 0,
      cliente: null,
      factura_detalle:  [],
      fecha_factura: null,
      total_factura : 0,
      numero_factura : "",
      reg_consola: "",
      reg_fecha: null,
      reg_usuario: ""      
    }

    this.id = this.route.snapshot.params['id'];
    this.totalFactura = this.route.snapshot.params['total']

    this.facturaService.getById(this.id)
    .subscribe(dt => {
      this.data = dt;
      this.data.fecha_factura = this.data.fecha_factura = this.data.fecha_factura.substring(0,this.data.fecha_factura.indexOf('T'));
      this.cliente = this.data.cliente;
      this.data.factura_detalle.map(detalle => {

        this.producto.id = detalle.id_producto;
        this.producto.cantidad = detalle.cantidad;
        this.producto.precio = detalle.precio_unitario;

        this.productoPedido.push(this.producto);

        this.producto = new Producto();
      })
      console.log("respuesta del servidor", this.data)

    }, error => console.log(error));

  }

  getProductos(){
    this.productoService.getAll()
      .subscribe(productos => {
        this.productos = productos
      }, error => console.error(error));
  }  

  getClientes(){
    this.clienteService.getAll()
      .subscribe(clientes => this.clientes = clientes,error => console.error(error));
  }  

  cancelarFactura(){
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  newCliente(): void {
    this.submitted = false;
    this.factura = new Factura();
  }

  save() {
    this.facturaService.add(this.factura)
      .subscribe(data => console.log(data), error => console.log(error));
    this.factura = new Factura();
    this.gotoList();
  }

  gotoList(){
    this.router.navigate(['/factura'])
  }
}
