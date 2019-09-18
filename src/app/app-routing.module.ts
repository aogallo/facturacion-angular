import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FacturaComponent } from './components/factura/factura.component';
import { FacturaDetalleComponent } from './components/factura-detalle/factura-detalle.component';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FacturaCreateEditComponent } from "./components/factura-create-edit/factura-create-edit.component";

const routes: Routes = [
  { path: 'cliente', component: ClienteComponent },
  { path: 'factura', component: FacturaComponent },
  { path: 'factura/factura_detalle', component: FacturaDetalleComponent },
  { path: 'factura-c', component: FacturaCreateEditComponent },
  { path: 'producto', component: ProductoComponent },
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: '/home', component: HomeComponent },
  { path: '*', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }