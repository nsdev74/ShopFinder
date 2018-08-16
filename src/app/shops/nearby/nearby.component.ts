// Global dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
// Local dependencies
import { Shop } from '../shops.model';
import { ShopsService } from '../shops.service';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit, OnDestroy {
  // Shop array to display
  shops: Shop[] = [];
  // Pagination index
  p = 1;

  constructor(private shopService: ShopsService, private spinner: NgxSpinnerService) { }

  private shopsSub: Subscription;

  private shopErrorSub: Subscription;

  shopError: boolean;

  arrayEmpty: boolean;

  ngOnInit() {
    this.spinner.show();
    this.shopService.getShops();
    // Shop array subscription
    this.shopsSub = this.shopService.getShopUpdateListener()
      .subscribe((shops: Shop[]) => {
        this.shops = shops;
        this.spinner.hide();
        this.arrayEmpty = false;
        if (shops.length === 0) {
          this.arrayEmpty = true;
        }
      }
    );
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

  likeShop(id: string) {
    // Like shop function
    this.shopService.likeShop(id);
  }

  dislikeShop(id: string) {
    // Dislike shop function
    this.shopService.dislikeShop(id);
  }
}
