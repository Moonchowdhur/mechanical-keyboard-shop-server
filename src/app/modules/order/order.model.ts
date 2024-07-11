import { model, Schema } from 'mongoose';
import { Torder, Tprodus } from './order.interface';

const product = new Schema<Tprodus>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
  },
  { _id: false },
); // No separate _id for subdocuments

const orderSchema = new Schema<Torder>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phNumber: { type: String, required: true },
  address: { type: String, required: true },
  products: [product],
  payment: { type: String, enum: ['cashOnDelivery', 'stripe'], required: true }
});

export const Order = model<Torder>('Order', orderSchema);
