import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Cliente } from "../../models/cliente";
import { Observable, of } from "rxjs";
import { MessageService } from "../../services/message-service/message-service.service";
import { API_URL } from "../../config";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clienteUrl = API_URL + 'clientes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string){
    this.messageService.add(`ClienteService: ${message}`)
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  getAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.clienteUrl)
      .pipe(
        tap(_ => this.log('fetch cliente')),
        catchError(this.handleError<Cliente[]>('getCliente',[]))
      );
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.clienteUrl + `/${id}`)
      .pipe(
        tap(_ => this.log('fectch cliente')),
        catchError(this.handleError<Cliente>('getCliente',[]))
      );
  }

  add(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.clienteUrl,cliente,this.httpOptions)
      .pipe(
        tap((newCliente: Cliente) => this.log(`added cliente w/ id=${newCliente.id}`)),
        catchError(this.handleError<Cliente>('addCliente'))
      );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.clienteUrl,cliente,this.httpOptions)
      .pipe(
        tap((_: Cliente) => this.log(`updated cliente w/ id=${cliente.id}`)),
        catchError(this.handleError<Cliente>('addCliente'))
      );
  }

  delete(cliente: Cliente | number): Observable<Cliente> {
    const id = typeof cliente === 'number' ? cliente: cliente.id;
    const url = `${this.clienteUrl}/${id}`;

    return this.http.delete<Cliente>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted Cliente id=${id}`)),
        catchError(this.handleError<Cliente>('deleteCliente'))
      )
  }
}
