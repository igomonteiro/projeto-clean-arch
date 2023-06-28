import SimulateFreight from '../../application/usecase/simulate_freight/SimulateFreight';
import DefaultFreightCalculator from '../../domain/entity/DefaultFreightCalculator';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import PlaceOrderController from '../controller/PlaceOrderController';
import SimulateFreightController from '../controller/SimulateFreightController';
import Http from './Http';

export default class RouteConfig {
  constructor(http: Http, repositoryFactory: RepositoryFactory) {
    http.on('/orders', 'post', (params: any, body: any) => {
      const freightCalculator = new DefaultFreightCalculator();
      const placeOrderController = new PlaceOrderController(
        repositoryFactory,
        freightCalculator
      );
      return placeOrderController.execute(params, body);
    });

    http.on('/simulate-freight', 'post', (params: any, body: any) => {
      const simulateFreightController = new SimulateFreightController();
      return simulateFreightController.execute(params, body);
    });
  }
}
