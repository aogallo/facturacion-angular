import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Factura } from "../../models/factura";
import { Observable, of } from "rxjs";
import { MessageService } from "../../services/message-service/message-service.service";
import { API_URL } from "../../config";
import { FacturaDetalle } from "../../models/factura.detalle";
import { Cliente } from "../../models/cliente";
import { FacturaDetalleService } from '../factura-detalle/factura-detalle.service';
import { Producto } from "../../models/producto";
import { ClienteService } from '../cliente/cliente.service';

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
  fecha_factura : string;
  total_factura : number;
  numero_factura: string;
  reg_consola: string;
  reg_fecha: Date;
  reg_usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private url = API_URL + 'facturas';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  constructor(
    private http: HttpClient,
    private clienteService : ClienteService,
    private factura_deatalle : FacturaDetalleService,
    private messageService: MessageService) { }

    private log(message: string){
      this.messageService.add(`FacturasServices: ${message}`)
    }
  
    private handleError<T> (operation = 'operation', result?: T){
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      }
    }

  getAll(): Observable<Data[]>{
    return this.http.get<Data[]>(this.url)
      .pipe(
        tap(_ => this.log('fetch factura')),
        catchError(this.handleError<Data>('',[]))
      );
  }
  getById(id: number): Observable<Data> {
    return this.http.get<Factura>(this.url + `/${id}`)
      .pipe(
        tap(_ => this.log('fectch Factura')),
        catchError(this.handleError<Data>('getFactura',[]))
      );
  }

  add(factura: Factura): Observable<Factura> {
    console.log("desde el servicio",factura)

    return this.http.post<Factura>(this.url,factura,this.httpOptions)
      .pipe(
        tap((newFactura: Factura) => console.log("factura nueva",newFactura)),
        catchError(this.handleError<Factura>('addFactura'))
      );
  }

  update(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(this.url,factura,this.httpOptions)
      .pipe(
        tap((_: Factura) => this.log(`updated Factura w/ id=${factura.id}`)),
        catchError(this.handleError<Factura>('addFactura'))
      );
  }

  delete(factura: Factura | number): Observable<Factura> {
    const id = typeof factura === 'number' ? factura: factura.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<Factura>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted Factura id=${id}`)),
        catchError(this.handleError<Factura>('deleteFactura'))
      )
  }
}
