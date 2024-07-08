import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('UsersService');

  onModuleInit() {
    this.$connect();
    this.logger.log('UsersService connected to database')
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existsUser = await this.user.findUnique({
      where: { email }
    });

    if (existsUser) throw new BadRequestException('User already exists');
    const user = await this.user.create({ data: createUserDto });
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
