import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {authGuard} from "./services/guard/auth.guard";
import {EquipmentRoutingModule} from "./modules/Equipment/equipment-routing.module";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,

  },{
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  }, {
    path: 'equipments',
    loadChildren: () => import('./modules/Equipment/equipment.module').then(m => m.EquipmentModule),
    canActivate: [authGuard]
  }
];
