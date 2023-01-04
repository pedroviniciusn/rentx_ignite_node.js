interface IStorageProvider {
  save(file: string | string[], folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
}

export { IStorageProvider };
