import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    this.reload();
  }
  // Placeholder Functions
  likeShop(id: number) {

  }
  dislikeShop(id: number) {

  }
  // Shop fetching function
  reload() {
    this.shops = this.shopService.getShops();
  }
}
