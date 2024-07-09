import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [ProductsModule, UsersModule, BrandsModule, CategoriesModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
