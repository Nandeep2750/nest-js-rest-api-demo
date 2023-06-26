import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusCodes } from 'http-status-codes';
import { PaginateModel } from 'mongoose';
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
    private categoryModal: PaginateModel<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModal.findOne({
      name: createCategoryDto.name,
    });

    if (category) {
      throw new ConflictException(MESSAGE.ERROR.CATEGORY_ALREADY_EXISTS);
    }

    createCategoryDto.status = CATEGORY_CONFIG.STATUS_TYPE.ACTIVE;

    await new this.categoryModal(createCategoryDto).save();
    return {
      statusCode: StatusCodes.CREATED,
      message: MESSAGE.SUCCESS.CATEGORY_CREATE_SUCCESS,
    };
  }

  async findAll() {
    const resData = await this.categoryModal
      .find({ status: CATEGORY_CONFIG.STATUS_TYPE.ACTIVE })
      .select(['name']);
    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.CATEGORY_FETCH_SUCCESS,
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
    const options = {
      sort: { createdAt: -1 },
      page: categoryPaginationDto.page || PAGINATION_CONFIG.PAGE,
      limit: categoryPaginationDto.limit || PAGINATION_CONFIG.LIMIT,
      select: ['name', 'status'],
    };

    const resData = await this.categoryModal.paginate(query, options);
    return {
      statusCode: StatusCodes.OK,
      message: MESSAGE.SUCCESS.CATEGORY_FETCH_SUCCESS,
      data: resData,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
