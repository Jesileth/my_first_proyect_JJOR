import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

   async create(createUserDto: CreateUserDto) {

    const { password, tenantName, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword, // <-- Se guarda el hash, no el texto plano
        tenant: 
        {
          create: { name: tenantName ?? userData.name ?? userData.email },
        },
      },
        include: { tenant: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({where: {id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {id},
      data: updateUserDto
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {id},
    })
  }
}
