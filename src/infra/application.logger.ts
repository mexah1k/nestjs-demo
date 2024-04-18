import { LoggerService } from '@nestjs/common';
import { Logger } from 'winston';

export class ApplicationLogger implements LoggerService {
  constructor(
    private readonly logger: Logger
  ) { }

  log(message: any) {
    this.logger.info(message);
  }

  error(message: any, trace?: any) {
    this.logger.error({message: message, trace: trace});
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    if (!process.env.ENV || process.env.ENV !== 'DEV') {
      return;
    }

    this.logger.debug(message);
  }

  verbose(message: any) {
    this.logger.verbose(message);
  }
}
