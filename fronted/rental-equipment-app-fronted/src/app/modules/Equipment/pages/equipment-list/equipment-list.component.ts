import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PageResponseEquipmentResponse} from "../../../../services/models/page-response-equipment-response";
import {EquipmentService} from "../../../../services/services/equipment.service";
import {EquipmentResponse} from "../../../../services/models/equipment-response";
import {NgForOf, NgIf} from "@angular/common";
import {EquipmentCardComponent} from "../../components/equipment-card/equipment-card.component";

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [
    NgForOf,
    EquipmentCardComponent,
    NgIf
  ],
  templateUrl: './equipment-list.component.html',
  styleUrl: './equipment-list.component.scss'
})
export class EquipmentListComponent {
  equipmentResponse: PageResponseEquipmentResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  message = '';
  level: 'success' | 'error' = 'success';

  constructor(
    private equipmentService: EquipmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllEquipments();
  }

  private findAllEquipments() {
    this.equipmentService.findAllEquipments({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (equipments) => {
          this.equipmentResponse = equipments;
          this.pages = Array(this.equipmentResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllEquipments();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllEquipments();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllEquipments();
  }

  goToLastPage() {
    this.page = this.equipmentResponse.totalPages as number - 1;
    this.findAllEquipments();
  }

  goToNextPage() {
    this.page++;
    this.findAllEquipments();
  }

  get isLastPage() {
    return this.page === this.equipmentResponse.totalPages as number - 1;
  }

  borrowEquipment(equipment: EquipmentResponse) {
    this.message = '';
    this.level = 'success';
    this.equipmentService.borrowEquipment({
      'equipment-id': equipment.id as number
    }).subscribe({
      next: () => {
        this.level = 'success';
        this.message = 'Equipment successfully added to your list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }

  displayEquipmentDetails(equipment: EquipmentResponse) {
    this.router.navigate(['equipments', 'details', equipment.id]);
  }
}
