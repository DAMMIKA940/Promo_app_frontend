import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http :HttpClient) { }


  getOffers(){
    return this.http.get<any>('https://promoapp-prod.up.railway.app/promotions/getAll')
  }


  updateOffer(id: any,updatedoffer: any) {
    return this.http.put('https://promoapp-prod.up.railway.app/promotions/update/'+id, updatedoffer);
  }

  deleteOffer(id: any) {
    return this.http.delete('https://promoapp-prod.up.railway.app/promotions/delete/'+id);
  }
}
