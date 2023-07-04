import StockEntry from '../../../domain/entity/StockEntry';
import StockEntryRepository from '../../../domain/repository/StockEntryRepository';

export default class StockEntryRepositoryInMemory
  implements StockEntryRepository
{
  stockEntries: StockEntry[];

  constructor() {
    this.stockEntries = [];
  }

  async save(entry: StockEntry): Promise<void> {
    this.stockEntries.push(entry);
  }

  async getByIdItem(idItem: number): Promise<StockEntry[]> {
    const stockEntries = this.stockEntries.filter(
      (stockEntry) => stockEntry.idItem === idItem
    );
    return stockEntries;
  }

  async clear(): Promise<void> {
    this.stockEntries = [];
  }
}
