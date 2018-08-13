import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Shop } from '../shops.model';
import { ShopsService } from '../shops.service';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit, OnDestroy {
  // Shop array to display
  shops: Shop[];
  // Pagination index
  p = 1;

  constructor(private shopService: ShopsService) { }

  private shopsSub: Subscription;

  ngOnInit() {
    this.shopService.getShops();
    this.shopsSub = this.shopService.getShopUpdateListener()
      .subscribe((shops: Shop[]) => {
        this.shops = shops;
        console.log(this.shops);
      });
  }

  ngOnDestroy() {
    this.shopsSub.unsubscribe();
  }

  likeShop(id: string) {
    // Like shop function
    this.shopService.likeShop(id);
  }
  // Placeholder Function
  dislikeShop(id: string) {
    // Dislike shop function
    this.shopService.dislikeShop(id);
  }
}
