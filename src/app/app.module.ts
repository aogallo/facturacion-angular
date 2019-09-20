import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatButtonModule} from '@angular/material/button';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FacturaComponent } from './components/factura/factura.component';
import { FacturaDetalleComponent } from './components/factura-detalle/factura-detalle.component';
import { ProductoComponent } from './components/producto/producto.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FacturaCreateEditComponent } from './components/factura-create-edit/factura-create-edit.component';
import { ClienteCreateComponent } from './components/cliente-create/cliente-create.component';
import { ProductoCreateComponent } from './components/producto-create/producto-create.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';
import { ClienteEditComponent } from './components/cliente-edit/cliente-edit.component';
import { FacturaDetalleProductoComponent } from './components/factura-detalle-producto/factura-detalle-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    FacturaComponent,
    FacturaDetalleComponent,
    ProductoComponent,
    HomeComponent,
    FacturaCreateEditComponent,
    ClienteCreateComponent,
    ProductoCreateComponent,
    ProductoEditComponent,
    ClienteEditComponent,
    FacturaDetalleProductoComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // MatDialogModule,
    // MatButtonModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
