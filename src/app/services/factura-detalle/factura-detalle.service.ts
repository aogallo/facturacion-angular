import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { FacturaDetalle } from "../../models/factura.detalle";
import { Observable, of } from "rxjs";
import { MessageService } from "../../services/message-service/message-service.service";
import { API_URL } from "../../config";

@Injectable({
  providedIn: 'root'
})
export class FacturaDetalleService {
  private url = API_URL + 'factura_detalle';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string){
    this.messageService.add(`FacturaDetalleService: ${message}`)
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
  getAll(): Observable<FacturaDetalle[]>{
    return this.http.get<FacturaDetalle[]>(this.url)
      .pipe(
        tap(_ => this.log('fetch cliente')),
        catchError(this.handleError<FacturaDetalle[]>('getCliente',[]))
      );
  }

  getById(id: number): Observable<FacturaDetalle> {
    return this.http.get<FacturaDetalle>(this.url + `/${id}`)
      .pipe(
        tap(_ => this.log('fectch cliente')),
        catchError(this.handleError<FacturaDetalle>('getCliente',[]))
      );
  }

  add(facturaDetalle: FacturaDetalle): Observable<FacturaDetalle> {
    return this.http.post<FacturaDetalle>(this.url,facturaDetalle,this.httpOptions)
      .pipe(
        tap((newCliente: FacturaDetalle) => this.log(`added cliente w/ id=${newCliente.id}`)),
        catchError(this.handleError<FacturaDetalle>('addFacturaDetalle'))
      );
  }

  update(facturaDetalle: FacturaDetalle): Observable<FacturaDetalle> {
    return this.http.post<FacturaDetalle>(this.url,facturaDetalle,this.httpOptions)
      .pipe(
        tap((_: FacturaDetalle) => this.log(`updated cliente w/ id=${facturaDetalle.id}`)),
        catchError(this.handleError<FacturaDetalle>('updateFacturaDetalle'))
      );
  }

  delete(facturaDetalle: FacturaDetalle | number): Observable<FacturaDetalle> {
    const id = typeof facturaDetalle === 'number' ? facturaDetalle: facturaDetalle.id;
    const url = `${this.url}/${id}`;

    return this.http.delete<FacturaDetalle>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted FacturaDetalle id=${id}`)),
        catchError(this.handleError<FacturaDetalle>('deleteFacturaDetalle'))
      )
  }

}
