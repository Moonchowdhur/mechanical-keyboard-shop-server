import httpStatus from 'http-status';
import { catchAsync } from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendRequest';
import { OrderServices } from './order.services';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  await req.body;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Order created successfully.',
    data: result,
  });
});

export const orderControllers = {
  createOrder,
};
