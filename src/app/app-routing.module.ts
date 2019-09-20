import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { FacturaComponent } from './components/factura/factura.component';
import { FacturaDetalleComponent } from './components/factura-detalle/factura-detalle.component';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FacturaCreateEditComponent } from "./components/factura-create-edit/factura-create-edit.component";
import { ClienteCreateComponent } from "./components/cliente-create/cliente-create.component";
import { ClienteEditComponent } from "./components/cliente-edit/cliente-edit.component";
import { ProductoCreateComponent } from "./components/producto-create/producto-create.component";
import { ProductoEditComponent } from "./components/producto-edit/producto-edit.component";

const routes: Routes = [
  { path: 'cliente', component: ClienteComponent },
  { path: 'cliente/create', component: ClienteCreateComponent },
  { path: 'cliente/edit/:id', component: ClienteEditComponent },
  { path: 'factura', component: FacturaComponent },
  { path: 'factura/factura_detalle/:id/:total', component: FacturaDetalleComponent },
  { path: 'factura/crear', component: FacturaCreateEditComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'producto/create', component: ProductoCreateComponent },
  { path: 'producto/edit/:id', component: ProductoEditComponent },
  { path: '', component: HomeComponent },
  // { path: '', redirectTo: '/home', component: HomeComponent },
  { path: '*', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }