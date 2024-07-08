import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('CustomersService');
  onModuleInit() {
    this.$connect();
    this.logger.log('CustomersService connected to database')
  }

  async create(createCustomerDto: CreateCustomerDto) {

    const customer = await this.customer.create({ data: createCustomerDto });
    return customer;
  }
}
