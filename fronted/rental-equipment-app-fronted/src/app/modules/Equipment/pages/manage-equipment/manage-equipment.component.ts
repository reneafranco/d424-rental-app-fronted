import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {EquipmentRequest} from "../../../../services/models/equipment-request";
import {EquipmentService} from "../../../../services/services/equipment.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-manage-equipment',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './manage-equipment.component.html',
  styleUrl: './manage-equipment.component.scss'
})
export class ManageEquipmentComponent implements OnInit {
  errorMsg: Array<string> = [];
  equipmentRequest: EquipmentRequest = {
    title: '',
    isbn: '',
    synopsis: '',
    authorName: ''
  };
  selectedEquipmentPicture: any;
  selectedPicture: string | undefined;

  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const equipmentId = this.activatedRoute.snapshot.params['equipmentId'];
    if (equipmentId) {
      this.equipmentService.findEquipmentById({
        'equipment-id': equipmentId
      }).subscribe({
        next: (equipment) => {
          this.equipmentRequest = {
            id: equipment.id,
            title: equipment.title as string,
            authorName: equipment.authorName as string,
            isbn: equipment.isbn as string,
            synopsis: equipment.synopsis as string,
            shareable: equipment.shareable
          };
        }
      });
    }
  }

  saveEquipment() {
    this.equipmentService.saveEquipment({
      body: this.equipmentRequest
    }).subscribe({
      next: (equipmentId) => {
        this.equipmentService.uploadEquipmentCoverPicture({
          'equipment-id': equipmentId,
          body: {
            file: this.selectedEquipmentPicture
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/equipments/my-equipments']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error?.validationErrors ?? [];
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedEquipmentPicture = event.target.files[0];
    console.log(this.selectedEquipmentPicture);

    if (this.selectedEquipmentPicture) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedEquipmentPicture);
    }
  }
}
