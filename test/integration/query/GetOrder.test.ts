import GetOrder from '../../../src/application/query/get_order/GetOrder';
import PlaceOrder from '../../../src/application/usecase/place_order/PlaceOrder';
import DefaultFreightCalculator from '../../../src/domain/entity/DefaultFreightCalculator';
import OrderRepository from '../../../src/domain/repository/OrderRepository';
import Broker from '../../../src/infra/broker/Broker';
import OrderDAODatabase from '../../../src/infra/dao/OrderDAODatabase';
import PgPromiseConnectionAdapter from '../../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../../src/infra/factory/DatabaseRepositoryFactory';
import OrderRepositoryDatabase from '../../../src/infra/repository/database/OrderRepositoryDatabase';

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let orderRepository: OrderRepository;

beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  orderRepository = new OrderRepositoryDatabase(connection);
  const repositoryFactory = new DatabaseRepositoryFactory();
  const freightCalculator = new DefaultFreightCalculator();
  const orderDAO = new OrderDAODatabase(connection);
  getOrder = new GetOrder(orderDAO);
  const broker = new Broker();
  placeOrder = new PlaceOrder(repositoryFactory, freightCalculator, broker);
});

test('Deve obter um pedido pelo código', async () => {
  const input = {
    cpf: '022.891.412-40',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date('2023-08-10'),
    coupon: 'VALE20',
  };
  const placeOrderOutput = await placeOrder.execute(input);
  const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
  expect(getOrderOutput.code).toBe('202300000001');
  expect(getOrderOutput.total).toBe(138);
});

afterEach(async () => {
  await orderRepository.clear();
});
