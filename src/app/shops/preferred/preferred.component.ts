import { Component, OnInit, OnDestroy } from '@angular/core';

import { Shop } from '../shops.model';
import { ShopsService } from '../shops.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-preferred',
  templateUrl: './preferred.component.html',
  styleUrls: ['./preferred.component.css']
})
export class PreferredComponent implements OnInit, OnDestroy {
  // Preferred shop array to display
  shops: Shop[];
  // Pagination index
  p = 1;

  constructor(private shopService: ShopsService) { }

  private shopsSub: Subscription;

  ngOnInit() {
    this.shopService.getPreferredShops();
    this.shopsSub = this.shopService.getPrefShopUpdateListener()
      .subscribe((shops: Shop[]) => {
        this.shops = shops;
        console.log(this.shops);
      });
  }

  ngOnDestroy() {
    this.shopsSub.unsubscribe();
  }


  removePreferred(id: number) {
    // Dummy data
    this.shopService.removeLikeShop(id);
    // Reload
  }

}
