import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logindto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService 
{

    constructor (
        private jwtService: JwtService,
        private prisma: PrismaService) {}

    async ValidateUser(User: Logindto)
    {
     const foundUser = await this.prisma.user.findUnique({
      where: {
         email: User.email
       }
     });

     if (!foundUser) return null;

    /*console.log('Password recibida:', JSON.stringify(User.password));
    console.log('Hash en BD:', foundUser.password);
    console.log('Resultado compare:', await bcrypt.compare(User.password, foundUser.password));*/

     const isPasswordValid = await bcrypt.compare(User.password, foundUser.password)

        if(isPasswordValid) 
        {
            return this.jwtService.sign
            ({
                id: foundUser.id,
                email: foundUser.email,
                role: foundUser.role
            });
        } 
         else 
        {
            throw new UnauthorizedException('Credenciales Invalidas')
        }
    }
}

