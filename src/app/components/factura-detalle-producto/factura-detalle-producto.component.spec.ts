import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDetalleProductoComponent } from './factura-detalle-producto.component';

describe('FacturaDetalleProductoComponent', () => {
  let component: FacturaDetalleProductoComponent;
  let fixture: ComponentFixture<FacturaDetalleProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaDetalleProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaDetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
