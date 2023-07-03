import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Login, Register } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(dto: Login) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('user not found :(');

    const passMatch = await argon.verify(user.pass_hash, dto.password);
    if (!passMatch) throw new ForbiddenException('password in incorect -__-');

    return { status: 'loged in:)' };
  }

  async register(dto: Register) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          pass_hash: hash,
          username: dto.username,
        },
        select: {
          id: true,
          email: true,
          username: true,
        },
      });
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('email or username already taken:)');
      }
    }
  }
}
