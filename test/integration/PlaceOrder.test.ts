import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import CouponRepositoryInMemory from '../../src/infra/repository/memory/CouponRepositoryInMemory';
import ItemRepositoryInMemory from '../../src/infra/repository/memory/ItemRepositoryInMemory';
import OrderRepositoryInMemory from '../../src/infra/repository/memory/OrderRepositoryInMemory';

test('Deve fazer um pedido', async () => {
  const itemRepository = new ItemRepositoryInMemory();
  const couponRepository = new CouponRepositoryInMemory();
  const orderRepository = new OrderRepositoryInMemory();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
  const input = {
    cpf: '022.891.412-40',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date('2023-12-10'),
    coupon: 'VALE20',
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(88);
});

test('Deve fazer um pedido com cálculo de frete', async () => {
  const itemRepository = new ItemRepositoryInMemory();
  const couponRepository = new CouponRepositoryInMemory();
  const orderRepository = new OrderRepositoryInMemory();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
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
  console.log(orderRepository.orders);
  expect(output.total).toBe(6350);
});
