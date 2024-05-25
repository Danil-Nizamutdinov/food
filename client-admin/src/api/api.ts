import axios from "axios";
import { jwtDecode } from "jwt-decode";

const instans = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// Желательно пересмотреть весь этот код
// и сделать его более читабельным + убрать отсюда лишнюю логику

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
  async registration(email: string, password: string, role: string) {
    try {
      const res = await instans.post(
        "admin/createUser",
        { email, password, role },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return res.data;
    } catch (e) {
      alert(e);
    }
  },
  async getUsers(limit: number = 9, page: number = 1) {
    try {
      const res = await instans.get("admin/getUsers", {
        params: { limit, page },
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deleteUser(userId: number) {
    try {
      const res = await instans.delete("admin/deleteUser", {
        params: { userId },
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (e) {
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
};
