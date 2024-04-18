import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApplicationLogger } from './infra/application.logger';
import { ExceptionsFilter } from './infra/exceptions-filter';
import { format } from 'winston';

async function bootstrap() {
  const winston = require('winston');
  const morgan = require('morgan');

  const { combine, timestamp, prettyPrint, errors } = format;
  const winstonLogger = winston.createLogger({
    format: combine(
      errors({ stack: true }),
      timestamp(),
      prettyPrint(),
      winston.format.json(),
    ),
    exitOnError: false,
    defaultMeta: { service: 'app-service' },
    transports: [
      new winston.transports.Console({
        level: 'info',
        handleExceptions: true,
        json: true,
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger: new ApplicationLogger(winstonLogger),
  });

  const myStream = {
    write: (text: string) => {
      winstonLogger.info(text);
    },
  };

  app.use(
    morgan('short', {
      stream: myStream,
    }),
  );
  app.useGlobalFilters(new ExceptionsFilter(winstonLogger));

  await app.listen(process.env.PORT);
}
bootstrap();
