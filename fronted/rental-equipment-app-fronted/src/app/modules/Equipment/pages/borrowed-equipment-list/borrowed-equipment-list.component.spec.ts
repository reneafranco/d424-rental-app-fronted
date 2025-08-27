import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedEquipmentListComponent } from './borrowed-equipment-list.component';

describe('BorrowedEquipmentListComponent', () => {
  let component: BorrowedEquipmentListComponent;
  let fixture: ComponentFixture<BorrowedEquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedEquipmentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowedEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
