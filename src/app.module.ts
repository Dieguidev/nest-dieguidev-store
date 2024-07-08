import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';


@Module({
  imports: [ProductsModule, UsersModule, BrandsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
