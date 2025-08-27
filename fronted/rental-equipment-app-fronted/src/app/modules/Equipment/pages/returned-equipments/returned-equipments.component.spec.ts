import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedEquipmentsComponent } from './returned-equipments.component';

describe('ReturnedEquipmentsComponent', () => {
  let component: ReturnedEquipmentsComponent;
  let fixture: ComponentFixture<ReturnedEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnedEquipmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnedEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
