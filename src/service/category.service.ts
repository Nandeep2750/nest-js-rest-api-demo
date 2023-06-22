import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StatusCodes } from 'http-status-codes';
import { Model } from 'mongoose';
import { CATEGORY_CONFIG } from 'src/config/constants';
import { MESSAGE } from 'src/config/message';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dto';
import { Category, CategoryDocument } from 'src/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModal: Model<CategoryDocument>,
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

  findAll() {
    return `This action returns all category`;
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
