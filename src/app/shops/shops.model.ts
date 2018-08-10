
/* export interface Shop {
  shopName: string;
  shopDistance: number;
  shopImagePath: string;
  shopId: number;
} */

// We need to test front end elements using a class with a constructor, placeholder block
export class Shop {
  public shopName: string;
  public shopDistance: number;
  public shopImagePath: string;
  public shopId: number;

  constructor(name: string, dist: number, imgPath: string, id: number) {
    this.shopName = name;
    this.shopDistance = dist;
    this.shopImagePath = imgPath;
    this.shopId = id;
  }
}
