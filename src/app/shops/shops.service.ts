import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from './shops.model';
import { GeoLocationService } from '../core/geo-location.service';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL + 'user-operations/';

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

  // Subject listener for shop operations errors
  private shopErrorListener = new Subject<boolean>();

  // Shop update listener
  getPrefShopUpdateListener() {
    return this.prefShopsUpdated.asObservable();
  }

  // Shop update listener
  getShopUpdateListener() {
    return this.nearbyShopsUpdated.asObservable();
  }
  // Error listener
  getErrorListener() {
    return this.shopErrorListener.asObservable();
  }

  getShops() {
    // Nearby shops GET request
    const location = this.geoService.getLocation();
    this.http
      .get<{shops: any}>(BACKEND_URL + 'shops/' + location.lat + '/' + location.lng)
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
      },
      error => {
        // Error case
        this.shopErrorListener.next(true);
      }
    );
  }

  getPreferredShops() {
    // Preferred shops GET request
    this.http
      .get<{shops: any}>(BACKEND_URL + 'liked')
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
        this.prefShops = transformedShops;
        this.prefShopsUpdated.next([...this.prefShops]);
      },
      error => {
        // Error case
        this.shopErrorListener.next(true);
      }
    );
  }

  likeShop(shopId: string) {
    // Like shops POST request
    this.http.post(BACKEND_URL + 'like/' + shopId, null)
      .subscribe( (res) => {
        console.log(res);
        // Reloading shops after updating user preference
        this.getShops();
      },
      // Error display
      error => {
        this.shopErrorListener.next(true);
      }
    );
  }


  removeLikeShop(shopId: string) {
    // Remove preferred shops DELETE request
    this.http.delete(BACKEND_URL + 'like/' + shopId)
      .subscribe( (res) => {
        console.log(res);
        // Reloading shops after updating user preference
        this.getPreferredShops();
      },
      // Error display
      error => {
        this.shopErrorListener.next(true);
        }
    );
  }

  dislikeShop(shopId: string) {
    this.http.patch(BACKEND_URL + 'dislike/' + shopId, null)
      .subscribe( (res) => {
        console.log(res);
        // Reloading shop after updating user preference
        this.getShops();
      },
      // Error display
      error => {
        this.shopErrorListener.next(true);
      }
    );
  }

}
