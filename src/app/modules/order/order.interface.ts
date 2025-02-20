import { Types } from 'mongoose';
export const orderStatuses = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

interface IOrderProduct {
  product: Types.ObjectId;
  quantity: number;
  color: string;
}

export interface IOrder {
  orderId: string;
  userId: Types.ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
