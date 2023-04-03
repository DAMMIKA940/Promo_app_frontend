import { MarkerManager } from '@agm/core';
import { Component } from '@angular/core';
import { Offer } from '../offer';
import { Promotion } from '../promotion';

import { PromotionService } from '../promotion.service';
import { ShopService } from '../shop.service';
declare var google: any;

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent {
  lat = 7.7749;
  lng = 80.4194;
  map: any;
  constructor(private shop: ShopService,private promo :PromotionService) {}
  offers: Offer[] = [];
  promotions: Promotion[] = [];

  ngOnInit() {
    this.shop.getAllShops().subscribe((data: any) => {
      this.offers = data.data;
    console.log(this.offers);
     
    });


  }
  // show promotion details in map and image
 
    
 


 
}
