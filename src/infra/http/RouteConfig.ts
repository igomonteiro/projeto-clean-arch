import DefaultFreightCalculator from '../../domain/entity/DefaultFreightCalculator';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import GetOrderController from '../controller/GetOrderController';
import GetOrdersController from '../controller/GetOrdersController';
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

    http.on('/orders', 'get', (params: any, body: any) => {
      const getOrdersController = new GetOrdersController(repositoryFactory);
      return getOrdersController.execute(params, body);
    });

    http.on('/orders/:code', 'get', (params: any, body: any) => {
      const getOrderController = new GetOrderController(repositoryFactory);
      return getOrderController.execute(params, body);
    });

    http.on('/simulate-freight', 'post', (params: any, body: any) => {
      const simulateFreightController = new SimulateFreightController();
      return simulateFreightController.execute(params, body);
    });
  }
}
