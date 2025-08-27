import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PageResponseFeedbackResponse} from "../../../../services/models/page-response-feedback-response";
import {EquipmentResponse} from "../../../../services/models/equipment-response";
import {EquipmentService} from "../../../../services/services/equipment.service";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {RatingComponent} from "../../components/rating/rating.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-equipment-details',
  standalone: true,
  imports: [
    RatingComponent,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './equipment-details.component.html',
  styleUrl: './equipment-details.component.scss'
})
export class EquipmentDetailsComponent implements OnInit {

  equipment: EquipmentResponse = {};
  feedbacks: PageResponseFeedbackResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  private equipmentId = 0;

  constructor(
    private equipmentService: EquipmentService,
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.equipmentId = this.activatedRoute.snapshot.params['equipmentId'];
    if (this.equipmentId) {
      this.equipmentService.findEquipmentById({
        'equipment-id': this.equipmentId
      }).subscribe({
        next: (equipment) => {
          this.equipment = equipment;
          this.findAllFeedbacks();
        }
      });
    }
  }

  private findAllFeedbacks() {
    this.feedbackService.findAllFeedbacksByEquipment({
      'equipment-id': this.equipmentId,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.feedbacks = data;
      }
    });
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFeedbacks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.feedbacks.totalPages as number - 1;
    this.findAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.findAllFeedbacks();
  }

  get isLastPage() {
    return this.page === this.feedbacks.totalPages as number - 1;
  }

}
