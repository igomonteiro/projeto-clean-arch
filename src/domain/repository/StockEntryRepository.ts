import StockEntry from '../entity/StockEntry';

export default interface StockEntryRepository {
  save(entry: StockEntry): Promise<void>;
  getByIdItem(idItem: number): Promise<StockEntry[]>;
  clear(): Promise<void>;
}
