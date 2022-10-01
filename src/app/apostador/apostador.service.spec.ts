/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { ApostadorService } from './apostador.service';

describe('Service: Apuesta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApostadorService]
    });
  });

  it('should ...', inject([ApostadorService], (service: ApostadorService) => {
    expect(service).toBeTruthy();
  }));
});
