import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './controllers/tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TicketsRepository } from './repositories/tickets.repository';
import { TicketsService } from './services/tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
  ],
  controllers: [
    TicketsController
  ],
  providers: [
    TicketsService,
    TicketsRepository
  ],
})
export class TicketsModule {}
