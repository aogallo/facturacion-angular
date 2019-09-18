import { TestBed } from '@angular/core/testing';

import { FacturaDetalleService } from './factura-detalle.service';

describe('FacturaDetalleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacturaDetalleService = TestBed.get(FacturaDetalleService);
    expect(service).toBeTruthy();
  });
});
