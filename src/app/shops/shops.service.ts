import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from './shops.model';



@Injectable({
  providedIn: 'root'
})

export class ShopsService {

  private shopsUpdated = new Subject<Shop[]>();

  constructor(private http: HttpClient) {}

  // Nearby shops array
  private shops: Shop[] = [];
  // Preferred shop array
  private prefShops: Shop[] = [];

  getShops() {
    // Dummy fetch function for testing purposes only
    this.http
      .get<{shops: any}>('http://localhost:3000/api/user-operations/shops')
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
      .subscribe( res => {
        console.log(res);
        let likedShop: Shop;
        likedShop = this.shops.find(x => x.shopId.toString() === shopId);
        this.shops.splice( this.shops.indexOf(likedShop), 1);
      });
  }

  // Shop update listener
  getShopUpdateListener() {
    return this.shopsUpdated.asObservable();
  }

  // Dummy local function
  removeLikeShop(id: number) {
    let removedLikedShop: Shop;
    removedLikedShop = this.prefShops.find(x => x.shopId === id);
    this.shops.push(removedLikedShop);
    this.prefShops.splice( this.prefShops.indexOf(removedLikedShop), 1);
  }

  getPreferredShops() {
    // Dummy function
    return this.prefShops.slice();
  }

}
