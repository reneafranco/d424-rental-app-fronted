import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RatingComponent} from "../rating/rating.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {EquipmentResponse} from "../../../../services/models/equipment-response";

@Component({
  selector: 'app-equipment-card',
  standalone: true,
  imports: [
    RatingComponent,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './equipment-card.component.html',
  styleUrl: './equipment-card.component.scss'
})
export class EquipmentCardComponent {

  private _equipment: EquipmentResponse = {};
  private _manage = false;
  private _equipmentCover: string | undefined;

  get equipmentCover(): string | undefined {
    if (this._equipment.cover) {
      return 'data:image/jpg;base64,' + this._equipment.cover
    }
    return 'https://source.unsplash.com/user/c_v_r/1900x800';
  }

  get equipment(): EquipmentResponse {
    return this._equipment;
  }

  @Input()
  set equipment(value: EquipmentResponse) {
    this._equipment = value;
  }


  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  @Output() private share: EventEmitter<EquipmentResponse> = new EventEmitter<EquipmentResponse>();
  @Output() private archive: EventEmitter<EquipmentResponse> = new EventEmitter<EquipmentResponse>();
  @Output() private addToWaitingList: EventEmitter<EquipmentResponse> = new EventEmitter<EquipmentResponse>();
  @Output() private borrow: EventEmitter<EquipmentResponse> = new EventEmitter<EquipmentResponse>();
  @Output() private edit: EventEmitter<EquipmentResponse> = new EventEmitter<EquipmentResponse>();
  @Output() private details: EventEmitter<EquipmentResponse> = new EventEmitter<EquipmentResponse>();

  onShare() {
    this.share.emit(this._equipment);
  }

  onArchive() {
    this.archive.emit(this._equipment);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._equipment);
  }

  onBorrow() {
    this.borrow.emit(this._equipment);
  }

  onEdit() {
    this.edit.emit(this._equipment);
  }

  onShowDetails() {
    this.details.emit(this._equipment);
  }
}
