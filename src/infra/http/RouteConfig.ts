import ItemDAO from '../../application/dao/ItemDAO';
import OrderDAO from '../../application/dao/OrderDAO';
import ValidateCoupon from '../../application/usecase/validate_coupon/ValidateCoupon';
import DefaultFreightCalculator from '../../domain/entity/DefaultFreightCalculator';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import Broker from '../broker/Broker';
import GetItemsController from '../controller/GetItemsController';
import GetOrderController from '../controller/GetOrderController';
import GetOrdersController from '../controller/GetOrdersController';
import PlaceOrderController from '../controller/PlaceOrderController';
import SimulateFreightController from '../controller/SimulateFreightController';
import PgPromiseConnectionAdapter from '../database/PgPromiseConnectionAdapter';
import CouponRepositoryDatabase from '../repository/database/CouponRepositoryDatabase';
import Http from './Http';

export default class RouteConfig {
  constructor(
    http: Http,
    repositoryFactory: RepositoryFactory,
    orderDAO: OrderDAO,
    itemDAO: ItemDAO,
    broker: Broker
  ) {
    http.on('/orders', 'post', (params: any, body: any) => {
      const freightCalculator = new DefaultFreightCalculator();
      const placeOrderController = new PlaceOrderController(
        repositoryFactory,
        freightCalculator,
        broker
      );
      return placeOrderController.execute(params, body);
    });

    http.on('/items', 'get', (params: any, body: any) => {
      const getItemsController = new GetItemsController(itemDAO);
      return getItemsController.execute(params, body);
    });

    http.on(
      '/validate-coupon',
      'post',
      async function (params: any, body: any) {
        const validateCoupon = new ValidateCoupon(
          new CouponRepositoryDatabase(PgPromiseConnectionAdapter.getInstance())
        );
        const input = body;
        return await validateCoupon.execute(input.coupon);
      }
    );

    http.on('/orders', 'get', (params: any, body: any) => {
      const getOrdersController = new GetOrdersController(orderDAO);
      return getOrdersController.execute(params, body);
    });

    http.on('/orders/:code', 'get', (params: any, body: any) => {
      const getOrderController = new GetOrderController(orderDAO);
      return getOrderController.execute(params, body);
    });

    http.on('/simulate-freight', 'post', (params: any, body: any) => {
      const simulateFreightController = new SimulateFreightController();
      return simulateFreightController.execute(params, body);
    });
  }
}
