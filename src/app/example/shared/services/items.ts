import ApiClient, { IApiClient } from '@/app/shared/services/http/client';
import { FetchItemsResponse, Item } from '../@types';
import { apiConstants } from '../config';

export interface IItemApiClient {
  fetchItems(): Promise<Item[] | undefined>;
}

export class ItemApiClient implements IItemApiClient {
  itemApiClient: IApiClient;
  apiPath: string;

  constructor(itemApiClient: IApiClient) {
    this.itemApiClient = itemApiClient;
    this.apiPath = apiConstants.path;
  }

  async fetchItems(): Promise<Item[] | undefined> {
    try {
      const { data } = await this.itemApiClient.get<FetchItemsResponse>(
        `${this.apiPath}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default class ItemService {
  itemApiClient: IItemApiClient;

  constructor(itemApiClient: IItemApiClient) {
    this.itemApiClient = itemApiClient;
  }

  async fetchUsers(): Promise<Item[] | undefined> {
    return this.itemApiClient.fetchItems();
  }
}

const itemApiClient = new ItemApiClient(new ApiClient({}));
export const itemService = new ItemService(itemApiClient);
