import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { applicationDatabase } from './infra/typeorm.config';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(applicationDatabase),
    TicketsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
