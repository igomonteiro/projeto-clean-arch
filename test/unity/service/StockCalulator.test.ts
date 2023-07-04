import StockEntry from '../../../src/domain/entity/StockEntry';
import StockCalculator from '../../../src/domain/service/StockCalculator';

test('Deve calcular o estoque disponível para um item', () => {
  const calculator = new StockCalculator();
  const stockEntries = [
    new StockEntry(1, 'in', 10, new Date('2021-07-01T10:00:00')),
    new StockEntry(1, 'out', 5, new Date('2021-07-02T10:00:00')),
  ];
  const total = calculator.calculate(stockEntries);
  expect(total).toBe(5);
});
