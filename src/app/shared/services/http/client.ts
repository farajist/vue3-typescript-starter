import env from '@/env/env';
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export type ApiRequestConfig = AxiosRequestConfig & {
  secure: boolean;
};

export interface ApiConfig {
  baseURL: string;
}

/**
 * @description abstract ApiClient
 */
export interface IApiClient {
  get<TRes>(path: string): Promise<TRes>;

  post<TReq, TRes>(
    path: string,
    object: TReq,
    config?: ApiRequestConfig
  ): Promise<TRes>;

  put<TReq, TRes>(path: string, object: TReq): Promise<TRes>;

  delete<TRes>(path: string): Promise<TRes>;
}

const isSecure = (config: ApiRequestConfig) => {
  return config.secure == true;
};

class ApiClient implements IApiClient {
  private client: AxiosInstance;

  constructor(apiConfig: ApiConfig) {
    this.client = this.createAxiosClient(apiConfig);
  }

  /**
   * perform an actual GET request
   * @param path
   * @returns
   */
  async get<TRes>(path: string): Promise<TRes> {
    try {
      const response = await this.client.get<TRes>(path);
      return response.data;
    } catch (error) {
      //FIXME: handleServiceError(error);
      console.log(error);
    }
    return {} as TRes;
  }

  /**
   *
   * @param path
   * @param object
   * @param config
   */
  async post<TReq, TRes>(
    path: string,
    payload: TReq,
    config?: ApiRequestConfig
  ): Promise<TRes> {
    try {
      const response = config
        ? await this.client.post<TRes>(path, payload, config)
        : await this.client.post<TRes>(path, payload);

      return response.data;
    } catch (error) {
      // handleServiceError(error);
      console.log(error);
    }
    return {} as TRes;
  }

  /**
   *
   * @param path
   * @param object
   */
  async put<TReq, TRes>(path: string, payload: TReq): Promise<TRes> {
    try {
      const response = await this.client.put<TRes>(path, payload);
      return response.data;
    } catch (error) {
      // handleServiceError(error);
      console.log(error);
    }
    return {} as TRes;
  }

  /**
   *
   * @param path
   */
  async delete<TRes>(path: string): Promise<TRes> {
    try {
      const response = await this.client.delete<TRes>(path);
      return response.data;
    } catch (error) {
      // handleServiceError(error);
      console.log(error);
    }
    return {} as TRes;
  }

  /**
   * instantiate an axios client
   * @returns axios instance to be used
   */
  protected createAxiosClient({ baseURL }: ApiConfig): AxiosInstance {
    const instance = Axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      //HACK: until there is solution to per-req interceptor
      if (isSecure(config as ApiRequestConfig)) {
        const accessToken = ''; // getAccessToken FIXME: how to retrieve
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      return config;
    });
    return instance;
  }
}

export const apiClient = new ApiClient({ baseURL: env.apiBaseUrl });
