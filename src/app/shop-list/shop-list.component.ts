import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Offer } from '../offer';
import { OfferService } from '../offer.service';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  id: any;
  name :any = {};
  category :any = {};
  location :any = {};
  description :any = {};
  image :any = {};
  email :any = {};
  phone :any = {};
  lat :number = 7.448153415867239;
  lng :number = 80.72284109804686;
  
  editMode: boolean = false;
  offers: any = {};
 
  zoom = 8;
  userAddressFrom: string = '';
  userAddressTo: string = '';
  userLatitude: any = {};
  userLongitude: any = {};
  latitude: number = 7.448153415867239;
  longitude: number = 80.72284109804686;

  markerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  display?: google.maps.LatLngLiteral;

  constructor(private offerService :ShopService,private router :Router,private fb :FormBuilder) { }

  ngOnInit() {
    this.offerService.getAllShops().subscribe((data: any) => {

      this.offers = data.data;
    });
  }


  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    location: [''],
    lat: [ ''],
    lng: ['', ],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });

  From(address: any) {
    this.userAddressFrom = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
    this.latitude = this.userLatitude;
    this.longitude = this.userLongitude;
 
    this.markerPositions.push({
      lat: this.userLatitude,
      lng: this.userLongitude,
    });

    console.log(this.userAddressFrom);
    console.log(this.userLatitude, this.userLongitude);
  }

  //my current location
  currentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  showPosition(position: any) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.zoom = 12;
  }

//click editOffer button link editoffer
  editOffer(editOffer:any){
    console.log("ofersss",editOffer);
    this.editMode = true;

    this.id = editOffer._id;
    this.name = editOffer.name;
    this.category = editOffer.category;
    this.location = editOffer.location;
    this.description = editOffer.description;
    this.image = editOffer.image;
    this.email = editOffer.email;
    this.phone = editOffer.phone;
    this.lng = editOffer.lng;
    this.lat = editOffer.lat;
console.log("id",this.id);
  
   
  }

  uploadImage(event:any){
    this.image = <File>event.target.files[0];


  }




  onSubmit(){
    const fd = new FormData();
    fd.append('image', this.image as File);
    fd.append('name', this.name);
    fd.append('category', this.category);
    fd.append('location', this.userAddressFrom);
    fd.append('description', this.description);
    fd.append('email', this.email);
    fd.append('phone', this.phone);
    fd.append('lng', this.longitude.toString());
    fd.append('lat', this.latitude.toString());
console.log("fd",fd);
    this.offerService.shopUpdate(this.id,fd).subscribe((res) => {
      if(res){
        alert("success");
        // reload the page
        window.location.reload();
      }
      else{
        alert("error");
      }
    }
    );
  }
  deleteShop(id:any){
    this.offerService.shopDelete(id).subscribe((res) => {
      if(res){
        alert("success");
       // reload the page
       window.location.reload();

      }
      else{
        alert("error");
      }
    }
    );
  }
}
