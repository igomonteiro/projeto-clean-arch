import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import CouponRepository from '../../domain/repository/CouponRepository';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import StockEntryRepository from '../../domain/repository/StockEntryRepository';
import CouponRepositoryInMemory from '../repository/memory/CouponRepositoryInMemory';
import ItemRepositoryInMemory from '../repository/memory/ItemRepositoryInMemory';
import OrderRepositoryInMemory from '../repository/memory/OrderRepositoryInMemory';
import StockEntryRepositoryInMemory from '../repository/memory/StockEntryRepositoryInMemory';

export default class MemoryRepositoryFactory implements RepositoryFactory {
  constructor() {}
  createItemRepository(): ItemRepository {
    return new ItemRepositoryInMemory();
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryInMemory();
  }
  createOrderRepository(): OrderRepository {
    return new OrderRepositoryInMemory();
  }
  createStockEntryRepository(): StockEntryRepository {
    return new StockEntryRepositoryInMemory();
  }
}
