import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('ProductsService connected to database')
  }

  async create(createProductDto: CreateProductDto) {
    const { name } = createProductDto;
    const productExists = await this.product.findUnique({ where: { name } });
    if (productExists) throw new BadRequestException('Product already exists');

    const {categoriesIds , ...rest}= createProductDto;

    const newProduct = await this.product.create({ data: {
      ...rest,
      categories: {
        createMany: {
          data: categoriesIds.map(categoryId => ({ categoryId }))
        }
      },

    },
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
   });

    return newProduct;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [totalProducts, products] = await Promise.all([
      this.product.count({ where: { isActive: true} }),
      this.product.findMany({
        where: { isActive: true},
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      totalProducts,
      page,
      totalPages,
      next: (totalProducts - (page * limit)) > 0 ? `api/products?page=${page + 1}&limit=${limit}` : null,
      prev: (page - 1 > 0) ? `api/products?page=${page - 1}&limit=${limit}` : null,
      products
    }

  }

  async findOne(id: string) {
    const product = await this.product.findUnique({ where: { id, isActive: true } });
    if (!product) throw new BadRequestException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id)
    const product = await this.product.update({ where: { id }, data: updateProductDto });
    return product;
  }

  async removeCategory(idProduct: string, categoryId: string) {
    const product = await this.product.findUnique({ where: { id: idProduct } });
    if (!product) throw new BadRequestException('Product not found');

    const category = await this.category.findUnique({ where: { id: categoryId } });
    if (!category) throw new BadRequestException('Category not found');

    const productCategory = await this.productCategory.findMany({ where: { productId: idProduct, categoryId } });
    console.log(productCategory);

    if (productCategory.length ===0) throw new BadRequestException('Product does not have this category');
    await this.productCategory.deleteMany({ where: { productId: idProduct, categoryId } });


    return { message: 'Category deleted to product' };
  }

  async addCategory(idProduct: string, categoryId: string) {
    const product = await this.product.findUnique({ where: { id: idProduct } });
    if (!product) throw new BadRequestException('Product not found');

    const category = await this.category.findUnique({ where: { id: categoryId } });
    if (!category) throw new BadRequestException('Category not found');

    const productCategory = await this.productCategory.findMany({ where: { productId: idProduct, categoryId } });
    if (productCategory.length > 0) throw new BadRequestException('Product already has this category');

    await this.productCategory.create({ data: { productId: idProduct, categoryId } });

    return { message: 'Category added to product' };
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.product.update({ where: { id }, data: { isActive: false } });
    return `This action removes a #${id} product`;
  }

  async validateProducts(ids: string[]){
    // elimina los valores duplicados del array ids y lo convierte de nuevo en un arra
    ids = Array.from(new Set(ids));

    const products = await this.product.findMany({
      where: { id: { in: ids } }
    });

    if(products.length !== ids.length) throw new BadRequestException('One or more products not found');

    return products;
  }
}
