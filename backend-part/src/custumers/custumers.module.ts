import { Module } from '@nestjs/common';
import { CustumersController } from './controllers/custumers/custumers.controller';

@Module({
  controllers: [CustumersController]
})
export class CustumersModule {}
