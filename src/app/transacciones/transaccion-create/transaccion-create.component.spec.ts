import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionCreateComponent } from './transaccion-create.component';

describe('TransaccionCreateComponent', () => {
  let component: TransaccionCreateComponent;
  let fixture: ComponentFixture<TransaccionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
