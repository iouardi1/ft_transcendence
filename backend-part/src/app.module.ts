import { Module } from '@nestjs/common';
import { CustumersModule } from './custumers/custumers.module';

@Module({
  imports: [CustumersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
