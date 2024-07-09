import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [ProductsModule]
})
export class OrdersModule { }
