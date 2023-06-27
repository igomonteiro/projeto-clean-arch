import Coupon from './Coupon';
import Cpf from './Cpf';
import DefaultFreightCalculator from './DefaultFreightCalculator';
import FreightCalculator from './FreightCalculator';
import Item from './Item';
import OrderItem from './OrderItem';

export default class Order {
  cpf: Cpf;
  private orderItems: OrderItem[];
  coupon?: Coupon;
  private freigth: number;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freigth = 0;
  }

  addItem(item: Item, quantity: number) {
    this.freigth += this.freightCalculator.calculate(item) * quantity;
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  getFreight() {
    return this.freigth;
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }
    return total;
  }
}
