import ItemDAO from '../../application/dao/ItemDAO';
import Connection from '../database/Connection';

export default class ItemDAODatabase implements ItemDAO {
  constructor(readonly connection: Connection) {}

  async findAll(): Promise<any> {
    const items = await this.connection.query('select * from ccca.item', []);
    return items.map((item: any) => ({
      idItem: item.id_item,
      price: parseFloat(item.price),
      category: item.category,
      description: item.description,
      width: item.width,
      height: item.height,
      length: item.length,
      weight: item.weight,
    }));
  }
}
