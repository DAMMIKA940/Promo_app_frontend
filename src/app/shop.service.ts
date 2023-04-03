import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http : HttpClient) { }

  getAllShops(){
    return this.http.get<any>('https://promoapp-prod.up.railway.app/shop/all')
  }

  shopDelete(id:any){
    return this.http.delete<any>(`https://promoapp-prod.up.railway.app/shop/delete/${id}`)
  }

  shopUpdate(id:any,shop:any){
    return this.http.put<any>(`https://promoapp-prod.up.railway.app/shop/update/${id}`,shop)
  }

}
