import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async fortyTwoLogin(req) {
    let user = await this.prisma.user.findFirst({
      where: {
        userId: String(req.user.userId),
      },
    });

    if (!user) {
      try {
        user = await this.prisma.user.create({
          data: {
            userId: String(req.user.userId),
            username: req.user.username,
            displayName: req.user.displayName,
            email: req.user.email,
            image: req.user.image,
          },
        });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
        }
        throw error;
      }
    }

    const token = await this.signToken(user.userId, user.email);
    // console.log({
    //   token: token,
    //   message: 'User information from 42',
    //   user: req.user,
    // });
    return token;
  }

  async signToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_Secret');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });
    return token;
  }
}
