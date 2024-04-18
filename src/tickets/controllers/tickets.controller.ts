import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PaginationRequest } from 'src/infra/pagination/pagination.request';
import { Ticket } from '../entities/ticket.entity';
import { TicketsService } from '../services/tickets.service';

@Controller('api/tickets')
export class TicketsController {
  constructor(
    private readonly service: TicketsService,
  ) { }

  @Post('/generate')
  @HttpCode(HttpStatus.OK)
  async generate(): Promise<string> {
    return await this.service.generate();
  }

  @Get('/:id')
  async get(code: string): Promise<Ticket> {
    return await this.service.get(code);
  }

  @Post('/query')
  @HttpCode(HttpStatus.OK)
  async query(@Body() request: PaginationRequest): Promise<Ticket[]> {
    return await this.service.query(request);
  }
}
