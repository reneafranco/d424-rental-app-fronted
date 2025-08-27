import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {authGuard} from "../../services/guard/auth.guard";
import {EquipmentListComponent} from "./pages/equipment-list/equipment-list.component";
import {MyEquipmentsComponent} from "./pages/my-equipments/my-equipments.component";
import {BorrowedEquipmentListComponent} from "./pages/borrowed-equipment-list/borrowed-equipment-list.component";
import {ReturnedEquipmentsComponent} from "./pages/returned-equipments/returned-equipments.component";
import {EquipmentDetailsComponent} from "./pages/equipment-details/equipment-details.component";
import {ManageEquipmentComponent} from "./pages/manage-equipment/manage-equipment.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: EquipmentListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-equipments',
        component: MyEquipmentsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-borrowed-equipments',
        component: BorrowedEquipmentListComponent,
        canActivate: [authGuard]
      },
      {
        path: 'my-returned-equipments',
        component: ReturnedEquipmentsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'details/:equipmentId',
        component: EquipmentDetailsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage',
        component: ManageEquipmentComponent,
        canActivate: [authGuard]
      },
      {
        path: 'manage/:equipmentId',
        component: ManageEquipmentComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule {
}
