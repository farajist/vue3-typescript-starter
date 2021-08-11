/**
 * @description interface describing our stroage ops
 */
interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear: () => void;
}

/**
 * App Storage class
 * @description This will be responsible for storing data into the application.
 * Commonly, people use LocalStorage or SessionStorage. This is just a wrapper over them
 * because to restrict the usage of Global window storage throughtout the application
 * Default, this is just using the LocalStorage
 */
export default class Storage<T extends string> {
  private readonly storage: IStorage;

  constructor(getStorage = (): IStorage => window.localStorage) {
    this.storage = getStorage();

    /** Is storage is supported or not */
    if (!this.isSupported()) {
      throw new Error('Storage is not supported by browser!');
    }
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key: T): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: T): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  /**
   * @description Check for storage support
   * @returns {boolean} supported
   * */
  private isSupported() {
    let supported = true;

    if (!this.storage) {
      supported = false;
    }

    return supported;
  }
}

/**
 * Creating the instance of storage. Default will be localStorage
 * but if you want to create instance for session storage then pass window.sessionStorage as parameter
 */
const appLocalStorage = new Storage();
const appSessionStorage = new Storage(() => window.sessionStorage);

export { appLocalStorage, appSessionStorage };
