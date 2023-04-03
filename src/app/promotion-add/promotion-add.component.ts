import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-promotion-add',
  templateUrl: './promotion-add.component.html',
  styleUrls: ['./promotion-add.component.css'],
})
export class PromotionAddComponent implements OnInit {
  constructor(private shopService: ShopService, private fb: FormBuilder,private http :HttpClient) {}
  shops: any = {};
  id : any;
  selectedFile: File | null = null;
  ngOnInit(): void {
    this.shopService.getAllShops().subscribe((data: any) => {
      this.shops = data.data;
    });
  }

  form: FormGroup = this.fb.group({
    _id: ['', Validators.required],
    offer: ['', Validators.required],
    availability: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    types: ['', Validators.required],
  });

  uploadImage(event:any) : void {
    this.selectedFile = <File>event.target.files[0];
  
  }

  

  onSubmit( ) {
    const fd = new FormData();
    fd.append('image', this.selectedFile as File)
    fd.append('offer', this.form.value.offer)
    fd.append('availability', this.form.value.availability)
    fd.append('price', this.form.value.price)
    fd.append('description', this.form.value.description)
    fd.append('types', this.form.value.types)
   
    console.log("dammika",this.form.value);


    this.http.post(`https://promoapp-prod.up.railway.app/promotions/add/${this.form.value._id}`, fd).subscribe((res) => {
     if(res){
      alert("success");
     }
     else{
      alert("error");
     }
    }
    );

   
  }

}
