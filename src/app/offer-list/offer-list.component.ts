import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css'],
})
export class OfferListComponent implements OnInit {
  id: any;
  offer: any = {};
  availability: any = {};
  price: any = {};
  description: any = {};
  types: any = {};
  image: any = {};
  shops: any = {};
  editMode: boolean = false;
  offers: any = {};

  constructor(private offerService: OfferService, private router: Router) {}

  ngOnInit() {
    this.offerService.getOffers().subscribe((data: any) => {
      this.offers = data.data;
    });
  }

  //click editOffer button link editoffer
  editOffer(editOffer: any) {
    console.log('ofersss', editOffer);
    this.editMode = true;

    this.id = editOffer._id;
    this.offer = editOffer.offer;
    this.availability = editOffer.availability;
    this.price = editOffer.price;
    this.description = editOffer.description;
    this.types = editOffer.types;
    this.image = editOffer.image;
  }

  uploadImage(event: any) {
    this.image = <File>event.target.files[0];
  }

  udpateTask() {
    const fd = new FormData();
    fd.append('image', this.image as File);
    fd.append('offer', this.offer);
    fd.append('availability', this.availability);
    fd.append('price', this.price);
    fd.append('description', this.description);
    fd.append('types', this.types);
    console.log('dammika', this.offer);
    this.offerService.updateOffer(this.id, fd).subscribe((res) => {
      if (res) {
        alert('success');
        this.router.navigate(['/offerList']);
      } else {
        alert('error');
      }
    });
  }
  deleteTask(id: any) {
    this.offerService.deleteOffer(id).subscribe((res) => {
      if (res) {
        alert('success');
        window.location.reload();
      } else {
        alert('error');
      }
    });
  }
}
