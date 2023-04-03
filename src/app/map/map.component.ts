import { Component, OnInit } from '@angular/core';
import { AgmCoreModule, AgmMarker } from '@agm/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  selectedFile: File | null = null;
  lat :number = 7.448153415867239;
  lng :number = 80.72284109804686;
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
  
  constructor(private fb: FormBuilder,private http :HttpClient) {}

  ngOnInit(): void {
    //this.currentLocation();
  }
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

  uploadImage(event:any) : void {
    this.selectedFile = <File>event.target.files[0];
  
  }

 


  onSubmit() {
    const fd = new FormData();
    fd.append('image', this.selectedFile as File)
    fd.append('name', this.form.value.name);
    fd.append('category', this.form.value.category);
    fd.append('description', this.form.value.description);
    fd.append('location', this.userAddressFrom);
    fd.append('lat', this.userLatitude);
    fd.append('lng', this.userLongitude);
    fd.append('email', this.form.value.email);
    fd.append('phone', this.form.value.phone);
    this.http.post('https://promoapp-prod.up.railway.appp/shop/create', fd).subscribe((res) => {
     if(res){
       alert("successfully added");
     }

    else{
      alert("something went wrong");
    }
    }
    );

   
  }
}
