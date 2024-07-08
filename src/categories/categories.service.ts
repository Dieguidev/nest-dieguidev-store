import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoriesService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('CategoriesService');

  onModuleInit() {
    this.$connect();
    this.logger.log('CategoriesService connected to database')
  }
  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const categoryExists = await this.category.findUnique({ where: { name } });
    if (categoryExists) throw new BadRequestException('Category already exists');

    const newCategory = await this.category.create({ data: createCategoryDto });

    return newCategory;
  }

  findAll() {
    return `This action returns all categories`;
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
