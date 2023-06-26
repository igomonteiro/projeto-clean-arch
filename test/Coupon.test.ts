import Coupon from '../src/Coupon';

test('Deve criar um cupom de desconto de 20%', () => {
  const coupon = new Coupon('VALE20', 20);
  expect(coupon).toBeTruthy();
});
