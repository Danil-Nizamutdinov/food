import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const urlImg = "http://localhost:5000/static/";

const instans = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const userAPI = {
  async login(email: string, password: string) {
    try {
      const res = await instans.post("user/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        return jwtDecode(res.data.token);
      } else {
        return res.data;
      }
    } catch (e) {
      localStorage.removeItem("token");
      alert(e);
    }
  },

  async check() {
    try {
      const res = await instans.get("user/auth", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        return jwtDecode(res.data.token);
      } else {
        return res.data;
      }
    } catch (e) {
      localStorage.removeItem("token");
      alert(e);
    }
  },
  async updateLogo(data: FormData) {
    const res = await instans.patch("userInfo/updateLogo", data);
    return res.data;
  },
  async updateName(userId: number, name: string) {
    const res = await instans.patch("userInfo/updateName", { userId, name });
    return res.data;
  },
  async updateRole(userId: number, role: string) {
    const res = await instans.patch("userInfo/updateRole", { userId, role });
    return res.data;
  },
  async getUserInfo(userId: number) {
    const res = await instans.get("userInfo/get", { params: { userId } });
    return res.data;
  },
  async getCategory(userId: number) {
    const res = await instans.get("category/get", { params: { userId } });
    return res.data;
  },
  async addCategory(userId: number, name: string) {
    const res = await instans.post("category/create", { userId, name });
    return res.data;
  },
  async deleteCategory(userId: number, categoryId: number) {
    const res = await instans.delete("category/delete", {
      params: { userId, categoryId },
    });
    return res.data;
  },
  async createUserItem(data: FormData) {
    const res = await instans.post("userItem/create", data);
    return res.data;
  },
  async getLastUserItem(userId: number) {
    const res = await instans.get("userItem/getLast", { params: { userId } });
    return res.data;
  },
  async getUserItems(
    categoryId: number,
    userId: number,
    page: number = 1,
    limit: number = 9
  ) {
    const res = await instans.get("userItem/get", {
      params: { categoryId, userId, page, limit },
    });
    return res.data;
  },
  async deleteUserItem(userId: number, userItemId: number) {
    const res = await instans.delete("userItem/delete", {
      params: { userId, userItemId },
    });
    return res.data;
  },
};
