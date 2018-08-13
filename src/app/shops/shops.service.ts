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

  private shopsUpdated = new Subject<Shop[]>();

  constructor(private http: HttpClient, private geoService: GeoLocationService) {}

  // Nearby shops array
  private shops: Shop[] = [];
  // Preferred shop array
  private prefShops: Shop[] = [];

  getShops() {
    // Dummy fetch function for testing purposes only
    const location = this.geoService.getLocation();
    this.http
      .get<{shops: any}>('http://localhost:3000/api/user-operations/shops/' + location.lat + '/' + location.lng)
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
        this.shops = transformedShops;
        this.shopsUpdated.next([...this.shops]);
      });
  }

  likeShop(shopId: string) {
    this.http.post<{status: any}>('http://localhost:3000/api/user-operations/like/' + shopId, null)
      .subscribe( (res) => {
        console.log(res);
        // Reloading shops after updating user preference
        this.getShops();
      },
      // Error display
      error => console.log(error.error.message)
    );
  }

  // Shop update listener
  getShopUpdateListener() {
    return this.shopsUpdated.asObservable();
  }


  removeLikeShop(id: number) {
    // Dummy function

  }

  getPreferredShops() {
    // Dummy function

  }

}
