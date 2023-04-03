import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmMap } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule,AgmMarker } from '@agm/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OfferComponent } from './offer/offer.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { ShopDistanceComponent } from './shop-distance/shop-distance.component';
import { PromotionAddComponent } from './promotion-add/promotion-add.component';
import { UserService } from './user.service';
import { ShopListComponent } from './shop-list/shop-list.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    OfferComponent,
    DashboardComponent,
    OfferListComponent,
    UserListComponent,
    LoginComponent,
    ShopDistanceComponent,
    PromotionAddComponent,
    ShopListComponent
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiOuKxmO0fR-azjwFPGiff04CtB15WIWQ',
      libraries: ["places",'drawing','geometry','visualization','places','directions','distance_matrix','elevation']
    }),
    GooglePlaceModule

  ],
  entryComponents: [
    AgmMap,
    AgmMarker
   
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
