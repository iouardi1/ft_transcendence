import { Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module'; // Authtication module
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    AuthModule, // auth module added
    PrismaModule,
    MessageModule,
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
