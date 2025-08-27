import { Component } from '@angular/core';
import {
  PageResponseBorrowedEquipmentResponse
} from "../../../../services/models/page-response-borrowed-equipment-response";
import {BorrowedEquipmentResponse} from "../../../../services/models/borrowed-equipment-response";
import {EquipmentService} from "../../../../services/services/equipment.service";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {FeedbackRequest} from "../../../../services/models/feedback-request";
import {EquipmentResponse} from "../../../../services/models/equipment-response";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RatingComponent} from "../../components/rating/rating.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-borrowed-equipment-list',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    RatingComponent,
    RouterLink,
    NgForOf
  ],
  templateUrl: './borrowed-equipment-list.component.html',
  styleUrl: './borrowed-equipment-list.component.scss'
})
export class BorrowedEquipmentListComponent {

  page = 0;
  size = 5;
  pages: any = [];
  borrowedEquipments: PageResponseBorrowedEquipmentResponse = {};
  selectedEquipment: EquipmentResponse | undefined = undefined;
  feedbackRequest: FeedbackRequest = {equipmentId: 0, comment: '', note: 0};

  constructor(
    private equipmentService: EquipmentService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.findAllBorrowedEquipments();
  }

  private findAllBorrowedEquipments() {
    this.equipmentService.findAllBorrowedEquipments({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.borrowedEquipments = resp;
        this.pages = Array(this.borrowedEquipments.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedEquipments();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedEquipments();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedEquipments();
  }

  goToLastPage() {
    this.page = this.borrowedEquipments.totalPages as number - 1;
    this.findAllBorrowedEquipments();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedEquipments();
  }

  get isLastPage() {
    return this.page === this.borrowedEquipments.totalPages as number - 1;
  }

  returnBorrowedEquipment(equipment: BorrowedEquipmentResponse) {
    this.selectedEquipment = equipment;
    this.feedbackRequest.equipmentId = equipment.id as number;
  }

  returnEquipment(withFeedback: boolean) {
    this.equipmentService.returnBorrowEquipment({
      'equipment-id': this.selectedEquipment?.id as number
    }).subscribe({
      next: () => {
        if (withFeedback) {
          this.giveFeedback();
        }
        this.selectedEquipment = undefined;
        this.findAllBorrowedEquipments();
      }
    });
  }

  private giveFeedback() {
    this.feedbackService.saveFeedback({
      body: this.feedbackRequest
    }).subscribe({
      next: () => {}
    });
  }
}
