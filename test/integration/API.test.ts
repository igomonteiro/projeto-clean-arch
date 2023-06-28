import axios from 'axios';

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
