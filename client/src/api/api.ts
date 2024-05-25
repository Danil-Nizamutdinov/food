import axios from "axios";

export const urlImg = "http://localhost:5000/static/";

const instans = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const mainAPI = {
  async getShop(limit: number = 9, page: number = 1) {
    const res = await instans.get("userInfo/getShop", {
      params: { page, limit },
    });
    return res.data;
  },
  async getRestaurants(limit: number = 9, page: number = 1) {
    const res = await instans.get("userInfo/getRestaurant", {
      params: { page, limit },
    });
    return res.data;
  },
  async getCategorys(userId: number) {
    const res = await instans.get("category/get", { params: { userId } });
    return res.data;
  },
  async getShopItem(
    categoryId: number,
    userId: number,
    page: number,
    limit: number
  ) {
    const res = await instans.get("userItem/get", {
      params: { categoryId, userId, page, limit },
    });
    return res.data;
  },
};
