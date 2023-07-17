import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusCodes } from 'http-status-codes';
import { PaginateModel, PaginateOptions, Types } from 'mongoose';
import { CATEGORY_CONFIG, PAGINATION_CONFIG } from 'src/config/constants';
import { MESSAGE } from 'src/config/message';
import {
  CategoryPaginationDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/dtos/category.dto';
import { Category, CategoryDocument } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: PaginateModel<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (category) {
      throw new ConflictException(MESSAGE.ERROR.CATEGORY_ALREADY_EXISTS);
    }

    createCategoryDto.status = CATEGORY_CONFIG.STATUS_TYPE.ACTIVE;

    await new this.categoryModel(createCategoryDto).save();
    return {
      statusCode: StatusCodes.CREATED,
      message: MESSAGE.SUCCESS.CATEGORY_CREATE_SUCCESS,
    };
  }

  async findAll() {
    const resData = await this.categoryModel
      .find({ status: CATEGORY_CONFIG.STATUS_TYPE.ACTIVE })
      .select(['name']);
    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.CATEGORY_LIST_FETCH_SUCCESS,
      data: resData,
    };
  }

  async findAllPaginate(categoryPaginationDto: CategoryPaginationDto) {
    const query: any = {
      name: { $regex: categoryPaginationDto.search, $options: 'i' },
    };
    if (categoryPaginationDto.status) {
      query.status = categoryPaginationDto.status;
    }
    const options: PaginateOptions = {
      sort: { createdAt: -1 },
      page: categoryPaginationDto.page || PAGINATION_CONFIG.PAGE,
      limit: categoryPaginationDto.limit || PAGINATION_CONFIG.LIMIT,
      select: ['name', 'status'],
    };
    const resData = await this.categoryModel.paginate(query, options);
    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.CATEGORY_LIST_FETCH_SUCCESS,
      data: resData,
    };
  }

  async findOne(categoryId: Types.ObjectId) {
    const category = await this.categoryModel
      .findOne({
        _id: new Types.ObjectId(categoryId),
      })
      .select(['name', 'status']);

    if (!category) {
      throw new NotFoundException(MESSAGE.ERROR.CATEGORY_NOT_FOUND);
    }
    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.CATEGORY_FETCH_SUCCESS,
      data: category,
    };
  }

  update(categoryId: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel
      .findByIdAndUpdate(
        new Types.ObjectId(categoryId),
        {
          ...updateCategoryDto,
        },
        { new: true },
      )
      .select(['name', 'status'])
      .exec()
      .then((result) => {
        if (result) {
          return {
            statusCode: StatusCodes.OK,
            message: MESSAGE.SUCCESS.CATEGORY_UPDATED_SUCCESS,
            data: result,
          };
        } else {
          throw new NotFoundException(MESSAGE.ERROR.CATEGORY_NOT_FOUND);
        }
      });
  }

  async remove(categoryId: string) {
    return `This action removes a #${categoryId} category`;

    // const category = await this.categoryModel.findOne({
    //   _id: new Types.ObjectId(categoryId),
    // });

    // if (!category) {
    //   throw new NotFoundException();
    // }

    // return this.categoryModel.deleteById(categoryId).then((result) => {
    //   if (result) {
    //     return {
    //       statusCode: StatusCodes.OK,
    //       message: MESSAGE.SUCCESS.CATEGORY_DELETE_SUCCESS,
    //     };
    //   } else {
    //     throw new NotFoundException();
    //   }
    // });
  }
}
