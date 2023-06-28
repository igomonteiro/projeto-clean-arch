import SimulateFreight from '../../application/usecase/simulate_freight/SimulateFreight';
import DefaultFreightCalculator from '../../domain/entity/DefaultFreightCalculator';
import PgPromiseConnectionAdapter from '../database/PgPromiseConnectionAdapter';
import ItemRepositoryDatabase from '../repository/database/ItemRepositoryDatabase';

export default class SimulateFreightController {
  async execute(params: any, body: any) {
    const freightCalculator = new DefaultFreightCalculator();
    const itemRepositoryDatabase = new ItemRepositoryDatabase(
      PgPromiseConnectionAdapter.getInstance()
    );
    const simulateFreight = new SimulateFreight(
      itemRepositoryDatabase,
      freightCalculator
    );
    const input = body;
    return await simulateFreight.execute(input);
  }
}
