import Axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";
import { BASE_URL, LANG } from "../../defaults";

export function getAxiosConfig(config: AxiosRequestConfig) {
  const updatedConfig = { ...config };
  if (!updatedConfig.headers) {
    updatedConfig.headers = {};
  }

  const lang = localStorage.getItem("lang") ?? LANG;

  updatedConfig.headers["Accept-Language"] = lang;

  return updatedConfig as InternalAxiosRequestConfig;
}

async function defaultErrorHandler(response?: Error, errorMessage?: string) {
  if (errorMessage) {
    return errorMessage;
  }
  return response?.message;
}

class ApiService {
  private axiosInstance: any;

  constructor() {
    this.axiosInstance = Axios.create({
      baseURL: BASE_URL,
      headers: {
        'X-Requested-with': 'XMLHttpRequest',
      }
    });

    this.axiosInstance.interceptors.request.use(
      getAxiosConfig,
      (error) => Promise.reject(error),
    );
  }

  public async sendRequest(method: string, url: string, data?: any, params?: any, config?: AxiosRequestConfig): Promise<any> {
    if (!url) {
      throw new Error("Url was not found");
      return;
    }

    let result: any;
    try {
      switch (method.toLowerCase()) {
        case 'get':
          result = await this.axiosInstance.get(url, { params, ...config });
          break;
        case 'post':
          result = await this.axiosInstance.post(url, data, { params, ...config });
          break;
        case 'put':
          result = await this.axiosInstance.put(url, data, { params, ...config });
          break;
        case 'delete':
          result = await this.axiosInstance.delete(url, { params, ...config });
          break;
        default:
          throw new Error("Wrong HTTP method");
      }

      return result.data;
    } catch (error) {
      if (error && error.response!.status === 401) {
        // router.push({name: "logout"});
        return Promise.reject(new Error("Unauthorized"));
      }

      return defaultErrorHandler(error);
    }
  }
}

export const ApiServiceInstance = new ApiService();