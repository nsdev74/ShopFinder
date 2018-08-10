import { Shop } from './shops.model';

export class ShopsService {
  // Nearby shops array
  private shops: Shop[] = [
    // Dummy data for testing purposes
    new Shop(
      'Shop1',
      50,
      'http://placehold.it/150x150',
      1
    ),
    new Shop(
      'Shop2',
      40,
      'http://placehold.it/150x150',
      2
    ),
    new Shop(
      'Shop3',
      30,
      'http://placehold.it/150x150',
      3
    ),
    new Shop(
      'Shop4',
      20,
      'http://placehold.it/150x150',
      4
    ),
    new Shop(
      'Shop5',
      19,
      'http://placehold.it/150x150',
      5
    ),
    new Shop(
      'Shop6',
      18,
      'http://placehold.it/150x150',
      6
    ),
    new Shop(
      'Shop7',
      17,
      'http://placehold.it/150x150',
      7
    ),
    new Shop(
      'Shop8',
      16,
      'http://placehold.it/150x150',
      8
    )
  ];
  // Preferred shop array
  private prefShops: Shop[] = [];

  getShops() {
    // Dummy function
    return this.shops.slice();
  }
  // Dummy local function
  likeShop(id: number) {
    let likedShop: Shop;
    likedShop = this.shops.find(x => x.shopId === id);
    this.prefShops.push(likedShop);
    this.shops.splice( this.shops.indexOf(likedShop), 1);
  }

  getPreferredShops() {
    return this.prefShops.slice();
  }

}
