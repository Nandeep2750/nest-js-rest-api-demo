import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusCodes } from 'http-status-codes';
import { PaginateModel, PaginateOptions, Types } from 'mongoose';
import { PAGINATION_CONFIG } from 'src/config/constants';
import { MESSAGE } from 'src/config/message';
import {
  ProductPaginationDto,
  CreateProductDto,
  UpdateProductDto,
} from 'src/dtos/product.dto';
import { Product, ProductDocument } from 'src/entities/product.entity';
import { CategoryService } from './category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: PaginateModel<ProductDocument>,
    private categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    if (category === null) {
      throw new NotFoundException(MESSAGE.ERROR.CATEGORY_NOT_FOUND);
    }

    const product = await new this.productModel(createProductDto).save();
    return {
      statusCode: StatusCodes.CREATED,
      message: MESSAGE.SUCCESS.PRODUCT_CREATE_SUCCESS,
      data: product,
    };
  }

  async findAllPaginate(productPaginationDto: ProductPaginationDto) {
    const query: any = {};
    if (productPaginationDto.search) {
      query.name = { $regex: productPaginationDto.search, $options: 'i' };
    }

    const options: PaginateOptions = {
      sort: { createdAt: -1 },
      page: productPaginationDto.page || PAGINATION_CONFIG.PAGE,
      limit: productPaginationDto.limit || PAGINATION_CONFIG.LIMIT,
      select: {
        deleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
      populate: {
        path: 'categoryId',
        select: {
          deleted: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    };
    const resData = await this.productModel.paginate(query, options);
    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.PRODUCT_LIST_FETCH_SUCCESS,
      data: resData,
    };
  }

  async findOne(productId: Types.ObjectId) {
    const product = await this.productModel
      .findOne({
        _id: new Types.ObjectId(productId),
      })
      .select({
        deleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .populate('categoryId', {
        deleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      });
    if (!product) {
      throw new NotFoundException();
    }
    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.PRODUCT_FETCH_SUCCESS,
      data: product,
    };
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    if (updateProductDto.categoryId) {
      const category = await this.categoryService.findOne(
        updateProductDto.categoryId,
      );
      if (category === null) {
        throw new NotFoundException(MESSAGE.ERROR.CATEGORY_NOT_FOUND);
      }
    }

    return this.productModel
      .findByIdAndUpdate(
        new Types.ObjectId(productId),
        {
          ...updateProductDto,
        },
        { new: true },
      )
      .select({
        deleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .populate('categoryId', {
        deleted: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      })
      .exec()
      .then((result) => {
        if (result) {
          return {
            statusCode: StatusCodes.OK,
            message: MESSAGE.SUCCESS.PRODUCT_UPDATED_SUCCESS,
            data: result,
          };
        } else {
          throw new NotFoundException(MESSAGE.ERROR.PRODUCT_NOT_FOUND);
        }
      });
  }

  async remove(productId: string) {
    return `This action removes a #${productId} product`;
  }
}
