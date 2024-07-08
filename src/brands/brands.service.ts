import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BrandsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('BrandsService');
  onModuleInit() {
    this.$connect();
    this.logger.log('BrandsService connected to database')
  }
  async create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const brandExists = await this.brand.findUnique({ where: { name } });
    if (brandExists) throw new BadRequestException('Brand already exists');

    const newBrand = await this.brand.create({ data: createBrandDto });

    return newBrand;
  }

  findAll() {
    return `This action returns all brands`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
