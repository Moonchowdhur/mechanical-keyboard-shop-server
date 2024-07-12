import httpStatus from 'http-status';
import { catchAsync } from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendRequest';
import { ProductServices } from './product.services';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);
  console.log(req.body);
  await req.body;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Product created successfully.',
    data: result,
  });
});

const getProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getProductFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Product data get successfully.',
    data: result,
  });
});

// const getProduct = catchAsync(async (req, res) => {
//   const result = await ProductServices.getProductFromDB();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     sucess: true,
//     message: 'Product data get successfully.',
//     data: result,
//   });
// });

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: `Product data get successfully for single Id`,
    data: result,
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateSingleProductFromDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: `Product updated successfully`,
    data: result,
  });
});

//delete product
const deleteSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: `Product deleted successfully`,
    data: result,
  });
});

export const ProductControllers = {
  createProduct,

  getProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
