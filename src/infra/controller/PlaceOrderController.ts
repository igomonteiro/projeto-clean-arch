import PlaceOrder from '../../application/usecase/place_order/PlaceOrder';
import FreightCalculator from '../../domain/entity/FreightCalculator';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import Broker from '../broker/Broker';

export default class PlaceOrderController {
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly freightCalculator: FreightCalculator,
    readonly broker: Broker
  ) {}

  async execute(params: any, body: any) {
    const placeOrder = new PlaceOrder(
      this.repositoryFactory,
      this.freightCalculator,
      this.broker
    );
    const input = body;
    if (input.date) input.date = new Date(input.date);
    return await placeOrder.execute(input);
  }
}
