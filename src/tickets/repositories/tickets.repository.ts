import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationRequest } from '../../infra/pagination/pagination.request';
import { Repository, LessThan } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import * as moment from 'moment';

@Injectable()
export class TicketsRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly repository: Repository<Ticket>,
  ) {}

  async create(ticket: Ticket): Promise<void> {
    await this.repository.save(ticket);
  }

  async get(code: string): Promise<Ticket> {
    const currentDate = moment().unix();
    
    const ticket = await this.repository.findOne({
      where: [
        {
          code: code,
          expirationDate: LessThan(currentDate)
        },
      ],
    });

    return ticket;
  }

  async query(paginatedRequest: PaginationRequest): Promise<Ticket[]> {
    const currentDate = moment().unix();

    return await this.repository.find({
      skip: paginatedRequest.pageNumber * paginatedRequest.pageSize,
      take: paginatedRequest.pageSize,
      where: {
        expirationDate: LessThan(currentDate)
      }
    });
  }
}
