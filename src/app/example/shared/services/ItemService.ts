import { apiClient, IApiClient } from '@/app/shared/services/http/client';
import { FetchItemsResponse, Item } from '../@types';
import { apiConstants } from '../config';

export interface IItemApiClient {
  fetchItems(): Promise<Item[] | undefined>;
}

class ItemApiClient implements IItemApiClient {
  itemApiClient: IApiClient;
  apiPath: string;

  constructor(itemApiClient: IApiClient) {
    this.itemApiClient = itemApiClient;
    //FIXME: imported config
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

class ItemService {
  itemApiClient: IItemApiClient;

  constructor(itemApiClient: IItemApiClient) {
    this.itemApiClient = itemApiClient;
  }

  async fetchItems(): Promise<Item[] | undefined> {
    return this.itemApiClient.fetchItems();
  }
}

// instantiate service
const itemApiClient = new ItemApiClient(apiClient);
const itemService = new ItemService(itemApiClient);
export default itemService;
