import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationRequest } from 'src/infra/pagination/pagination.request';
import { Ticket } from '../entities/ticket.entity';
import { TicketsRepository } from '../repositories/tickets.repository';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

@Injectable()
export class TicketsService {
  constructor(
    private readonly repository: TicketsRepository,
  ) { }

  async generate(): Promise<string> {
    const ticket = new Ticket();
    ticket.code = uuidv4();
    ticket.expirationDate = moment().add(24, 'hour').unix();

    await this.repository.create(ticket);

    return ticket.code;
  }

  async get(code: string): Promise<Ticket> {
    const ticket =  await this.repository.get(code);

    if (!ticket) {
      throw new NotFoundException(`Ticket '${code}' was not found.`);
    }

    return ticket;
  }

  async query(request: PaginationRequest): Promise<Ticket[]> {
    return await this.repository.query(request);
  }
}
