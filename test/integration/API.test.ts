import axios from 'axios';
import PlaceOrder from '../../src/application/usecase/place_order/PlaceOrder';
import OrderRepository from '../../src/domain/repository/OrderRepository';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory';
import DefaultFreightCalculator from '../../src/domain/entity/DefaultFreightCalculator';

let placeOrder: PlaceOrder;
let orderRepository: OrderRepository;

beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  orderRepository = new OrderRepositoryDatabase(connection);
  const repositoryFactory = new DatabaseRepositoryFactory();
  const freightCalculator = new DefaultFreightCalculator();
  placeOrder = new PlaceOrder(repositoryFactory, freightCalculator);
});

test('Deve testar a API /orders (POST)', async () => {
  const response = await axios({
    url: 'http://localhost:3000/orders',
    method: 'post',
    data: {
      cpf: '022.891.412-40',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 },
      ],
      date: new Date('2023-08-10'),
      coupon: 'VALE20',
    },
  });
  const order = response.data;
  expect(order.total).toBe(138);
});

test('Deve testar a API /orders (GET)', async () => {
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
  const response = await axios({
    url: 'http://localhost:3000/orders',
    method: 'get',
  });
  const orders = response.data;
  expect(orders.orders).toHaveLength(1);
});

test('Deve testar a API /orders/<code> (GET)', async () => {
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
  const response = await axios({
    url: 'http://localhost:3000/orders/202300000001',
    method: 'get',
  });
  const order = response.data;
  expect(order.code).toBe('202300000001');
});

test('Deve testar a API /simulate-freight (POST)(', async () => {
  const response = await axios({
    url: 'http://localhost:3000/simulate-freight',
    method: 'post',
    data: {
      items: [
        {
          idItem: 4,
          quantity: 1,
        },
        {
          idItem: 5,
          quantity: 1,
        },
        {
          idItem: 6,
          quantity: 3,
        },
      ],
    },
  });
  const output = response.data;
  expect(output.amount).toBe(260);
});

afterEach(async () => {
  await orderRepository.clear();
});
