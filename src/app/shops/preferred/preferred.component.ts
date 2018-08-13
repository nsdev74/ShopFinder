import { Component, OnInit } from '@angular/core';

import { Shop } from '../shops.model';
import { ShopsService } from '../shops.service';

@Component({
  selector: 'app-preferred',
  templateUrl: './preferred.component.html',
  styleUrls: ['./preferred.component.css']
})
export class PreferredComponent implements OnInit {
  shops: Shop[];

  constructor(private shopService: ShopsService) { }

  ngOnInit() {
    this.reload();
  }

  removePreferred(id: number) {
    // Dummy data
    this.shopService.removeLikeShop(id);
    this.reload();
  }

  // Preferred shops fetching function
  reload() {
  }
}
