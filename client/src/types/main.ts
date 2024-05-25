export interface MainState {
  shop: any;
  restaurants: any;
  categorys: any;
  shopItems: any;
  currentName: string;
  isCard: boolean;
}

type BasketType = {
  count: number;
  id: number;
  userId: number;
  totalPrice: number;
  price: number;
  img: string;
  name: string;
};

export interface BasketState {
  isBasket: boolean;
  basket: Array<BasketType>;
  nameShop: string;
}

export interface MapState {
  isMap: boolean;
  coords: number[];
  address: any;
}
