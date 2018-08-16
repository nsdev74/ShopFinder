import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';

import { Shop } from '../shops.model';
import { ShopsService } from '../shops.service';

@Component({
  selector: 'app-preferred',
  templateUrl: './preferred.component.html',
  styleUrls: ['./preferred.component.css']
})
export class PreferredComponent implements OnInit, OnDestroy {
  // Preferred shop array to display
  shops: Shop[] = [];
  // Pagination index
  p = 1;

  private shopErrorSub: Subscription;

  shopError: boolean;

  constructor(private shopService: ShopsService, private spinner: NgxSpinnerService) { }

  private shopsSub: Subscription;

  ngOnInit() {
    this.spinner.show();
    this.shopService.getPreferredShops();
    // Shop array subscription
    this.shopsSub = this.shopService.getPrefShopUpdateListener()
      .subscribe((shops: Shop[]) => {
        this.shops = shops;
        console.log(this.shops);
        this.spinner.hide();
      });
    // Error subscription
    this.shopErrorSub = this.shopService.getErrorListener()
      .subscribe( errorStatus => {
        this.shopError = errorStatus;
        if (errorStatus) {
          this.spinner.hide();
        }
      });
  }

  ngOnDestroy() {
    this.shopsSub.unsubscribe();
    this.shopErrorSub.unsubscribe();
  }


  removePreferred(id: string) {
    // Remove preferred shops function
    this.shopService.removeLikeShop(id);
  }

}
