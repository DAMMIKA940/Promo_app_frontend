import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { OfferComponent } from './offer/offer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { ShopDistanceComponent } from './shop-distance/shop-distance.component';
import { PromotionAddComponent } from './promotion-add/promotion-add.component';
import { AuthGuard } from './auth.guard';
import { ShopListComponent } from './shop-list/shop-list.component';


const routes: Routes = [
  { path: 'map', component: MapComponent , canActivate : [AuthGuard]},
  { path: 'offer', component: OfferComponent ,canActivate : [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate : [AuthGuard] },
  { path: 'offerList', component: OfferListComponent,canActivate : [AuthGuard] },
  { path: 'userList', component: UserListComponent,canActivate : [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'shopDistance', component: ShopDistanceComponent,canActivate : [AuthGuard] },
  {path:'promotionAdd',component:PromotionAddComponent ,canActivate : [AuthGuard]},
  {path:'shopList',component:ShopListComponent ,canActivate : [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {


 }
