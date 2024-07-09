import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaClient } from '@prisma/client';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('OrdersService');

  constructor(private readonly productsService: ProductsService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('OrdersService connected to database')
  }

  async create(createOrderDto: CreateOrderDto) {
    const { customerId } = createOrderDto;
    const customerExists = await this.customer.findUnique({ where: { id: customerId } });
    if (!customerExists) throw new BadRequestException('Customer not exists');

    try {

      const productsIds: string[] = createOrderDto.items.map(item => item.productId)

      const products = await this.productsService.validateProducts(productsIds)
      const totalAmount = createOrderDto.items.reduce((acc, orderItem) => {
        const price: any = products.find(product => product.id === orderItem.productId).price;
        return acc + (price * orderItem.quantity)
      }, 0)

      const totalItems = createOrderDto.items.reduce((acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0)

      const order = await this.orders.create({
        data: {
          customerId,
          totalAmount,
          totalItems,
          OrderItem: {
            createMany: {
              data: createOrderDto.items.map((orderItem) => ({
                productId: orderItem.productId,
                quantity: orderItem.quantity,
                price: products.find(product => product.id === orderItem.productId).price,
              }))
            }
          },
        },
        include: {
          OrderItem: {
            select: {
              price: true,
              quantity: true,
              productId: true,
            }
          }
        }
      })

      return {
        ...order,
        OrderItem: order.OrderItem.map(item => ({
          ...item,
          name: products.find(product => product.id === item.productId).name
        }))
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
