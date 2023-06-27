import OrderCode from '../../src/domain/entity/OrderCode';

test('Deve criar um código de pedido', () => {
  const date = new Date('2023-10-01');
  const sequence = 1;
  const orderCode = new OrderCode(date, sequence);
  const code = orderCode.value;
  expect(code).toBe('202300000001');
});
