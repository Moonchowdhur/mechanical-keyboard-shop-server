import { Types } from 'mongoose';

export type Tprodus = {
  product: Types.ObjectId;
  quantity: number;
};

export type TPaymentMethod = 'cashOnDelivery' |'strpe';

export type Torder = {
  name: string;
  email: string;
  phNumber: string;
  address: string;
  products: [Tprodus];
  payment: TPaymentMethod;
  
};
