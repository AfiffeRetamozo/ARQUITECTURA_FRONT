/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostadorListComponent } from './apostador-list.component';

describe('ApostadorListComponent', () => {
  let component: ApostadorListComponent;
  let fixture: ComponentFixture<ApostadorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApostadorListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApostadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
