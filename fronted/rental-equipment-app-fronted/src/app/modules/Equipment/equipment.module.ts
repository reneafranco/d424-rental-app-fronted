import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentRoutingModule } from "./equipment-routing.module";
import { FormsModule } from "@angular/forms";

import { MainComponent } from "./pages/main/main.component";
import { MenuComponent } from "./components/menu/menu.component";
import { EquipmentCardComponent } from "./components/equipment-card/equipment-card.component";
import { MyEquipmentsComponent } from "./pages/my-equipments/my-equipments.component";
import { ManageEquipmentComponent } from "./pages/manage-equipment/manage-equipment.component";
import { BorrowedEquipmentListComponent } from "./pages/borrowed-equipment-list/borrowed-equipment-list.component";
import { RatingComponent } from "./components/rating/rating.component";
import { ReturnedEquipmentsComponent } from "./pages/returned-equipments/returned-equipments.component";
import { EquipmentDetailsComponent } from "./pages/equipment-details/equipment-details.component";
import { EquipmentListComponent } from "./pages/equipment-list/equipment-list.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    FormsModule,
    MainComponent,
    MenuComponent,
    EquipmentListComponent,
    EquipmentCardComponent,
    MyEquipmentsComponent,
    ManageEquipmentComponent,
    BorrowedEquipmentListComponent,
    RatingComponent,
    ReturnedEquipmentsComponent,
    EquipmentDetailsComponent
  ]
})
export class EquipmentModule { }
