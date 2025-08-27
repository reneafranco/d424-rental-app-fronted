import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipmentComponent } from './manage-equipment.component';

describe('ManageEquipmentComponent', () => {
  let component: ManageEquipmentComponent;
  let fixture: ComponentFixture<ManageEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEquipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
