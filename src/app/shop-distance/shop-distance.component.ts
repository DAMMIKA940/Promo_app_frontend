import { MarkerManager } from '@agm/core';
import { Component } from '@angular/core';
import { Offer } from '../offer';
declare var google: any;

@Component({
  selector: 'app-shop-distance',
  templateUrl: './shop-distance.component.html',
  styleUrls: ['./shop-distance.component.css'],
})
export class ShopDistanceComponent {
  lat = 7.7749;
  lng = 80.4194;
  map: any;
  category = 'Select the category';

  constructor( ) {}


  offers: Offer[] = [
    {
      id: 1,
      name: 'Offer 1',
      category: 'Food',
      description: 'This is a description of offer 1',
      location: 'Colombo',
      lat: 6.9271,
      lng: 79.8612,
      image: 'https://icon-library.com/images/hotel-icon-map/hotel-icon-map-15.jpg',
      phone: '0771234567',
      email: 'a',
      promotion: [],
    },

  ];

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.lat, lng: this.lng },
      zoom: 8,
    });
    this.offers.forEach((offer) => {
      var marker = new google.maps.Marker({
        position: { lat: offer.lat, lng: offer.lng },
        map: this.map,
        title: offer.name,
      });

      marker.addListener('click', () => {
        let content = `<h3>${offer.category}</h3>`;
        let img = `<img src= ${offer.image} alt="hotel image" width="100" height="100">`;
        let location = `<p style="color:blue">${offer.location}</p>`;
        content += img;
        content += location;
        this.offers.forEach((offer) => {
          content += `<p>${offer.name}: ${offer.phone}</p>`;
        });
        let infoWindow = new google.maps.InfoWindow({
          content: content,
        });
        infoWindow.open(this.map, marker);
      });
    });

    this.getLocation();

  }

  getOffers() {
    //refresh the map
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.lat, lng: this.lng },
      zoom: 8,
    });

    console.log(this.category); // This is printing the correct value
    //show offers of the selected category in the map
    this.offers.forEach((offer) => {
      if (offer.category == this.category) {
        var marker = new google.maps.Marker({
          position: { lat: offer.lat, lng: offer.lng },
          map: this.map,
          title: offer.name,
        });

        marker.addListener('click', () => {
          let content = `<h3>${offer.category}</h3>`;
          let img = `<img src= ${offer.image} alt="hotel image" width="100" height="100">`;
          content += img;
          this.offers.forEach((offer) => {
            content += `<p>${offer.name}: ${offer.description}</p>`;
          });
          let infoWindow = new google.maps.InfoWindow({
            content: content,
          });
          infoWindow.open(this.map, marker);
        });
      }
      //if the category is not selected, show all offers in the map
      else if (this.category == 'All') {
        var marker = new google.maps.Marker({
          position: { lat: offer.lat, lng: offer.lng },
          map: this.map,
          title: offer.name,
        });

        marker.addListener('click', () => {
          let content = `<h3>${offer.category}</h3>`;
          let img = `<img src= ${offer.image} alt="hotel image" width="100" height="100">`;
          content += img;
          this.offers.forEach((offer) => {
            content += `<p>${offer.name}: ${offer.description}</p>`;
          });
          let infoWindow = new google.maps.InfoWindow({
            content: content,
          });
          infoWindow.open(this.map, marker);
        });
      }
    });
  }
  //get current location of the user and mark function

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        var marker = new google.maps.Marker({
          position: { lat: this.lat, lng: this.lng },
          map: this.map,
          title: 'You are here',
        });
      });
      this.setRoutePolyline();
    } else {
      alert('Geolocation is not supported by this browser.');
    }

  }

  //get setRoutePolyline and distance between current location and the offers
  setRoutePolyline() {
    this.offers.forEach((offer) => {
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(this.map);
      directionsService.route(
        {
          origin: { lat: this.lat, lng: this.lng },
          destination: { lat: offer.lat, lng: offer.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response :any, status:any) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }
      );
      //distance between current location and the offers
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [{ lat: this.lat, lng: this.lng }],
          destinations: [{ lat: offer.lat, lng: offer.lng }],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        },
        (response :any, status:any) => {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var duration = element.duration.text;
                var from = originList[i];
                var to = destinationList[j];
                //console.log(distance);
                //console.log(duration);
                //console.log(from);
                //console.log(to);

                //if < 100km show the offer send notification
                //remove km from the distance
                distance = distance.replace(' km', '');
              //send notification using one signal api
                
           
              
              
              
              }
            }
          }
        }
     
      


       


      );
    });
  }

 



}
