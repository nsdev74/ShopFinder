import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Shop } from '../shops.model';
import { ShopsService } from '../shops.service';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {
  // Shop array to display
  shops: Shop[];

  constructor(private shopService: ShopsService) { }

  private shopsSub: Subscription;

  ngOnInit() {
    this.shopService.getShops();
    this.shopsSub = this.shopService.getShopUpdateListener()
      .subscribe((shops: Shop[]) => {
        this.shops = shops;
      });
  }

  likeShop(id: number) {
    // Dummy data
    this.shopService.likeShop(id);
    this.reload();
  }
  // Placeholder Function
  dislikeShop(id: number) {

  }
  // Shop fetching function
  reload() {
    this.shopService.getShops();
  }
}
