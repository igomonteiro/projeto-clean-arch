import PlaceOrder from '../../application/usecase/place_order/PlaceOrder';
import FreightCalculator from '../../domain/entity/FreightCalculator';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';

export default class PlaceOrderController {
  constructor(
    readonly repositoryFactory: RepositoryFactory,
    readonly freightCalculator: FreightCalculator
  ) {}

  async execute(params: any, body: any) {
    const placeOrder = new PlaceOrder(
      this.repositoryFactory,
      this.freightCalculator
    );
    const input = body;
    input.date = new Date(input.date);
    return await placeOrder.execute(input);
  }
}
