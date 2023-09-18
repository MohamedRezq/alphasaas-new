import { App_Config } from "@/config";
import httpServices from "@/utils/httpServices";

export const fetchDataPost = async (url: string, params: object) => {
  try {
    const res = await httpServices.post(
      `${App_Config.API_BASE_URL}/api/${url}`,
      {
        organizationId: localStorage.getItem("organizationId"),
        ...params,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any | null) {
    return undefined;
  }
};

export const fetchDataGet = async (url: string) => {
  try {
    const res = await httpServices.get(
      `${App_Config.API_BASE_URL}/api/${url}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error: any | null) {
    return undefined;
  }
};
