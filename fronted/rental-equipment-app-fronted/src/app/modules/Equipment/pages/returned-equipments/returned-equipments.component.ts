import { Component, OnInit } from '@angular/core';
import {BorrowedEquipmentResponse} from "../../../../services/models/borrowed-equipment-response";
import {EquipmentService} from "../../../../services/services/equipment.service";
import {
  PageResponseBorrowedEquipmentResponse
} from "../../../../services/models/page-response-borrowed-equipment-response";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-returned-equipments',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './returned-equipments.component.html',
  styleUrl: './returned-equipments.component.scss'
})
export class ReturnedEquipmentsComponent implements OnInit {
  page = 0;
  size = 5;
  pages: any = [];
  returnedEquipments: PageResponseBorrowedEquipmentResponse = {};
  message = '';
  level: 'success' | 'error' = 'success';

  constructor(
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.findAllReturnedEquipments();
  }

  private findAllReturnedEquipments() {
    this.equipmentService.findAllReturnedEquipments({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedEquipments = resp;
        this.pages = Array(this.returnedEquipments.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllReturnedEquipments();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedEquipments();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedEquipments();
  }

  goToLastPage() {
    this.page = this.returnedEquipments.totalPages as number - 1;
    this.findAllReturnedEquipments();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedEquipments();
  }

  get isLastPage() {
    return this.page === this.returnedEquipments.totalPages as number - 1;
  }

  approveEquipmentReturn(equipment: BorrowedEquipmentResponse) {
    if (!equipment.returned) {
      return;
    }
    this.equipmentService.approveReturnBorrowEquipment({
      'equipment-id': equipment.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Equipment return approved';
        this.findAllReturnedEquipments();
      }
    });
  }
}
