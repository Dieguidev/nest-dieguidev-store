import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':idProduct/category/:categoryId')
  removeCategoryByProduct(
    @Param('idProduct', ParseUUIDPipe) idProduct: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.productsService.removeCategory(idProduct, categoryId);
  }

  @Patch(':ProductId/category/:categoryId')
  addCategoryByProduct(
    @Param('ProductId', ParseUUIDPipe) ProductId: string,
    @Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.productsService.addCategory(ProductId, categoryId);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
