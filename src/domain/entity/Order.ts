import Coupon from './Coupon';
import Cpf from './Cpf';
import DefaultFreightCalculator from './DefaultFreightCalculator';
import FreightCalculator from './FreightCalculator';
import Item from './Item';
import OrderCode from './OrderCode';
import OrderItem from './OrderItem';

export default class Order {
  private cpf: Cpf;
  private orderItems: OrderItem[];
  coupon?: Coupon;
  private freigth: number;
  private code: OrderCode;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    readonly sequence: number = 1
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freigth = 0;
    this.code = new OrderCode(date, sequence);
  }

  addItem(item: Item, quantity: number) {
    this.freigth += this.freightCalculator.calculate(item) * quantity;
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  getFreight() {
    return this.freigth;
  }

  getCode() {
    return this.code.value;
  }

  getCpf() {
    return this.cpf.value;
  }

  getOrderItems() {
    return this.orderItems;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }
    total += this.getFreight();
    return total;
  }
}
