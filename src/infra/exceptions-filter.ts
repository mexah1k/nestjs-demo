import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'winston';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let { originalUrl, method, params, query, body } = request;

    if (
      exception instanceof HttpException &&
      exception.getStatus() >= 400 &&
      exception.getStatus() < 500
    ) {
      const message = exception.getResponse();
      const status = exception.getStatus();

      this.logger.warn({
        originalUrl,
        status,
        method,
        params,
        query,
        body,
        response: message,
      });

      response.status(status).json(
        message === null
          ? {
              statusCode: status,
              timestamp: new Date().toISOString(),
              path: request.url,
            }
          : message,
      );
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;

      this.logger.error({
        originalUrl,
        status,
        method,
        params,
        query,
        body,
        stackTrace:
          exception instanceof Error
            ? exception.stack
            : JSON.stringify(exception),
      });

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Sorry, we have some internal issues.',
      });
    }
  }
}
