import GetOrders from '../../../src/application/query/get_orders/GetOrders';
import PlaceOrder from '../../../src/application/usecase/place_order/PlaceOrder';
import DefaultFreightCalculator from '../../../src/domain/entity/DefaultFreightCalculator';
import OrderRepository from '../../../src/domain/repository/OrderRepository';
import OrderDAODatabase from '../../../src/infra/dao/OrderDAODatabase';
import PgPromiseConnectionAdapter from '../../../src/infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from '../../../src/infra/factory/DatabaseRepositoryFactory';
import OrderRepositoryDatabase from '../../../src/infra/repository/database/OrderRepositoryDatabase';

let placeOrder: PlaceOrder;
let getOrders: GetOrders;
let orderRepository: OrderRepository;

beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  orderRepository = new OrderRepositoryDatabase(connection);
  const repositoryFactory = new DatabaseRepositoryFactory();
  const freightCalculator = new DefaultFreightCalculator();
  const orderDAO = new OrderDAODatabase(connection);
  getOrders = new GetOrders(orderDAO);
  placeOrder = new PlaceOrder(repositoryFactory, freightCalculator);
});

test('Deve obter todos os pedidos', async () => {
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
  await placeOrder.execute(input);
  const getOrdersOutput = await getOrders.execute();
  expect(getOrdersOutput.orders).toHaveLength(1);
});

afterEach(async () => {
  await orderRepository.clear();
});
