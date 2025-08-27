import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {EquipmentResponse} from "../../../../services/models/equipment-response";
import {EquipmentService} from "../../../../services/services/equipment.service";
import {PageResponseEquipmentResponse} from "../../../../services/models/page-response-equipment-response";
import {EquipmentCardComponent} from "../../components/equipment-card/equipment-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-my-equipments',
  standalone: true,
  imports: [
    EquipmentCardComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './my-equipments.component.html',
  styleUrl: './my-equipments.component.scss'
})
export class MyEquipmentsComponent implements OnInit {
  equipmentResponse: PageResponseEquipmentResponse = {};
  page = 0;
  size = 5;
  pages: any = [];

  constructor(
    private equipmentService: EquipmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAllEquipments();
  }

  private findAllEquipments() {
    this.equipmentService.findAllEquipmentsByOwner({
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

  archiveEquipment(equipment: EquipmentResponse) {
    this.equipmentService.updateArchivedStatus({
      'equipment-id': equipment.id as number
    }).subscribe({
      next: () => {
        equipment.archived = !equipment.archived;
      }
    });
  }

  shareEquipment(equipment: EquipmentResponse) {
    this.equipmentService.updateShareableStatus({
      'equipment-id': equipment.id as number
    }).subscribe({
      next: () => {
        equipment.shareable = !equipment.shareable;
      }
    });
  }

  editEquipment(equipment: EquipmentResponse) {
    this.router.navigate(['equipments', 'manage', equipment.id]);
  }
}
