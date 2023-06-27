import PlaceOrder from '../../src/application/usecase/place_order/PlaceOrder';
import OrderRepository from '../../src/domain/repository/OrderRepository';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';

let placeOrder: PlaceOrder;
let orderRepository: OrderRepository;

beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const couponRepository = new CouponRepositoryDatabase(connection);
  orderRepository = new OrderRepositoryDatabase(connection);
  placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
});

test('Deve fazer um pedido', async () => {
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
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(138);
});

test('Deve fazer um pedido com cálculo de frete', async () => {
  const input = {
    cpf: '022.891.412-40',
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date('2023-12-10'),
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6350);
});

test('Deve fazer um pedido com código', async () => {
  const input = {
    cpf: '022.891.412-40',
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date('2023-12-10'),
  };
  const output = await placeOrder.execute(input);
  expect(output.code).toBe('202300000001');
});

afterEach(async () => {
  await orderRepository.clear();
});
