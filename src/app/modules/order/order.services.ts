import httpStatus from 'http-status';
import { Product } from '../product/product.model';
import { Torder } from './order.interface';
import { Order } from './order.model';
import appError from '../../errors/appError';
import { startSession } from 'mongoose';

// const createOrderIntoDB = async (payload: Torder) => {

//   // Check if each product exists in the database
//   for (const item of payload.products) {
//     const productExists = await Product.find({ _id: item.product });
//     if (!productExists) {
//       throw new appError(httpStatus.NOT_FOUND, "product not found");
//     }
//   }
//   const result = Order.create(payload);
//   return result;
// };

//create order
const createOrderIntoDB = async (payload: Torder) => {
  const session = await startSession();
  session.startTransaction();

  try {
    for (const item of payload.products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new appError(httpStatus.NOT_FOUND, 'Product not found');
      }
      if (item.quantity > product.quantity) {
        throw new appError(
          httpStatus.BAD_REQUEST,
          `Requested quantity for product ${product.title} exceeds available stock`,
        );
      }
    }

    // Create the order if all products exist and have sufficient quantity----
    const result = await Order.create([payload], { session });

    if (!result.length) {
      throw new appError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    for (const item of payload.products) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: -item.quantity } },
        { session },
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    // Abort the transaction in case of error
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export default createOrderIntoDB;

export const OrderServices = { createOrderIntoDB };
