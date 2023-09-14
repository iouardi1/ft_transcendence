import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    MessageModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
