import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from './shops.model';
import { GeoLocationService } from '../core/geo-location.service';



@Injectable({
  providedIn: 'root'
})

export class ShopsService {

  private nearbyShopsUpdated = new Subject<Shop[]>();
  private prefShopsUpdated = new Subject<Shop[]>();

  constructor(private http: HttpClient, private geoService: GeoLocationService) {}

  // Nearby shops array
  private shops: Shop[] = [];
  // Preferred shop array
  private prefShops: Shop[] = [];

  // Shop update listener
  getPrefShopUpdateListener() {
    return this.prefShopsUpdated.asObservable();
  }

  // Shop update listener
  getShopUpdateListener() {
    return this.nearbyShopsUpdated.asObservable();
  }

  getShops() {
    // Nearby shops GET request
    const location = this.geoService.getLocation();
    this.http
      .get<{shops: any}>('http://localhost:3000/api/user-operations/shops/' + location.lat + '/' + location.lng)
      .pipe(
        map(shopData => {
          return shopData.shops.map(shop => {
            return {
              shopId: shop._id,
              shopName: shop.name,
              shopImagePath: shop.picture,
              // Default button display value
              isOperational: true
            };
          });
        })
      )
      .subscribe(transformedShops => {
        this.shops = transformedShops;
        this.nearbyShopsUpdated.next([...this.shops]);
      });
  }

  getPreferredShops() {
    // Preferred shops GET request
    this.http
      .get<{shops: any}>('http://localhost:3000/api/user-operations/liked/')
      .pipe(
        map(shopData => {
          return shopData.shops.map(shop => {
            return {
              shopId: shop._id,
              shopName: shop.name,
              shopImagePath: shop.picture
            };
          });
        })
      )
      .subscribe(transformedShops => {
        this.prefShops = transformedShops;
        this.prefShopsUpdated.next([...this.prefShops]);
      });
  }

  likeShop(shopId: string) {
    // Like shops POST request
    this.http.post('http://localhost:3000/api/user-operations/like/' + shopId, null)
      .subscribe( (res) => {
        console.log(res);
        // Reloading shops after updating user preference
        this.getShops();
      },
      // Error display
      error => console.log(error.error.message)
    );
  }


  removeLikeShop(shopId: string) {
    // Remove preferred shops DELETE request
    this.http.delete('http://localhost:3000/api/user-operations/like/' + shopId)
      .subscribe( (res) => {
        console.log(res);
        // Reloading shops after updating user preference
        this.getPreferredShops();
      },
      // Error display
      error => console.log(error.error.message)
    );
  }

  dislikeShop(shopId: string) {
    this.http.patch('http://localhost:3000/api/user-operations/dislike/' + shopId, null)
      .subscribe( (res) => {
        console.log(res);
        // Reloading shop after updating user preference
        this.getShops();
      },
      // Error display
      error => console.log(error.error.message)
    );
  }

}
