import env from '@/env/env';
import Axios, { AxiosInstance } from 'axios';

// TODO: put out later
export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeaders;
};

export class ApiConfig {
  accessToken?: string;
}
/**
 * @description abstract ApiClient
 */

export interface IApiClient {
  get<TRes>(path: string): Promise<TRes>;

  post<TReq, TRes>(
    path: string,
    object: TReq,
    config?: RequestConfig
  ): Promise<TRes>;

  put<TReq, TRes>(path: string, object: TReq): Promise<TRes>;

  delete<TRes>(path: string): Promise<TRes>;
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  constructor(apiConfiguration: ApiConfig) {
    this.client = this.createAxiosClient(apiConfiguration);
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
    config?: RequestConfig
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
   * @param apiConfig basic api config
   * @returns axios instance to be used
   */
  protected createAxiosClient(apiConfig: ApiConfig): AxiosInstance {
    return Axios.create({
      baseURL: env.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
        ...(apiConfig.accessToken && {
          Authorization: `Bearer ${apiConfig.accessToken}`,
        }),
      },
    });
  }
}
