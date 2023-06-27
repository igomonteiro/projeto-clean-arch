import Item from '../../domain/entity/Item';
import ItemRepository from '../../domain/repository/ItemRepository';

export default class ItemRepositoryDatabase implements ItemRepository {
  findById(idItem: number): Promise<Item | undefined> {
    throw new Error('Method not implemented.');
  }
}
