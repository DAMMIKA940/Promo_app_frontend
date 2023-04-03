import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http : HttpClient) { }

  getpromoByID(id : number){
    return this.http.get<any>('https://promoapp-prod.up.railway.app/promotions/getOne/'+id)
  }
}
