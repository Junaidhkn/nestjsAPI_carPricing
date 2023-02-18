import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from './auth.service';

@Module({
  controllers: [UsersController],
  providers: [PrismaService, UsersService, AuthService],
})
export class UsersModule {}
