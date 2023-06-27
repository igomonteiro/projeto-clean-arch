// It's a DTO, can be a typescript type/interface
export default class PlaceOrderInput {
  constructor(
    readonly cpf: string,
    readonly orderItems: { idItem: number; quantity: number }[],
    readonly date: Date,
    readonly coupon?: string
  ) {}
}
