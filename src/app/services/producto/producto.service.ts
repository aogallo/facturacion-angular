import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Producto } from "../../models/producto";
import { Observable, of } from "rxjs";
import { MessageService } from "../../services/message-service/message-service.service";
import { API_URL } from "../../config";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = API_URL + 'productoes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    private log(message: string){
      this.messageService.add(`HeroService: ${message}`)
    }
  
    private handleError<T> (operation = 'operation', result?: T){
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      }
    }

    getAll(): Observable<Producto[]>{
      return this.http.get<Producto[]>(this.url)
        .pipe(
          tap(_ => this.log('fetch Producto')),
          catchError(this.handleError<Producto[]>('getProducto',[]))
        );
    }

    getById(id: number): Observable<Producto>{
      return this.http.get<Producto>(this.url + `/${id}`)
        .pipe(
          tap(_ => this.log('fetch producto')),
          catchError(this.handleError<Producto>('getProducto',[]))
        );
    }
  
    add(cliente: Producto): Observable<Producto> {
      return this.http.post<Producto>(this.url,cliente,this.httpOptions)
        .pipe(
          tap((newCliente: Producto) => this.log(`added cliente w/ id=${newCliente.id}`)),
          catchError(this.handleError<Producto>('addCliente'))
        );
    }
  
    update(producto: Producto): Observable<Producto> {
      return this.http.put<Producto>(this.url,producto,this.httpOptions)
        .pipe(
          tap((_: Producto) => this.log(`updated Producto w/ id=${producto.id}`)),
          catchError(this.handleError<Producto>('addProducto'))
        );
    }
  
    delete(producto: Producto | number): Observable<Producto> {
      const id = typeof producto === 'number' ? producto: producto.id;
      const url = `${this.url}/${id}`;
  
      return this.http.delete<Producto>(url, this.httpOptions)
        .pipe(
          tap(_ => this.log(`deleted Producto id=${id}`)),
          catchError(this.handleError<Producto>('deleteCliente'))
        )
    }

}
